import storeModule from '@/util/storeModule'
import { computed } from '@vue/composition-api'

export default function (name) {
    const { state, dispatch } = storeModule('index', name)

    return {
        dispatch,
        data: computed(() => state.data),
        config: computed(() => state.config),
        items: computed(() => state.items),
        loading: computed(() => state.loading),
        params: computed(() => state.params),
        filters: computed(() => state.filters),
        actions: computed(() => state.actions),
        appliedFilters: computed(() => state.appliedFilters),
        search: computed({
            get: () => state.params.search,
            set: val => dispatch('updateParam', { param: 'search', val })
        }),
        selected: computed({
            get: () => state.selected,
            set: val => dispatch('select', val)
        }),
        isSelectAll: computed(() => state.selected.length == state.items.length),
    }
}
