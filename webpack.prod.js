const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pathsToClean = [
  'build/**/*'
]

const cleanOptions = {
  verbose: true
}

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CompressionPlugin({
      test: /\.js$|.css$/,
      algorithm: "gzip",
    }),
  ],
  mode: 'production'
});
