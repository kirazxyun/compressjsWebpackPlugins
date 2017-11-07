const compressjsWebpackPlugins = require('./src/index')
const webpack = require('webpack')

webpack({
  entry: __dirname + '/test/target.js',
  output: {
    filename: 'uglified.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: [__dirname + '/test'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
      new compressjsWebpackPlugins()
  ]
}, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) {
      console.error(err.details);
    }
    return;
  }

  const info = stats.toJson();

  if (stats.hasErrors()) {
    console.error(info.errors);
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings);
  }
})