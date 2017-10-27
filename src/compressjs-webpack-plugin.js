// 引入压缩算法uglifyjs，es版本才支持es6语法
import UglifyJS from 'uglify-es';
import RawSource from 'webpack-sources/lib/RawSource';

class CompressjsWebpackPlugin {
  constructor(options = {}) {
    console.log(options);
  }
  // 在它的prototype上定义一个‘apply’方法
  apply(compiler) {
    // 指定挂载webpack事件钩子，
    // emit是在发送资源到输出目录之前，在这里做文件的压缩
    compiler.plugin('emit', (compilation, callback) => {
      const assets = compilation.assets; // 获得资源
      Object.keys(assets).forEach((file) => {
        if(!(/.*\.js$/.test(file))) return;

        const asset = assets[file];
        let content = asset.source();
        
        const result = UglifyJS.minify(content);
        if(result.error) return;
        
        assets[file] = new RawSource(result.code);
      });
      // 功能完成后调用webpack提供的回调
      callback();
    });
  }
}

module.exports = CompressjsWebpackPlugin;  