import useIndexStore from './indexStore'
import index from '@/store/modules/index'
import storeModule from '@/util/storeModule'
import { computed } from '@vue/composition-api'

export default function (props) {
    storeModule('index', index, props.name)

    const { dispatch } = useIndexStore(props.name)

    dispatch('init', props)

    return {
        ...useIndexStore(props.name),
        cardTopbar: computed(() => !props.noSelect || !props.noFilters),
    }
}
