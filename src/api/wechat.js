import req from '../utils/request'
export default {

    /**用当前路由请求微信授权码 */
    getCode: (url) => req.get('wechat/code'),
    /**获取token */
    getToken: (params) => req.get('wechat',{params}),
    }