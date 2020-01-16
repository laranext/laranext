import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
    state() {
        return {
            uri: '',
            action: '',
            actionIndex: '',
            selected: [],
            singleItem: {}
        }
    },

    namespaced: true,
    actions,
    getters,
    mutations
}
