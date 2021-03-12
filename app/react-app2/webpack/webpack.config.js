const packageName = require('../package.json').name;
const path = require('path');
const fs = require('fs');
const os = require('os');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin-for-multihtml');
const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack'); // 多进程打包

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); // 进程池初始化

const isProduction = process.env.NODE_ENV === 'production'; // 是否是发布版

const entries = {
    libs: ['babel-polyfill', 'raf/polyfill', 'react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'prop-types', 'axios']
};

// 组装插件
function getPlugins() {
    const plugins = [
        new CleanWebpackPlugin('./build/*', {
            root: path.resolve(__dirname, '../'),
            verbose: true,
            dry: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'libs'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),
        new HappyPack({
            id: 'happybabel',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool,
            verbose: true
        })
    ];
    // 处理html
    /* 过滤掉fragment文件夹 */
    fs.readdirSync('src/views/').filter(m => m !== 'fragment').forEach(moduleName => {
        // 每个module内还有若干页面
        fs.readdirSync(`src/views/${moduleName}`).forEach(page => {
            // 探查对应的js是否存在
            const chunk = `${moduleName}/${page.replace('.html', '')}/main`;
            const isE = fs.existsSync(`src/static/js/${moduleName}/${page.replace('.html', '')}/main.jsx`);
            if (isE) {
                entries[chunk] = path.resolve(__dirname, `../src/static/js/${moduleName}/${page.replace('.html', '')}/main.jsx`);
            }
            plugins.push(new HtmlWebpackPlugin({
                // 模板为同级目录下的index.html，为何不用写路径，是因为默认上下文问webpack.config.js所在的文件夹
                template: `src/views/${moduleName}/${page}/`,
                // 自动生成HTML文件的名字,可以嵌套文件夹
                filename: `views/${moduleName}/${page}`,
                chunks: ['manifest', 'libs'].concat(isE ? [chunk] : []),
                multihtmlCache: true, // 多页优化配置
                minify: {
                    // 配置详见：https://github.com/jantimon/html-webpack-plugin#options
                    minifyJS: true,
                    minifyCSS: true,
                    removeComments: true,
                    collapseWhitespace: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true
                }
            }));
        });
    });
    plugins.push(new ExtractTextPlugin({
        filename: `static/style/[name]${isProduction ? '-[contenthash:10]' : ''}.css`
    }));
    // 生产版添加production环境变量，详见：https://react.docschina.org/docs/optimizing-performance.html
    isProduction && plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
    // 生产版添加js压缩
    isProduction && plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            drop_console: true,
            warnings: false,
            collapse_vars: true,
            reduce_vars: true
        },
        output: {
            comments: false,
            beautify: false
        },
        sourceMap: true
    }));
    return plugins;
}

const config = {
    entry: entries,
    devtool: isProduction ? 'hidden-source-map' : '#eval', // 生成map文件，但是js不引用
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: `static/js/[name]${isProduction ? '-[chunkhash:10]' : ''}.js`,
        // 用于设定css中引用img的路径
        publicPath: '/',
        library: `${packageName}-[name]`,
        libraryTarget: 'umd',
        jsonpFunction: `webpackJsonp_${packageName}`
    },
    plugins: getPlugins(),
    module: {
        // loaders加载器
        loaders: [
            // loader
            {
                test: /\.s?css$/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { minimize: true } },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [autoprefixer({
                                    browsers: ['> 1%', 'cover 99.9%', 'since 2010']
                                })]
                            }
                        },
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                                sourceMapContents: false
                            }
                        }
                    ]
                }))
            }, {
                test: /\.(js|jsx)$/, // 一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
                exclude: /node_modules/, // 屏蔽不需要处理的文件（文件夹）（可选）
                use: 'happypack/loader?id=happybabel' // loader的名称（必须）
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: `static/img/[folder]/[name]${isProduction ? '-[hash:10]' : ''}.[ext]`
                    }
                }]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.css'],
        alias: {
            util: path.resolve(__dirname, '../src/static/js/util/'),
            style: path.resolve(__dirname, '../src/static/style/')
        }
    }
};

module.exports = config;
