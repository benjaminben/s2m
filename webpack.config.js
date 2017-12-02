const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', './src', './src/index.scss'],
  output: {
    path: __dirname + '/static',
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'stage-3', 'react']
            }
          }
        ]
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract(['css-loader?url=false', 'postcss-loader', 'sass-loader'])
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    })
  ]
}
