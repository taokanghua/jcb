import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import shareStation from './shareStation'
import user from './user'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user,
        shareStation,
    },
    plugins: [
        persistedState({ storage: window.sessionStorage,key:'vuex-client' })
    ]
})

export default store