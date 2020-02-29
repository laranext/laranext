<template>
    <div class="fixed h-10 px-4 rounded flex items-center text-white"
         :class="[flash.type]"
         style="right: 5%; bottom: 7%; touch-action: pan-y; z-index: 200;"
         v-if="flash.message"
    >
        {{ flash.message }}

        <InlineSvg name="close" class="ml-2 cursor-pointer" width="20" height="20" @click.native="hide"/>
    </div>
</template>

<script>
    import { useFlashStore } from 'Store/flash'

    export default {
        setup() {
            let { state: flash, hide } = useFlashStore()

            return {
                hide,
                flash
            }
        }
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
