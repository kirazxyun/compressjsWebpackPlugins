const workers = require('./workers');
class CompressjsWebpackPlugin {
  constructor(options = {}) {
  }
  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        workers(compilation).then(() => {
          callback();
        });
      });
    });
  }
}

module.exports = CompressjsWebpackPlugin;  