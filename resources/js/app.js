import Vue from 'vue'
import axios from 'Util/axios'
import i18n from '@/plugins/i18n'
import VueProgressBar from 'vue-progressbar'
import VueCompositionApi from '@vue/composition-api'
import '@/components'
import 'Theme/index.js'

window.axios = axios

Vue.use(VueCompositionApi)

Vue.use(VueProgressBar, {
    thickness: '3px',
    color: '#4099de',
    failedColor: '#e74444'
})

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

export default new Vue({
    el: '#app',
    i18n,

    setup() {
        i18n.locale = App.language
        i18n.setLocaleMessage(App.language, App.messages)
    }
})
