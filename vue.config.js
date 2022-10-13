const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const HtmlWebpackInlinePlugin = require('html-webpack-inline-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// 混淆
const WebpackObfuscator = require('webpack-obfuscator');
const productionGzipExtensions = ['js', 'css'];
function resolve(dir) {
    return path.join(__dirname, dir);
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
            'chunk-ant-design-vue', // admin的单独chunk
            'chunk-echarts', // admin的单独chunk
            'zrender' // echarts用到了zrender
        ]
    }
};
module.exports = {
    pages,
    publicPath: './',
    productionSourceMap: false,
    devServer: {
        // can be overwritten by process.env.HOST
        host: '0.0.0.0',
        port: 8080
    },
    chainWebpack: config => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch');
        // 移除 preload 插件
        config.plugins.delete('preload');
        // 压缩代码
        config.optimization.minimize(true);
        // 删除系统默认的splitChunk
        config.optimization.delete('splitChunks');
        config.resolve.alias
            .set('@', resolve('src'))
            .set('src', resolve('src'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
            .end()
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/assets/css/global.scss";'
            },
            less: {
                lessOptions: {
                    modifyVars: {
                        'primary-color': '#0097A7',
                        'link-color': '#0097A7',
                        'border-radius-base': '4px'
                    },
                    javascriptEnabled: true
                }
            }
        }
    },
    pluginOptions: {
    },
    runtimeCompiler: process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'dev',
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
                    // 由于admin入口使用了element-ui,所以讲element-ui单独处理出来，这样index入口就不会使用此js
                    element: {
                        name: 'chunk-ant-design-vue',
                        test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
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
        plugins: process.env.NODE_ENV === 'production' ? [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new HtmlWebpackInlinePlugin({
                compress: false
            }),
            new WebpackObfuscator({
                // 禁用字符串文字的转换 \s* 就是有0个或多个空格 不能转义空格，很奇怪
                reservedStrings: ['\\s*'],
                controlFlowFlattening: false, // 是否启用控制流扁平化(降低1.5倍的运行速度)
                deadCodeInjection: false, /// 随机的死代码块(增加了混淆代码的大小)
                debugProtection: false, // 此选项几乎不可能使用开发者工具的控制台选项卡
                debugProtectionInterval: false, // 如果选中，则会在“控制台”选项卡上使用间隔强制调试模式，从而更难使用“开发人员工具”的其他功能。
                disableConsoleOutput: true, // 通过用空函数替换它们来禁用console.log，console.info，console.error和console.warn。这使得调试器的使用更加困难。
                identifierNamesGenerator: 'hexadecimal', // 标识符的混淆方式 hexadecimal(十六进制) mangled(短标识符)
                log: false,
                renameGlobals: false, // 是否启用全局变量和函数名称的混淆
                rotateStringArray: true, // 通过固定和随机（在代码混淆时生成）的位置移动数组。这使得将删除的字符串的顺序与其原始位置相匹配变得更加困难。如果原始源代码不小，建议使用此选项，因为辅助函数可以引起注意。
                selfDefending: false, // 混淆后的代码,不能使用代码美化,同时需要配置 cpmpat:true;
                stringArray: true, // 删除字符串文字并将它们放在一个特殊的数组中
                stringArrayEncoding: ['base64'],
                stringArrayThreshold: 0.75,
                unicodeEscapeSequence: false// 允许启用/禁用字符串转换为unicode转义序列。Unicode转义序列大大增加了代码大小，并且可以轻松地将字符串恢复为原始视图。建议仅对小型源代码启用此选项。
            }, []),
            // 配置compression-webpack-plugin压缩
            new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            })
        ] : (
            process.env.NODE_ENV === 'dev' ? [
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
                new HtmlWebpackInlinePlugin({
                    compress: false
                }),
                // 配置compression-webpack-plugin压缩
                new CompressionWebpackPlugin({
                    algorithm: 'gzip',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10240,
                    minRatio: 0.8,
                    deleteOriginalAssets: true
                })
            ] : [
                new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
                // new BundleAnalyzerPlugin({
                //     //  将在“服务器”模式下使用的端口启动HTTP服务器。
                //     analyzerPort: 8898,
                //     analyzerMode: 'server',
                //     openAnalyzer: false
                // }),
                new HtmlWebpackInlinePlugin({
                    compress: false
                })
            ]
        )
    }
};
