import storeModule from '@/util/storeModule'
import { computed } from '@vue/composition-api'

export default function () {
    const { state, dispatch } = storeModule('modal')

    return {
        dispatch,
        button: computed(() => state.button),
        component: computed(() => state.component),
        danger: computed(() => state.danger),
        message: computed(() => state.message),
        namespace: computed(() => state.namespace),
        processing: computed(() => state.processing),
        show: computed(() => state.show),
        title: computed(() => state.title),
        width: computed(() => state.width),
    }
}
