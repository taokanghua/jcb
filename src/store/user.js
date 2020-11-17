
//用于 两个页面组件 之间数据共享
export const INIT_USER = 'INIT_USER'
import api from '../api/user'
import { initToken, validateToken } from '../utils/auth';
import tokenHolder from '../utils/tokenHolder'
const state = {
    info: {}
};
const mutations = {
    SET_INFO(state, obj) {
        state.info = obj
    },
    [INIT_USER](state, payload) {
        Object.assign(state, payload)
    },
}
const actions = {
    async fetchUser({ commit }) {
        if (!validateToken(tokenHolder.get())) {
            initToken()
            return false;
        }
        let res = await api.getUserByToken()
        if (res.success) {
            commit(INIT_USER, res.result)
            return true
        }
        //token已过期：清除token
        tokenHolder.remove();
        initToken()
        return false
    }
}

export default {
    state,
    actions,
    mutations
}