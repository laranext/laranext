import { createStore } from 'pinia'
import { useModalStore } from 'Store/modal'
import { useFormStore } from 'Store/form'
import { useFlashStore } from 'Store/flash'

export const useConfirmStore = createStore({
    id: 'confirm',

    state: () => ({
        confirm: false,
        callback: null,
        payload: null,
        processing: false
    }),

    actions: {
        proceed() {
            console.log('proceed')
            const { state: modal, hide } = useModalStore()
            const { state: form } = useFormStore(modal.name)()
            const { flash } = useFlashStore()

            this.state.processing = true

            this.state.callback(this.state.payload)
                .then(response => {
                    this.state.processing = false

                    hide()
                })
                .catch(error => {
                    if (error.response.status == 422) {
                        form.errors = error.response.data.errors
                    }

                    this.state.processing = false

                    flash(error.response.data.message, 'danger')
                })
        },

        confirm(callback, payload, modal) {
            let modalDefault = {
                danger: true,
                width: 'max-w-xl',
                component: 'confirm-modal',
            }

            const { show } = useModalStore()

            show({...modalDefault, ...modal})

            this.patch({
                callback,
                payload
            })
        }
    }
})
