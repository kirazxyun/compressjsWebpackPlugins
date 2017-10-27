const workerFarm = require('worker-farm')
const pify = require('pify')
const worker = require('./worker')
const TEST_REG = /\.js$/i
class uglifier {
  constructor() {
  }

  process(compilation) {
    const assetsHash = compilation.assets
    const minify = this.getMinify();
    const minificationPromises = assets.map((assetName) => {
      const asset = assetHash[assetName]

      return minify(asset)
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

  getMinify() {
    const farm = workerFarm(require.resolve('./worker'))
    return pity(farm);
  }
}

module.exports = new uglifier();