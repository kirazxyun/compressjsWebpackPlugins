const os = require('os')
const ModuleFilenameHelpers = require('webpack/lib/ModuleFilenameHelpers')
const workerFarm = require('worker-farm')
const pify = require('pify')
const webpackSources = require('webpack-sources')

const SourceMapSource = webpackSources.SourceMapSource;
const RawSource = webpackSources.RawSource;
const tmpFile = require('./tmp-file')

function workerCount (options, assetCount) {
  if(options.workerCount) {
    return options.workerCount
  }

  return Math.min(assetCount, Math.max(1, os.cpus().length - 1))
}

function processAssets(compilation, options) {
  const assetHash = compilation.asset
  const useSourceMaps = options.sourceMap || false

  options.test = options.test || /\.js$/i;
  const assets = Object.keys(assetHash)
                       .filter(ModuleFilenameHelpers.matchObject.bind(null, options));

  const farm = workerFarm({
    autoStart: true,
    maxConcurrentCallsPerWorker: 1,
    maxConcurrentWorkers: workerCount(options, assets.length),
    maxRetries: 2
  }, require.resolve('./worker'), ['processMessage'])

  const minify = pify(farm.processMessage);

  const minificationPromises = assets.map((assetName) => {
    const asset = assetHash[assetName];
    const tmpFileName = tmpFile.create(JSON.stringify({
      assetName,
      source: asset.source(),
      options,
      map: useSourceMaps ? asset.map() : null
    }))

    return minify(tmpFileName).then(() => {
      const content = tmpFile.read(tmpFileName)
      const msg = JSON.parse(content)
      if(msg.map) {
        assetHash[assetName] = new SourceMapSource(msg.source, assetName, msg.map)
      } else {
        assetHash[assetName] = new RawSource(msg.source)
      }
    }).catch((e) => {
      compilation.errors.push(new Error(`minifying ${assetName}\n${e}`))
    });
  });

  function performCleanUp() {
    workerFarm.end(farm);
  }

  return Promise.all(minificationPromises)
                .then(performCleanUp)
                .catch(performCleanUp)
}

module.expors = {
  processAssets,
  workerCount
}