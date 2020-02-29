import { createStore } from 'pinia'

export const useFlashStore = createStore({
    id: 'flash',

    state: () => ({
        message: null,
        type: 'success'
    }),

    actions: {
        hide() {
            this.state.message = null
        },

        flash(message, type = 'success') {
            this.state.message = message
            this.state.type = type

            setTimeout(() => {
                this.hide()
            }, 4000)
        },

        success(message) {
            this.flash(message, 'success')
        },

        danger(message) {
            this.flash(message, 'danger')
        }
    }
})
