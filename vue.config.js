// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  assetsDir: './static',
  filenameHashing: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8000',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@', path.resolve(__dirname, 'src')).set('views', '@/views')
  },
  configureWebpack: {
    plugins: [
      // new HtmlWebpackPlugin({
      //   filename: 'index.html',
      //   template: path.resolve(__dirname, 'src/assets/index.html'),
      //   inject: true,
      //   favicon: path.resolve(__dirname, 'src/assets/favicon.ico')
      // })
    ]
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  }
}
