import { useIndexStore } from 'Store/index'

export default {
    props: {
        name: String
    },

    setup({name}) {
        const { state: index } = useIndexStore(name)()

        return { index }
    }
}
