const path = require('path');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin")
const common = require('../webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = merge(common, {
  plugins: [
    new CleanWebpackPlugin(
      [ '../build' ], 
      { 
        root: path.resolve(__dirname),
        verbose: true,
        allowExternal: true
      }
    ),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new CompressionPlugin({
      test: /\.js$|.css$/,
      algorithm: "gzip",
    }),
    new CopyWebpackPlugin([{ 
      from: 'public/manifest.json',
      to: 'manifest.json',
      toType: 'file',
      cache: true
    }]),
  ],
  mode: 'production'
});
