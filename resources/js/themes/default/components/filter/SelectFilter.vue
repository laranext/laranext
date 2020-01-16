<template>
    <div>
        <h3 class="text-sm uppercase tracking-wide text-gray-600 bg-gray-200 p-3">{{ filter.name }}</h3>

        <div class="p-2">
            <select class="block w-full form-select" v-model="value" @change="onChange">
                <option value="" selected="selected">—</option>
                <option v-for="(option, index) in filter.options" :key="index" :value="option.value">
                    {{ option.name }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
    import useFilter from '@/use/filter'

    export default {
        props: {
            name: String,
            filter: Object
        },

        setup(props) {
            return { ...useFilter(props) }
        }
    }
</script>
