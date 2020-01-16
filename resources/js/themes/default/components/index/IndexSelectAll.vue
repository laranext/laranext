<template>
    <div @click="dispatch('selectAll', isSelectAll)">
        <input type="checkbox" class="form-checkbox h-5 w-5" :checked="isSelectAll">
    </div>
</template>

<script>
    import useSelectAll from '@/use/selectAll'

    export default {
        props: {
            name: String
        },

        setup(props) {
            return { ...useSelectAll(props) }
        }
    }
</script>
