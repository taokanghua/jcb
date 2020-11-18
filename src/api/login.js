import req from '../utils/request'
import appid from '../web.config'

export default {
    getMsgCode: params => req.get('/code/sendCode', {params}),
    loginIn: data => req.post('/login/' + appid.appid + '/login', data),
    register: data => req.post('/login/' + appid.appid + '/register', data),
    forget: data => req.post('/login/' + appid.appid + '/forget', data),
    update: data => req.post('/login/' + appid.appid + '/update', data),
        // register: data => req.post()
}