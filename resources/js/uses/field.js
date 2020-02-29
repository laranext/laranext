import { useFormStore } from 'Store/form'

export default {
    props: {
        name: String,
        field: Object
    },

    setup({name, field}) {
        const { state: form } = useFormStore(name)()

        return { form }
    }
}
