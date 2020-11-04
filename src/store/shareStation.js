//用于 两个页面组件 之间数据共享
export const BANNER_DATA = 'BANNER_DATA'
export const REMOVE_SHARE_DATA = 'REMOVE_SHARE_DATA'
const state = {};
const mutations = {
    /**@param {Object} payload {k:v}形式*/
    [BANNER_DATA](state, payload) {
        Object.assign(state, payload)
    },
}
const actions = {}

export default {
    state,
    actions,
    mutations
}