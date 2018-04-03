const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin([ 'build' ], { verbose: true }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new CompressionPlugin({
      test: /\.js$|.css$/,
      algorithm: "gzip",
    }),
  ],
  mode: 'production'
});
