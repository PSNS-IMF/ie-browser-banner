const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  output: {
    filename: 'ie-browser-banner.js',
    library: 'ieBrowserBanner',
    libraryTarget: 'window',
    path: path.resolve(__dirname, 'dist')
  },
  externals: {
    angular: {
      commonjs: 'angular',
      commonjs2: 'angular',
      amd: 'angular',
      root: '_'
    }
  }
};