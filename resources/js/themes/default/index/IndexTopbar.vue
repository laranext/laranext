<template>
    <div class="flex mb-6">
        <IndexSearch :name="name" v-if="!index.config.noSearch"/>

        <div class="flex ml-auto">
            <a :href="`${index.config.baseUri}/create`"
               class="btn btn-white"
               v-if="!index.config.noCreate && can(index.config.title.toLowerCase() + ':create')"
            >
                {{ $tc('words.create') }} {{ index.config.title }}
            </a>
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
