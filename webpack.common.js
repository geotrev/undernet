const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

// @param {Boolean} production - if `true`, sets MiniCssExtractPlugin.loader for
//                               production build, else uses "style-loader"
module.exports = productionMode => {
  const cssExtractionMethod = productionMode ? MiniCssExtractPlugin.loader : "style-loader"

  return {
    entry: {
      main: path.resolve(__dirname, "src/index.js"),
    },
    output: {
      filename: "[name].[chunkhash].js",
      chunkFilename: "[name].[chunkhash].js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
    },
    resolve: {
      extensions: [".js", ".jsx"],
      alias: {
        routes: path.resolve(__dirname, "src/routes"),
        components: path.resolve(__dirname, "src/components/exports"),
        helpers: path.resolve(__dirname, "src/helpers/exports"),
        pages: path.resolve(__dirname, "src/pages/exports"),
        assets: path.resolve(__dirname, "src/assets/"),
        docs: path.resolve(__dirname, "docs/"),
        undernet: path.resolve(__dirname, "js/dist/undernet"),
      },
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.s?css$/,
          use: [
            cssExtractionMethod,
            {
              loader: "css-loader",
              options: {
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: "postcss-loader",
              options: { config: { path: "config/postcss.config.js" } },
            },
            { loader: "resolve-url-loader" },
            "sass-loader?sourceMap",
          ],
        },
        {
          test: /\.(ico|png|jpe?g|gif|eot|svg|ttf|woff2?|otf)$/,
          use: [
            {
              loader: "file-loader",
              options: { name: "[name].[ext]", outputPath: "assets/" },
            },
          ],
        },
        {
          test: /\.md$/,
          use: ["html-loader", "markdown-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[chunkhash].css",
      }),
    ],
  }
}
