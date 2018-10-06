const path = require("path")
const merge = require("webpack-merge")
const CompressionPlugin = require("compression-webpack-plugin")
const common = require("../webpack.common.js")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")

module.exports = merge(common(true), {
  optimization: {
    splitChunks: { chunks: "all" },
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\/node_modules/,
        cache: true,
        parallel: true,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
    runtimeChunk: {
      name: "manifest",
    },
  },
  stats: { children: false },
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

    // copy app manifest + browserconfig from public/ to build/
    new CopyWebpackPlugin([
      {
        from: "public/manifest.json",
        to: "manifest.json",
        cache: true,
      },
      {
        from: "public/browserconfig.xml",
        to: "browserconfig.xml",
        cache: true,
      },
    ]),
  ],
  mode: "production",
})
