const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}
const pages = {
  index: {
    entry: 'src/main.js',
    template: 'public/index.html',
    // 特别注意：由于各个入口单独分离了chunk之后，需要将对于的chunk名显示的列出
    chunks: [
      'index', // 注意：这个是页面名称的chunk,下面的chunk名称需要对呀splitChunk对应的名称
      'chunk-vendors', // 这是node_modules下的chunk
      'chunk-common', // 这是admin和Index入口公用的chunk
      'chunk-echarts', // admin的单独chunk
      'zrender', // echarts用到了zrender,
      'chunk-vuetify'
    ]
  }
};
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pages,
  configureWebpack: {
    resolve: {
      alias: {},
      fallback: {
        //其他的如果不启用可以用 keyname :false，例如：crypto:false, 
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify")
      }
    },
  },
  devServer: {
    proxy: {

      '/api/*': {
        target: 'http://49.232.100.137/api',
        // ↑这个就是你的接口地址↑
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/sass/variable.scss"'
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    ["vue-modules", "vue", "normal-modules", "normal"].forEach((match) => {
      config.module.rule('scss').oneOf(match).use('sass-loader')
        .tap(opt => Object.assign(opt, {  prependData: `@import "@/sass/variable.scss";` }))
    });
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .end()
  },
  configureWebpack: {
    output: {
      filename: '[name].[hash].js',
      chunkFilename: '[name].[hash].js'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          // 抽离所有入口的公用资源为一个chunk
          common: {
            name: 'chunk-common',
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 1,
            reuseExistingChunk: true,
            enforce: true
          },
          // 抽离node_modules下的库为一个chunk
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true
          },
          // 由于Index入口使用了iview,所以讲iview单独处理出来，这样admin入口就不会使用此js
          iview: {
            name: 'chunk-iview',
            test: /[\\/]node_modules[\\/]iview[\\/]/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          vuetify: {
            name: 'chunk-vuetify',
            test: /[\\/]node_modules[\\/](vue-)?vuetify[\\/]/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          },
          // 由于admin入口使用了echarts,所以讲echarts单独处理出来，这样index入口就不会使用此js
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
            chunks: 'all',
            priority: 4,
            reuseExistingChunk: true,
            enforce: true
          },
          // 由于echarts使用了zrender库，那么需要将其抽离出来，这样就不会放在公共的chunk中
          zrender: {
            name: 'zrender',
            test: /[\\/]node_modules[\\/]zrender[\\/]/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    },
  }
})
