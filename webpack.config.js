const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const isDevMode = process.env.NODE_ENV.includes('dev');

const plugins = [
  new Dotenv({
    path: '.env',
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'index.html'),
  }),
  new CleanWebpackPlugin(),
];

if (!isDevMode) {
  plugins.push(new MiniCssExtractPlugin());
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      '/': __dirname,
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.m?jsx?$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/transform-runtime',
              '@babel/plugin-proposal-class-properties',
            ],
          },
        },
      },
      {
        test: /\.(sc|sa|c)ss$/i,
        exclude: /node_modules/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins,
  optimization: {
    minimize: isDevMode ? false : true,
    minimizer: [new CssMinimizerPlugin()],
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
  },
};
