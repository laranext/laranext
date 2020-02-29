<template>
    <div @click="selectAll">
        <input type="checkbox" class="form-checkbox h-5 w-5" :checked="isSelectAll">
    </div>
</template>

<script>
    import { useIndexStore } from 'Store/index'

    export default {
        props: {
            name: String
        },

        setup({name}) {
            const { state: index, selectAll, isSelectAll } = useIndexStore(name)()

            return { index, selectAll, isSelectAll }
        }
    }
</script>
