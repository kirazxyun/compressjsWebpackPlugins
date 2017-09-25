// 命名函数
function CompressjsWebpackPlugin(options) {
  console.log(options);
}

// 在它的prototype上定义一个‘apply’方法
CompressjsWebpackPlugin.prototype.apply = function(compiler) {
  // 指定挂载webpack事件钩子
  compiler.plugin('done', function(compilation) {
    console.log('this is an example plugin!!!');
    // 功能完成后调用webpack提供的回调
    // callback();
  });
  // 设置回调来访问编译对象
  compiler.plugin('compilation', function(compilation) {
    // 现在设置回调来访问编译中的步骤
    compilation.plugin('optimize', function() {
      console.log('asset are being optimized.');
    });
  });
};

module.exports = CompressjsWebpackPlugin; 