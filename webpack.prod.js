const merge = require("webpack-merge")
const CompressionPlugin = require("compression-webpack-plugin")
const common = require("./webpack.common.js")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")

module.exports = merge(common, {
  optimization: {
    splitChunks: { chunks: "all" },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
    runtimeChunk: {
      name: "manifest",
    },
  },
  stats: {
    children: false,
    warnings: false,
    entrypoints: false,
    modules: false,
    errorDetails: true,
    errors: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ["default", { discardComments: { removeAll: true } }],
      },
    }),
    new CompressionPlugin({
      test: /\.(js|css|html)$/,
      algorithm: "gzip",
    }),
  ],
  mode: "production",
})
