var baseUrl = require('./src/web.config')
module.exports = {
    publicPath: './', // 根路径
    outputDir: 'dist', // 构建输出目录
    assetsDir: 'assets', // 静态资源目录(js,css,img)
    lintOnSave: false, // 是否开启eslint保存检测
    devServer: {
        open: true, // 是否自动打开浏览器
        https: false,
        // host:'lhxy.chengdajiaoyu.com',
        // port:80,
        // // proxy:baseUrl.domain,
        // proxy:{
        //     '/api':{
        //         target:'http://192.168.1.109',
        //         // target:baseUrl.domain,
        //         changeOrigin:true,
        //         // logLevel:"debug",
        //         pathRewrite:{'^/api':''}
        //     }
        // },
        // hotOnly: true // 不太清楚这个，给个false吧
    },
    transpileDependencies: ['vuex-persist'],
    chainWebpack: config => {
        config
            .entry('index')
            .add('babel-polyfill')
    }
}