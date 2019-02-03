const merge = require("webpack-merge")
const common = require("../webpack.common.js")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = merge(common, {
  devtool: "source-map",
  devServer: {
    contentBase: "/build/",
    publicPath: "/",
    historyApiFallback: true,
    port: 3000,
  },
  plugins: [
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
      {
        from: "public/static/**/*",
        to: "assets/[name].[ext]",
        cache: true,
      },
    ]),
  ],
  mode: "development",
})
