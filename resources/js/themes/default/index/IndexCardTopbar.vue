<template>
    <div class="py-3 flex items-center border-b border-gray-300">
        <div class="flex items-center px-3 h-9" v-if="index.items.length">
            <IndexSelectAll :name="name"/>
        </div>

        <div class="flex ml-auto px-3">
            <IndexActions :name="name" v-if="!index.config.noActions && index.selected.length"/>

            <IndexFilters :name="name" v-if="!index.config.noFilters"/>

            <IndexDeleteRows :name="name"
                             v-if="index.selected.length && !index.config.noDelete && can(index.config.title.toLowerCase() + ':delete')"
            />
        </div>
    </div>
</template>

<script>
    import { useIndexStore } from 'Store/index'

    export default {
        props: {
            name: String
        },

        setup({name}) {
            const { state: index } = useIndexStore(name)()

            return { index }
        }
    }
</script>
