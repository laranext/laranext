<template>
    <button class="btn" @click="dispatch('fetch')">
        Refresh
    </button>
</template>

<script>
    import useIndexStore from '@/use/indexStore'

    export default {
        props: {
            name: String
        },

        setup(props) {
            const { dispatch } = useIndexStore(props.name)

            return { dispatch }
        }
    }
</script>
