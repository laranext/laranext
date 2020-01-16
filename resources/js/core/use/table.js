import useIndexStore from './indexStore'
import { computed } from '@vue/composition-api'

export default function ({name}) {
    const { dispatch } = useIndexStore(name)

    const sort = function sort({attribute, sortable}) {
        if (sortable)
            dispatch('sort', attribute)
    }

    return {
        sort,
        ...useIndexStore(name),
    }
}
