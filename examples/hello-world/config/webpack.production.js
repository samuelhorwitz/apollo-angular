const webpack = require('webpack');
const config = require('./webpack.common');

config.plugins.push(new webpack.DefinePlugin({
  'process.env': { NODE_ENV: JSON.stringify('production') }
}));

config.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress:{
    warnings: true
  }
}));

module.exports = config;
