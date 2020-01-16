import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
    state() {
        return {
            data: {},
            errors: {},
            fields: {},
            getUri: '',
            submitUri: '',
            loading: true,
            processing: false
        }
    },

    namespaced: true,
    actions,
    getters,
    mutations
}
