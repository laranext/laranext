export default {
    namespaced: true,

    state: {
        message: null,
        type: 'success'
    },

    mutations: {
        SHOW_FLASH(state, payload) {
            state.message = payload.message
            state.type = payload.type ? payload.type : 'success'
        },

        HIDE_FLASH(state) {
            state.message = null
        }
    },

    actions: {
        flash({commit}, payload) {
            commit('SHOW_FLASH', payload)

            setTimeout(() => {
                commit('HIDE_FLASH')
            }, 4000)
        },

        hideFlash({commit}) {
            commit('HIDE_FLASH')
        },

        success({dispatch}, payload) {
            dispatch('flash', {
                message: payload,
                type: 'success'
            })
        },

        danger({dispatch}, payload) {
            dispatch('flash', {
                message: payload,
                type: 'danger'
            })
        },
    }
}
