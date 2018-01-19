const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build'),
    publicPath: '/',
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      'components': path.resolve(__dirname, 'src/components/exports'),
      'helpers': path.resolve(__dirname, 'src/helpers/exports'),
      'pages': path.resolve(__dirname, 'src/pages/exports'),
      'articles': path.resolve(__dirname, 'monolith.wiki/'),
    }
  },
  module: {
    rules: [
      { test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      { test: /\.scss$/,
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
      { test: /\.(jpe?g|png|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          },
        }]
      },
      { test: /\.(ico|eot|svg|ttf|woff2?|otf)$/,
        use: 'file-loader?name=[name].[ext]',
      },
      { test: /\.md$/,
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
    new ExtractTextPlugin('app-[contentHash].css'),
  ],
}
