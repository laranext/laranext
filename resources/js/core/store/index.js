import Vue from 'vue'
import Vuex from 'vuex'
import flash from './modules/flash'
import modal from './modules/modal'
import action from './modules/action'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
    modules: {
        flash,
        modal,
        action
    },

    strict: debug
})

export default store
