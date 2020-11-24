import axios from 'axios'
import { updateToken } from './auth'
import tokenHolder from './tokenHolder'
import qs from 'qs';
//const ApiUrl = process.env.NODE_ENV == 'development' ? 'http://192.168.2.108:8080/jcb-collect/api' : 'http://api.chengdajiaoyu.com'
const defaultUrl = 'http://192.168.2.108:8001/jcb-collect/api'
// const defaultUrl = 'http://192.168.2.117:8080/jcb-collect/api'
// const defaultUrl = 'http://192.168.2.173:8001/jcb-collect/api'
const request = axios.create({
    baseURL: defaultUrl,
    timeout: 10000 // 请求超时时间
})

request.interceptors.request.use(config => {

        let token = tokenHolder.get()
        // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2MDU1MDQ1MTUsImV4cCI6MTYwODA5NjUxNSwidXNlcklkIjoiMTMyNzg2NzY5NzU0MDM3ODYyNSIsImlhdCI6MTYwNTUwNDUxNSwianRpIjoiMTMyNzg2NzY5NzU0MDM3ODYyNSIsInVzZXJuYW1lIjoiMTM0MDk4MjAzNDEifQ.1iszcDic-PXQOPh_3nKwY45oMavO-JufFRvredfGIZ0'
        if (token) {
            config.headers['token'] = token
        }
        if (config.method === 'get') {
            // 如果是get请求，且params是数组类型如arr=[1,2]，则转换成arr=1&arr=2
            config.paramsSerializer = function(params) {
                return qs.stringify(params, { arrayFormat: 'repeat' })
            }
        }

        return config
    }, err)
    /** 处理接口报错，并封装返回值，调用接口时不用.catch 捕捉错误 */
const handleResErr = err => {
    const res = err.response.data
    return Promise.resolve({
        code: err.response.status,
        msg: res.error.message,
        success: false
    })
}
request.interceptors.response.use(response => {


    if (response.data.msg == '未授权登录') {
        updateToken()
    }
    return Promise.resolve(response.data)
}, handleResErr)

const err = error => {

    console.error(error, '未处理错误')
    return Promise.reject(error)
}
export default request