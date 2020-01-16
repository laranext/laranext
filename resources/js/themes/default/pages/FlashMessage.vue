<template>
    <div class="fixed h-10 px-4 rounded flex items-center text-white"
         :class="[type]"
         style="right: 5%; bottom: 7%; touch-action: pan-y; z-index: 200;"
         v-if="message"
    >
        {{ message }}

        <inline-svg name="close" class="ml-2 cursor-pointer" width="20" height="20" @click.native="dispatch('hideFlash')"></inline-svg>
    </div>
</template>

<script>
    import storeModule from '@/util/storeModule'
    import { computed } from '@vue/composition-api'

    export default {
        setup() {
            const { state, dispatch } = storeModule('flash')

            return {
                dispatch,
                type: computed(() => state.type),
                message: computed(() => state.message)
            }
        }

        // computed: {
        //     ...mapState('flash', [
        //         'message', 'type'
        //     ])
        // },

        // methods: {
        //     ...mapActions('flash', [
        //         'hideFlash'
        //     ])
        // }
    }
</script>

<style lang="sass" scoped>
    .success
        background: #48BB78
    .danger
        background: #F56565
    .info
        background: #4299E1
    .warning
        background: #ECC94B
</style>
