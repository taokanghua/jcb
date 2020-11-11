import req from '../utils/request'

export default {
    getMsgCode: () => req.get('/code/sendCode'),
    // register: data => req.post()
}