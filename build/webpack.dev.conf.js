var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')    //  合并配置文件
var utils = require('./utils')   //  工具方法
var baseWebpackConfig = require('./webpack.base.conf')  //  webpack的配置文件，开发时和运行时公用的配置文件
var HtmlWebpackPlugin = require('html-webpack-plugin')   //  webpack操作HTML的插件

// add hot-reload related code to entry chunks
//  自动刷新
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(), //  根据组件使用频率分配地址
    new webpack.HotModuleReplacementPlugin(),  //  热加载插件
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})
