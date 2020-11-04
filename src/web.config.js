//服务器域名  

module.exports = {
    domain: process.env.NODE_ENV == 'development' ? 'http://api.chengdajiaoyu.com' : 'http://api.chengdajiaoyu.com', //测试服
}