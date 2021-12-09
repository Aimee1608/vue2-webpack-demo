const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 需自行安装 需webpack5版本
const { DefinePlugin } = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')

const devConfig = require('./webpack.dev')
const prodConfig = require('./webpack.prod')
const isProduction = process.env.NODE_ENV === 'production'

const commonConfig = {
  entry: './src/main.js',
  output: {
    filename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, './dist'),
    // publicPath: `//xxx.com/`,
    chunkFilename: '[name].[contenthash:8].js'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.jsx', '.vue'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, // 压缩css 文件
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              esModule: false
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(png|svg|gif|jpe?g)$/,
        type: 'asset',
        generator: {
          filename: 'img/[name].[contentHash:4][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 30 * 1024
          }
        }
      },
      {
        test: /\.(ttf|woff2?)$/,
        type: 'asset/resource',
        generator: {
          filename: 'font/[name].[contentHash:3][ext]'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'eslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ // 抽离css 插件
      filename: "[name].[contentHash:4].css",
    }),
    new HtmlWebpackPlugin({
      title: '设置的标题',
      template: './public/index.html'
    }),
    new DefinePlugin({
      BASE_URL: '"./"'
    }),
    new VueLoaderPlugin()
  ]
}

const baseConfig = isProduction ? prodConfig : devConfig
const defaultConfig = merge(commonConfig, baseConfig)

module.exports = defaultConfig
