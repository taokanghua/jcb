//服务器域名  

module.exports = {
    domain: process.env.NODE_ENV == 'development' ? '192.168.2.108:8080/jcb-collect/api' : '192.168.2.108:8080/jcb-collect/api', //测试服
    appid: 'wx6661091e9a586849'

}