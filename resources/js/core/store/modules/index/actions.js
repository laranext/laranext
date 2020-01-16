export default {
    select({commit}, payload) {
        commit('SELECT', payload)
    },

    selectAll({state, commit}, isSelectAll) {
        let items = []

        if (!isSelectAll) {
            for (const key in state.items) {
                items.push(state.items[key].id)
            }
        }

        commit('SELECT', items)
    },

    addParam({commit}, payload) {
        commit('ADD_PARAM', payload)
    },

    updateParam({commit}, payload) {
        commit('PARAM', payload)
    },

    setAppliedFilter({commit}, payload) {
        commit('SET_APPLIED_FILTER', payload)
    },

    sort({commit, dispatch}, payload) {
        commit('SORT', payload)
        dispatch('fetch')
    },

    paginate({commit, dispatch}, payload) {
        commit('PAGE', payload)

        dispatch('fetch')
    },

    fetch({state, commit}) {
        commit('LOADING', true)

        axios.get(state.config.uri, {
            params: state.params
        })
            .then(data => {
                commit('ITEMS', data.data)
                commit('DATA', data)
                commit('LOADING', false)
            })
    },

    getActions({state, commit}) {
        axios.get(state.config.uri + '/actions')
            .then(data => commit('STATE', {key: 'actions', val: data}))
    },

    getFilters({state, commit}) {
        axios.get(state.config.uri + '/filters')
            .then(data => commit('STATE', {key: 'filters', val: data}))
    },

    resetFilters({state, commit, dispatch}) {
        for (let i = 0; i < state.filters.length; i++) {
            let filter = state.filters[i]

            commit('PARAM', {param: filter.attribute, val: filter.value})
        }

        commit('CLEAR_APPLIED_FILTERS')

        dispatch('fetch')
    },

    init({commit, dispatch}, payload) {
        commit('CONFIG', payload)
        commit('PARAM', {param: 'only', val: payload.only})
        commit('PARAM', {param: 'except', val: payload.except})
        commit('PARAM', {param: 'searchColumn', val: payload.searchColumn})

        dispatch('fetch')

        if (!payload.noActions)
            dispatch('getActions')

        if (!payload.noFilters)
            dispatch('getFilters')
    }
}
