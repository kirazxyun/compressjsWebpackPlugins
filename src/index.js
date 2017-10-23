const uglifier = require('./uglifier');
class CompressjsWebpackPlugin {
  constructor(options = {}) {
  }
  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        uglifier.process(compilation).then(() => {
          callback();
        });
      });
    });
  }
}

module.exports = CompressjsWebpackPlugin;  