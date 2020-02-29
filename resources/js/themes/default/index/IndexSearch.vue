<template>
    <div class="flex relative">
        <InlineSvg name="search" class="absolute ml-2" classes="text-gray-400" style="top: 8px;"/>

        <input
            type="search"
            :placeholder="$t('words.search')"
            class="h-9 pl-10 appearance-none form-input"
            style="width: 18.75rem;"
            v-model="index.params.search"
            @input="onSearch"
        >
    </div>
</template>

<script>
    import { useIndexStore } from 'Store/index'

    export default {
        props: {
            name: String
        },

        setup({name}) {
            const { state: index, onSearch } = useIndexStore(name)()

            return { index, onSearch }
        }
    }
</script>
