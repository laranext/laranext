import { createStore } from 'pinia'
import { useFormStore } from 'Store/form'
import { useModalStore } from 'Store/modal'
import { useFlashStore } from 'Store/flash'
import { useIndexStore } from 'Store/index'

export const useActionStore = createStore({
    id: 'action',

    state: () => ({
        callback: null,
        payload: null,
        processing: false
    }),

    actions: {
        performAction(items) {
            const { state: modal } = useModalStore()
            const { state: form } = useFormStore(modal.name)()
            const { state:index, fetch } = useIndexStore(modal.name)()
            const { flash } = useFlashStore()

            return new Promise((resolve, reject) => {
                axios.post(`${modal.uri}/action`, {
                    items,
                    action: modal.key,
                    fields: form.data
                })
                    .then(response => {
                        console.log('response')
                        console.log(response)
                        fetch()
                        index.selected = []
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
    }
})
