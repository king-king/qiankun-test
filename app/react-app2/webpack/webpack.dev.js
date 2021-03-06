const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const config = require('./webpack.config');

const projectMark = 'react-app2';
const port = 9100;
const host = 'localhost';
// 本地环境静态资源路径
const localPublicPath = `http://${host}:${port}/`;

config.output.publicPath = localPublicPath;
config.devtool = '#eval'; // 调试版要开启sourcemap
config.plugins.shift(); // 调试版不需要清空dist文件夹

// 开启文件监听
config.watch = true;
config.watchOptions = {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: 10
};
// 开启显示id和名称的对应关系
config.plugins.push(new NamedModulesPlugin());

config.devServer = {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    inline: true,
    compress: false,
    hot: true,
    proxy: proxy(),
    stats: {
        chunks: false,
        children: false,
        colors: true
    },
    historyApiFallback: true,
    port,
    host,
    open: true,
    openPage: `${projectMark}/template/index.html`
};

function proxy() {
    const base = {
        secure: true,
        changeOrigin: true
    };
    return {
        [`/${projectMark}/**`]: {
            ...base,
            target: localPublicPath,
            bypass: req => req.url.replace(projectMark, 'views')
        },
        '/api/**': {
            ...base,
            target: `http://mock.${projectMark}.jd.com/`
        }
    };
}

module.exports = config;
