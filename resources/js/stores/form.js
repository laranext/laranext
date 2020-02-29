import { createStore } from 'pinia'
import { useFlashStore } from 'Store/flash'

export const useFormStore = function (name) {
    let data = {}

    return createStore({
        id: 'form-' + name,

        state: () => ({
            id: null,
            uri: '',
            baseUri: '',
            data: {},
            errors: {},
            fields: [],
            getUri: '',
            submitUri: '',
            loading: true,
            processing: false
        }),

        actions: {
            init({id, route}) {
                const uri = App.key ? `${App.key}/${route}` : route

                if (id) {
                    this.patch({
                        id,
                        uri,
                        baseUri: this.baseUri(route),
                        getUri: `${uri}/${id}/edit`,
                        submitUri: `${uri}/${id}`
                    })
                }
                else {
                    this.patch({
                        uri,
                        baseUri: this.baseUri(route),
                        getUri: `${uri}/create${window.location.search}`,
                        submitUri: uri
                    })
                }

                this.getFields()
            },

            baseUri(segment) {
                let prefix = App.adminPrefix,
                    key = App.key,
                    uri = '/',
                    route = segment.split('?')[0]

                if (prefix && key)
                    uri += prefix + '/' + key + '/' + route
                else if (prefix)
                    uri += prefix + '/' + route
                else
                    uri += key + '/' + route

                return uri
            },

            setFieldsData(fields) {
                if (Array.isArray(fields)) {
                    for (let i = 0; i < fields.length; i++) {
                        const {attribute, value, sub} = fields[i]

                        if (sub && sub.length) {
                            this.setFieldsData(sub)

                            return
                        }

                        data[attribute] = value
                    }

                    return
                }

                for (let key in fields) {
                    this.setFieldsData(fields[key])
                }
            },

            getFields() {
                axios.get(this.state.getUri)
                    .then(fields => {
                        this.state.fields = fields
                        this.state.loading = false
                        this.setFieldsData(fields)
                        this.state.data = data
                    })
            },

            setFields(fields) {
                this.state.fields = fields
                this.setFieldsData(fields)
                this.state.data = data
            },

            reset() {
                this.state.data = {}
                this.state.errors = {}
            },

            submit() {
                const method = this.state.id ? 'patch' : 'post',
                      { flash } = useFlashStore()

                this.state.processing = true

                return new Promise((resolve, reject) => {
                    axios[method](this.state.submitUri, this.state.data)
                            .then(response => resolve(response))
                            .catch(error => {
                                if (error.response.status == 422) {
                                    this.state.errors = error.response.data.errors
                                }

                                this.state.processing = false
                                flash(error.response.data.message, 'danger')

                                reject(error)
                            })
                })
            }
        }
    })
}
