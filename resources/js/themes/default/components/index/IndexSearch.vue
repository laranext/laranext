<template>
    <div class="flex relative">
        <inline-svg name="search" class="absolute ml-2" classes="text-gray-400" style="top: 8px;"></inline-svg>

        <input type="search"
               :placeholder="$t('words.search')"
               class="h-9 pl-10 appearance-none form-input"
               style="width: 18.75rem;"
               v-model="search"
               @input="handleSearch"
        >
    </div>
</template>

<script>
    import useIndexSearch from '@/use/indexSearch'

    export default {
        props: {
            name: String
        },

        setup({name}) {
            return { ...useIndexSearch(name) }
        }
    }
</script>
