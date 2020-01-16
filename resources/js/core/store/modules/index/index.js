import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
    state() {
        return {
            loading: true,
            config: {},
            items: [],
            data: {},
            filters: [],
            appliedFilters: [],
            actions: [],
            selected: [],
            defaultOrderBy: 'id',
            params: {
                page: 1,
                search: null,
                searchColumn: 'name',
                searchNumericColumn: 'id',
                orderBy: 'id',
                orderByDirection: 'desc'
            }
        }
    },

    namespaced: true,
    actions,
    getters,
    mutations
}
