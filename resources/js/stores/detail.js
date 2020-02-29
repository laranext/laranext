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
            this.state.uri = App.key ? App.key + '/' + uri : uri
            this.state.baseUri = this.baseUri(uri)
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
