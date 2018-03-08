var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')   //  定义了当前项目的根目录

module.exports = {
  entry: {   //  入口配置
    app: './src/main.js'  //  入口js文件
  },
  output: {  //  输出的设置
    path: config.build.assetsRoot,   //  config/index.js/build/assetsRoot  输出；路径
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,  //  请求的静态资源的绝对路径
    filename: '[name].js'   //  文件名称 app.js
  },
  resolve: {
    extensions: ['', '.js', '.vue'],   //  自动补全文件后缀
    fallback: [path.join(__dirname, '../node_modules')],   //  找不到文件就去node-modules中找
    alias: {   //  定义的路径别名，方便书写
      'src': path.resolve(__dirname, '../src'),
      'components': path.resolve(__dirname, '../src/components'),
      'common': path.resolve(__dirname, '../src/common')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]    // 和上文fallback功能类似
  },
  module: {
    preLoaders: [ //  预处理，在loader之前处理
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/   //  排除该文件夹
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')  //  利用build/utils.js内的assetsPath方法定义图片名称
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')  //  错误检测，提示
  },
  vue: {
    loaders: utils.cssLoaders()   //  vue内css文件的loader处理。
  }
}
