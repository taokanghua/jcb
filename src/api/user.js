import req from '../utils/request'
export default {
    /**根据已有的token 获取用户信息 */
    getUserByToken: () => req.get('user'),
   
    }