export default {
    SET_ACTION(state, payload) {
        state.actionIndex = payload.index
        state.action = payload.action
    },

    SELECT(state, payload) {
        state.selected = payload
    },

    SELECT_ALL(state, payload) {
        state.selected = payload
    },

    SET_PROCESSING(state, payload) {
        state.processing = payload
    },

    SET_CONFIRM(state, payload) {
        state.confirm = payload
    },

    SET_SINGLE_ITEM(state, payload) {
        state.singleItem = payload
    }
}
