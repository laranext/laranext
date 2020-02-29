<template>
    <transition name="fade-scale">
        <div class="fixed inset-0 pt-12 pb-12 px-6 overflow-y-auto bg-black-75 z-100"
             @click="hide"
             v-if="modal.show"
        >
            <div class="relative w-full mx-auto bg-white rounded-lg shadow-2xl"
                 :class="[modal.width]"
                 @click.stop
            >
                <component :is="modal.component"></component>
            </div>
        </div>
    </transition>
</template>

<script>
    import { useModalStore } from 'Store/modal'

    export default {
        setup() {
            const { state: modal, hide } = useModalStore()

            return { modal, hide }
        }
    }
</script>
