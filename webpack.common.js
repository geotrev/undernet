const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    main: path.resolve(__dirname, "app/index.js"),
  },
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      projectRoot: path.resolve(__dirname),
      app: path.resolve(__dirname, "app"),
      undernet: path.resolve(__dirname, "lib/esm/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader?cacheDirectory",
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader?sourceMap",
            options: {
              sassOptions: {
                includePaths: ["src/", "app/"],
              },
            },
          },
        ],
        include: [path.resolve(__dirname, "src"), path.resolve(__dirname, "app")],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(ico|eot|ttf|woff2?|otf)$/,
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
        use: ["html-loader", "markdown-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[name].[contenthash].css",
    }),
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
}
