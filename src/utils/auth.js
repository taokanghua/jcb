import tokenHolder from './tokenHolder'
import api from '../api/wechat'


/**
 * 保存当前链接，请求授权接口
 */
const applyWxAuth = async() => {
    let currentUrl = location.href
    localStorage.setItem('oauthUrl', currentUrl) //记录当前页url
    let res = await api.getCode(encodeURIComponent(currentUrl))
    if (!res.success) return false
    location.replace(res.result)
}

/** 
 *微信授权 初始化 token */
const initToken = async() => {
    //检查当前url
    const [domain, que] = location.href.split('?')
    const queries = Array
        .from(new URLSearchParams(que).entries())
        .reduce((pre, [k, v]) => (pre[k] = v, pre), {})
    if (!queries.code) return applyWxAuth()

    let params = { code: queries.code }
    if (queries.supplierId) {
        params.supplierId = queries.supplierId
    }
    let res = await api.getToken(params)
    if (!res.success) return
    tokenHolder.set(res.result.accessToken)
    location.replace(localStorage.getItem('oauthUrl'))

}

/** 核实 token 是否有效
 * @param {string} token 
 */
const validateToken = (token) => ['undefined', '', null].every(v => v != token)

var TOKEN_FLAG = false
const updateToken = () => {
    if (TOKEN_FLAG) return
    TOKEN_FLAG = true
    tokenHolder.remove()
    initToken()
}

export { initToken, updateToken, validateToken }

/**
 * 处理从接口返回的用户信息 的回调函数
 * @callback userInfoCallback
 * @param {Object} user //个人中心展示用户信息
 */