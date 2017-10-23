const ModuleFilenameHelpers = require('webpack').ModuleFilenameHelpers;
const workerFarm = require('worker-farm');
const pify = require('pify');
const tmpFile = require('./tmp-file');
const worker = require('./worker');
const TEST_REG = /\.js$/i;
class uglifier {
  constructor() {
  }

  process(compilation) {
    this.assetsHash = compilation.assets;
    
    const assets = Object.keys(this.assetsHash).filter(ModuleFilenameHelpers.matchObject.bind(null, {
      test: TEST_REG
    }));
    const farm = workerFarm({
      autoStart: true,
      maxCoucurrentCllasPerWorker: 1,
      maxConcurrentWorkers: this.workerCount(),
      maxRetries: 2
    }, new worker(), ['processMessage']);
    const minify = pity(farm.processMessage);
    const minificationPromises = assets.map((assetName) => {
      const asset = assetHash[assetName];
      const tmpFileName = tmpFile.create(JSON.stringify({
        assetName,
        source: asset.source()
      }));

      return minify(tmpFileName)
              .then(() => {
                const content = tmpFile.read(tmpFileName);
                const msg = JSON.parse(content);
                assetHash[assetName] = new RawSource(msg.source);
              }).catch((e) => {
                compilation.errors.push(new Error(`minifying ${assetName}\n${e}`));
              });
    });

    return Promise.all(minificationPromises)
            .then(() => {
              workerFarm.end();
            })
            .catch(() => {
              workerFarm.end();
            });
  }
  workerCount() {}
}

module.exports = new uglifier();