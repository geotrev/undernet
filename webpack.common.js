const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: path.join(__dirname, 'src/index.js'),
  },
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
  },
  optimization: {
    splitChunks: { chunks: 'all' },
    runtimeChunk: { name: 'manifest' }
  },
  stats: { children: false },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      'components': path.resolve(__dirname, 'src/components/exports'),
      'helpers': path.resolve(__dirname, 'src/helpers/exports'),
      'pages': path.resolve(__dirname, 'src/pages/exports'),
      'assets': path.resolve(__dirname, 'src/assets/'),
      'articles': path.resolve(__dirname, 'monolith.wiki/'),
    }
  },
  module: {
    rules: [
      { 
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      { 
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' }
          ],
        })
      },
      { 
        test: /\.(ico|png|jpe?g|gif|eot|svg|ttf|woff2?|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/'
            }
          }
        ]
      },
      { 
        test: /\.md$/,
        use: [
          { loader: 'html-loader' },
          { loader: 'markdown-loader' }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html')
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
    }),
  ],
}
