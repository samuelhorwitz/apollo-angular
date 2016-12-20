// const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./webpack.common');

config.plugins.push(new BundleAnalyzerPlugin())

module.exports = config;
