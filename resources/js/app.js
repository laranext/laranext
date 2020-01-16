import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import VueCompositionApi from '@vue/composition-api'
import axios from '@/util/axios'
import Pages from 'Theme/pages'
import store from '@/store'
import 'Theme/components/global'
import '@/components'

import i18n from '@/plugins/i18n'

Vue.use(VueCompositionApi)

Vue.use(VueProgressBar, {
    thickness: '3px',
    color: '#4099de',
    failedColor: '#e74444'
})

window.axios = axios

Vue.mixin({
    methods: {
        can: permission => {
            if (App.isSuperAdmin)
                return true

            return App.permissions.includes(permission)
        },

        cannot: permission => {
            if (App.isSuperAdmin)
                return false

            return ! App.permissions.includes(permission)
        }
    }
})

const app = new Vue({
    el: '#app',
    store,
    i18n,

    components: {
        ...Pages
    },

    setup() {
        i18n.locale = App.language
        i18n.setLocaleMessage(App.language, App.messages)
    }
})

export default app
