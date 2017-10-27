var webpack = require('webpack');
// var compressjsWebpackPlugins = require('./dist/compressjs-webpack-plugins');

module.exports = function (options) {
  return {
    entry: __dirname + '/src/index.js',
    output: {
      filename: 'compressjs-webpack-plugins.js',
      path: __dirname + '/build'
    },
    module: {
      rules: [{
          test: /\.js$/,
          loader: 'babel-loader',
          include: [__dirname + 'src'],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
        // new compressjsWebpackPlugins()
    ]
  };
};