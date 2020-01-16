export default {
    setUri({commit}, payload) {
        commit('SET_URI', payload)
    },

    stopProcessing({commit}) {
        commit('SET_PROCESSING', false)
    },

    updateField({commit}, payload) {
        commit('UPDATE_FIELD', payload)
    },

    pushArrayField({commit}, payload) {
        commit('PUSH_ARRAY_FIELD', payload)
    },

    spliceArrayField({commit}, payload) {
        commit('SPLICE_ARRAY_FIELD', payload)
    },

    pushArrayOptions({commit}, payload) {
        commit('PUSH_ARRAY_OPTIONS', payload)
    },

    resetFields({commit}) {
        commit('SET_FIELDS')
        commit('SET_ERRORS', {})
    },

    resetErrors({commit}) {
        commit('SET_ERRORS', {})
    },

    setErrors({commit}, payload) {
        commit('SET_ERRORS', payload)
    },

    setFields({commit}, payload) {
        commit('SET_DATA', payload)

        commit('SET_FIELDS')

        commit('STOP_LOADING')
    },

    getFields({commit, dispatch}, payload) {
        axios.get(payload)
            .then(response => {
                dispatch('setFields', response.fields)
            })
    },

    submit({state, commit, dispatch}, payload) {
        commit('SET_PROCESSING', payload.type || true)

        const method = payload.id ? 'patch' : 'post'

        return new Promise((resolve, reject) => {
            axios[method](state.submitUri, state.fields)
                    .then(response => {
                        resolve(response)
                    })
                    .catch(error => {
                        if (error.response.status == 422) {
                            dispatch('setErrors', error.response.data.errors)
                        }

                        dispatch('flash/danger', error.response.data.message, { root: true })

                        commit('SET_PROCESSING', false)

                        reject(error)
                    })
        })
    },

    submitModal({state, commit, dispatch}, payload) {
        dispatch('modal/show', payload.modal, { root: true })

        return new Promise((resolve, reject) => {
            const unsubscribe = this.subscribeAction(action => {
                console.log('action.type: ' + action.type)
                if (action.type == 'modal/proceed') {
                    dispatch('submit', {})
                        .then(response => {
                            resolve(response)
                            commit('modal/PROCESSING', false, { root: true })
                        })
                        .catch(error => {
                            commit('modal/PROCESSING', false, { root: true })
                        })
                }

                if (action.type == 'modal/hide') {
                    unsubscribe()

                    // this.unregisterModule(payload.modal.namespace + 'Form')
                }
            })
        })
    }
}
