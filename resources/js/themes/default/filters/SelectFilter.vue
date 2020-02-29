<template>
    <div>
        <h3 class="text-sm uppercase tracking-wide text-gray-600 bg-gray-200 p-3">{{ filter.name }}</h3>

        <div class="p-2">
            <select class="block w-full form-select" v-model="index.params[filter.attribute]" @change="onChange">
                <option value="" selected="selected">—</option>
                <option v-for="(option, index) in filter.options" :key="index" :value="option.value">
                    {{ option.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
    import { useIndexStore } from 'Store/index'

    export default {
        props: {
            name: String,
            filter: Object
        },

        setup({name, filter}) {
            const { state: index, fetch, setAppliedFilter } = useIndexStore(name)()

            function onChange() {
                setAppliedFilter(filter)
                fetch()
            }

            return {
                index,
                onChange
            }
        }
    }
</script>
