export default {
    namespaced: true,

    state: {
        show: false,

        uri: '',
        title: '',
        button: '',
        message: '',
        component: 'confirm-modal',
        namespace: '',
        danger: false,
        processing: false,
        width: 'max-w-xl'
    },

    mutations: {
        SHOW(state, payload) {
            state.show = true
        },

        HIDE(state) {
            state.show = false
        },

        PROCESSING(state, payload) {
            state.processing = payload
        },

        META(state, payload) {
            for (const key in payload) {
                state[key] = payload[key]
            }
        },
    },

    actions: {
        show({commit}, payload) {
            commit('SHOW')

            commit('META', payload)
        },

        hide({commit}) {
            commit('HIDE')
        },

        proceed({commit}) {
            commit('PROCESSING', true)
        },

        cancel() {}
    }
}
