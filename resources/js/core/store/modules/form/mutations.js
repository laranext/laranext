import app from '@/../app'

function setFields(state, payload) {
    for (let i = 0; i < payload.length; i++) {
        let field = payload[i],
            type = field.type,
            value = field.value,
            attribute = field.attribute

        if (field.fields)
            setFields(state, field.fields)

        if (type == 'array')
            app.$set(state.fields, attribute, value ? value : [])
        else if (type == 'object')
            app.$set(state.fields, attribute, value ? value : {})
        else if (attribute)
            app.$set(state.fields, attribute, value)
    }
}

function setTabsFields(state, payload) {
    for (const name in payload) {
        const tab = payload[name]

        setFields(state, tab.fields)
    }
}

export default {
    SET_URI(state, payload) {
        if (payload.id) {
            state.getUri = `${payload.uri}/${payload.id}/edit`
            state.submitUri = `${payload.uri}/${payload.id}`
        }
        else {
            state.getUri = `${payload.uri}/create${window.location.search}`
            state.submitUri = payload.uri
        }
    },

    SET_FIELDS(state, payload) {
        Array.isArray(payload) ? setFields(state, payload) : setTabsFields(state, payload)
    },

    SET_DATA(state, payload) {
        state.data = payload
    },

    SET_TAB(state, payload) {
        state.currentTab = payload
    },

    UPDATE_FIELD(state, payload) {
        state.fields[payload.field] = payload.value
    },

    PUSH_ARRAY_FIELD(state, payload) {
        state.fields[payload.field].push(payload.value)
    },

    SPLICE_ARRAY_FIELD(state, payload) {
        state.fields[payload.field].splice(payload.index, 1)
    },

    PUSH_ARRAY_OPTIONS(state, payload) {
        for (let i = 0; i < state.data.length; i++) {
            let item = state.data[i]

            if (item.attribute == payload.field) {
                item.options.unshift(payload.value)
                return
            }
        }
    },

    STOP_LOADING(state) {
        state.loading = false
    },

    SET_PROCESSING(state, payload) {
        state.processing = payload
    },

    SET_ERRORS(state, payload) {
        state.errors = payload
    },

    SET_DATA(state, payload) {
        state.data = payload
    },

    SET_FIELDS(state) {
        Array.isArray(state.data) ? setFields(state, state.data) : setTabsFields(state, state.data)
    },

    STOP_LOADING(state) {
        state.loading = false
    },

    UPDATE_FIELD(state, payload) {
        state.fields[payload.field] = payload.value
    },

    SET_ERRORS(state, payload) {
        state.errors = payload
    }
}
