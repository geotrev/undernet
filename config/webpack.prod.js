const path = require("path")
const merge = require("webpack-merge")
const UglifyJSPlugin = require("uglifyjs-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const common = require("../webpack.common.js")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = merge(common, {
  plugins: [
    // remove previous build assets
    new CleanWebpackPlugin(["../build"], {
      root: path.resolve(__dirname),
      verbose: true,

      // external is required because this config is not in the root directory.
      allowExternal: true,
    }),

    // create gzip assets
    new CompressionPlugin({
      test: /\.(js|css)$/,
      algorithm: "gzip",
    }),

    // copy app manifest one-to-one from public/ to build/
    new CopyWebpackPlugin([
      {
        from: "public/manifest.json",
        to: "manifest.json",
        cache: true,
      },
    ]),
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
      }),
    ],
  },
  mode: "production",
})
