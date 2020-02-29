import { createStore } from 'pinia'

export const useModalStore = createStore({
    id: 'modal',

    state: () => ({
        show: false
    }),

    actions: {
        show(payload) {
            this.state.show = true

            this.patch(payload)
        },

        hide() {
            this.state.show = false
        }
    }
})
