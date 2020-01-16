import Vue from 'vue'

export default {
    SORT(state, payload) {
        let orderBy = state.params.orderBy,
            direction = state.params.orderByDirection

        if (orderBy == payload && direction == 'asc') {
            state.params.orderByDirection = 'desc'
        }
        else if (orderBy == payload && direction == 'desc') {
            state.params.orderBy = state.defaultOrderBy
            state.params.orderByDirection = 'desc'
        }
        else {
            state.params.orderBy = payload
            state.params.orderByDirection = 'asc'
        }
    },

    SET_APPLIED_FILTER(state, {attribute, component, value}) {
        let param = state.params[attribute].toString()

        if (param != value.toString() || component == 'date-filter') {
            if (state.appliedFilters.indexOf(attribute) === -1) state.appliedFilters.push(attribute)
        }
        else {
            const index = state.appliedFilters.indexOf(attribute)
            state.appliedFilters.splice(index, 1)
        }
    },

    CLEAR_APPLIED_FILTERS(state) {
        state.appliedFilters = []
    },

    STATE(state, {key, val}) {
        state[key] = val
    },

    ADD_PARAM(state, {param, val}) {
        Vue.set(state.params, param, val)
    },

    PARAM(state, {param, val}) {
        state.params.page = 1
        state.params[param] = val
    },

    LOADING(state, payload) {
        state.loading = payload
    },

    CONFIG(state, payload) {
        state.config = payload
    },

    DATA(state, payload) {
        state.data = payload
    },

    ITEMS(state, payload) {
        state.items = payload
    },

    SELECT(state, payload) {
        state.selected = payload
    },

    PAGE(state, payload) {
        state.params.page = state.params.page + payload
    }
}
