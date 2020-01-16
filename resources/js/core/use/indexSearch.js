import debounce from 'debounce'
import useIndexStore from './indexStore'
import { computed } from '@vue/composition-api'

export default function (name) {
    const { dispatch } = useIndexStore(name)

    let handleSearch = debounce(function (e) {
        dispatch('fetch')
    }, 250)

    return {
        handleSearch,
        ...useIndexStore(name),
    }
}
