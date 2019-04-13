const merge = require("webpack-merge")
const common = require("../webpack.common.js")

module.exports = merge(common, {
  devtool: "source-map",
  devServer: {
    contentBase: "/build/",
    publicPath: "/",
    historyApiFallback: true,
    port: 3000,
  },
  mode: "development",
})
