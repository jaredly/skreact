const path = require('path');
const webpack = require('webpack');

const sourceDirectories = [
  path.join(__dirname, 'src'),
]

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    // NOTE: in prod mode, I'll ditch the react-hot-loader, and I can also
    // (maybe) ditch transform-es2015-classes...
    // I want to be able to dev just for latest chrome :P
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src'),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      include: sourceDirectories,
    }, {
      test: /\.json$/,
      loader: 'json-loader',
      // include: sourceDirectories.concat([path.join(__dirname, '..', 'public', 'fonts')]),
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
      include: sourceDirectories,
    }]
  }
};
