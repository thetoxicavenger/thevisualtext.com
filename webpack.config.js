const {join} = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
      './comments/index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: join(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  }
}