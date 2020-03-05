import { createStore } from 'pinia'

export const useDetailStore = createStore({
    id: 'detail',

    state: () => ({
        id: '',
        uri: '',
    }),

    actions: {
        setConfig({id, uri}) {
            this.state.id = id
            this.state.uri = this.setUri(uri)
            this.state.baseUri = this.baseUri(uri)
        },

        setUri(uri) {
            App.key ? App.key + '/' + uri : uri
            if (App.key && uri) {
                return App.key + '/' + uri
            }
            else if (App.key) {
                return App.key
            }
            else {
                return uri
            }
        },

        baseUri(segment) {
            let prefix = App.adminPrefix,
                key = App.key,
                uri = '/',
                route = segment.split('?')[0]

            if (prefix && key) {
                uri += route ? prefix + '/' + key + '/' + route : prefix + '/' + key
            }
            else if (prefix) {
                uri += route ? prefix + '/' + route : prefix
            }
            else {
                uri += route ? key + '/' + route : key
            }

            return uri
        },

        deleteItem() {
            return new Promise((resolve, reject) => {
                axios.delete(`${this.state.uri}/null`, {
                    data: {
                        items: [this.state.id]
                    }
                })
                    .then(response => {
                        console.log('response')
                        console.log(response)
                        location.href = response.redirect || `${this.state.baseUri}`
                        // resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        }
    }
})
