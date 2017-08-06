const {join} = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './comments/index.js',

  output: {
    filename: 'static/bundle.js',
    path: join(__dirname, 'public', 'dist'),
    publicPath: '/'
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          'babel-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      comments: false
    })
  ]
};