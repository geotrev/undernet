const HtmlWebpackPlugin = require("html-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const path = require("path")

module.exports = {
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
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                config: {
                  path: "config/postcss.config.js",
                },
              },
            },
            { loader: "resolve-url-loader" },
            { loader: "sass-loader?sourceMap" },
          ],
        }),
      },
      {
        test: /\.(ico|png|jpe?g|gif|eot|svg|ttf|woff2?|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/",
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: [{ loader: "html-loader" }, { loader: "markdown-loader" }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new ExtractTextPlugin({
      filename: "[name].[chunkhash].css",
    }),
  ],
}
