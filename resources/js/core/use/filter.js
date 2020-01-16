import storeModule from '@/util/storeModule'
import { computed } from '@vue/composition-api'

export default function ({name, filter}) {
    const { state, dispatch } = storeModule('index', name)

    dispatch('addParam', {param: filter.attribute, val: filter.value})

    function onChange() {
        dispatch('setAppliedFilter', filter)
        dispatch('fetch')
    }

    return {
        onChange,
        value: computed({
            get: () => state.params[filter.attribute],
            set: val => dispatch('updateParam', { param: filter.attribute, val })
        })
    }
}
