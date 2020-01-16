import { capitalize } from '@/util'

export default {
    action({commit, dispatch}, payload) {
        return new Promise((resolve, reject) => {
            axios(payload)
                .then(response => {
                    resolve(response)

                    commit('modal/PROCESSING', false, { root: true })
                    dispatch('modal/hide', null, { root: true })
                })
                .catch(error => {
                    if (error.response.status == 422) {
                        dispatch('actionForm/setErrors', error.response.data.errors, { root: true })
                        dispatch('flash/danger', error.response.data.message, { root: true })
                    }

                    commit('modal/PROCESSING', false, { root: true })
                })
        })
    },

    confirm({commit, dispatch}, payload) {
        dispatch('modal/show', payload.modal, { root: true })

        return new Promise((resolve, reject) => {
            const unsubscribe = this.subscribeAction(action => {
                console.log(action.type)
                if (action.type == 'modal/proceed') {
                    dispatch('action', payload.request)
                        .then(response => {
                            resolve(response)

                            commit('index'+ capitalize(payload.name) +'/SELECT', [], { root: true })
                            dispatch('index'+ capitalize(payload.name) +'/fetch', null, { root: true })
                            dispatch('flash/success', response.message, { root: true })
                        })
                }

                if (action.type == 'modal/hide') unsubscribe()
            })
        })
    }
}
