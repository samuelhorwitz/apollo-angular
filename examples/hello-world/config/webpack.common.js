const webpack = require('webpack');
const path = require('path');

const sourcePath = path.join(__dirname, '../dist/app');
const publicPath = path.join(__dirname, '../dist/public');
const modulesPath = path.resolve(__dirname, '../node_modules');

module.exports = {
  devtool: 'cheap-module-source-map',
  context: sourcePath,
  entry: './main.js',
  output: {
    path: publicPath,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      modulesPath,
      sourcePath
    ]
  },
  plugins: [],
  stats: 'normal'
};
