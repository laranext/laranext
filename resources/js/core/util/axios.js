import axios from 'axios'
import app from '@/../app'

const instance = axios.create()

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
instance.defaults.baseURL = '/laranext-api/'
instance.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector(
    'meta[name="csrf-token"]'
).content

instance.interceptors.request.use(config => {
    app.$Progress.start()

    return config
})

instance.interceptors.response.use(
    ({data}) => {
        app.$Progress.finish()

        return data
    },
    error => {
        const { status } = error.response

        // Show the user a 500 error
        if (status >= 500) {
            // Laranext.app.$store.dispatch('flash/danger', error.response.data.message)
        }

        // Handle Session Timeouts
        if (status === 401) {
            window.location.href = '/login'
        }

        // Handle Forbidden
        if (status === 403) {
            // Laranext.app.$store.dispatch('flash/danger', error.response.data.message)
        }

        // Handle Token Timeouts
        if (status === 419) {
            // Laranext.app.$store.dispatch('flash/danger', error.response.data.message)
            // location.reload()
        }

        app.$Progress.fail()

        return Promise.reject(error)
    }
)

export default instance
