<template>
    <dropdown>
        <template #trigger>
            <button class="bg-gray-200 flex items-center h-9 rounded px-3 ml-3"
                    :class="{ 'bg-primary': index.appliedFilters.length }"
            >
                <inline-svg name="filter" :classes="index.appliedFilters.length ? 'text-white' : 'text-gray-600'"></inline-svg>
                <span v-if="index.appliedFilters.length" class="ml-2 text-white font-bold">{{ index.appliedFilters.length }}</span>
                <inline-svg name="arrow-down" :classes="(index.appliedFilters.length ? 'text-white' : 'text-gray-700') + ' ml-2'"></inline-svg>
            </button>
        </template>

        <div class="overflow-x-hidden overflow-y-auto" style="width: 290px; max-height: 350px;">
            <div class="text-gray-700 font-semibold text-sm uppercase bg-gray-200 py-2 border-b border-gray-400 cursor-pointer text-center hover:text-gray-500"
                 @click="resetFilters"
                 v-if="index.appliedFilters.length"
            >
                Reset Filters
            </div>

            <component v-for="(filter, index) in index.filters"
                       :is="filter.component"
                       :key="index"
                       :filter="filter"
                       :name="name"
            ></component>
        </div>
    </dropdown>
</template>

<script>
    import { useIndexStore } from 'Store/index'

    export default {
        props: {
            name: String
        },

        setup({name}) {
            const { state: index, resetFilters } = useIndexStore(name)()

            return { index, resetFilters }
        }
    }
</script>
