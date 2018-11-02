const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  output: {
    filename: 'ie-browser-banner.js',
    library: 'ieBrowserBanner',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    angular: 'angular'
  },
  module: {
    rules: [
      // babel converts ES6 to ES5
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};