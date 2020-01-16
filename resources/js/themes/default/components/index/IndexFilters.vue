<template>
    <dropdown>
        <template #trigger>
            <button class="bg-gray-200 flex items-center h-9 rounded px-3 ml-3"
                    :class="{ 'bg-primary': appliedFilters.length }"
            >
                <inline-svg name="filter" :classes="appliedFilters.length ? 'text-white' : 'text-gray-600'"></inline-svg>
                <span v-if="appliedFilters.length" class="ml-2 text-white font-bold">{{ appliedFilters.length }}</span>
                <inline-svg name="arrow-down" :classes="(appliedFilters.length ? 'text-white' : 'text-gray-700') + ' ml-2'"></inline-svg>
            </button>
        </template>

        <div class="overflow-x-hidden overflow-y-auto" style="width: 290px; max-height: 350px;">
            <div class="text-gray-700 font-semibold text-sm uppercase bg-gray-200 py-2 border-b border-gray-400 cursor-pointer text-center hover:text-gray-500"
                 @click="dispatch('resetFilters')"
                 v-if="appliedFilters.length"
            >
                Reset Filters
            </div>

            <component v-for="(filter, index) in filters"
                       :is="filter.component"
                       :key="index"
                       :filter="filter"
                       :name="name"
            ></component>
        </div>
    </dropdown>
</template>

<script>
    import useIndexStore from '@/use/indexStore'
    import DateFilter from 'Theme/components/filter/DateFilter'
    import RadioFilter from 'Theme/components/filter/RadioFilter'
    import SelectFilter from 'Theme/components/filter/SelectFilter'
    import CheckboxFilter from 'Theme/components/filter/CheckboxFilter'

    export default {
        components: {
            DateFilter,
            RadioFilter,
            SelectFilter,
            CheckboxFilter
        },

        props: {
            name: String
        },

        setup({name}) {
            return { ...useIndexStore(name) }
        }
    }
</script>
