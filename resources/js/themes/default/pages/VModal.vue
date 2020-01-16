<template>
    <transition name="fade-scale">
        <div class="fixed inset-0 pt-12 pb-12 px-6 overflow-y-auto bg-black-75 z-100"
             @click="dispatch('hide')"
             v-if="show"
        >
            <div class="relative w-full mx-auto bg-white rounded-lg shadow-2xl"
                 :class="[width]"
                 @click.stop
            >
                <component :is="component"
                           :namespace="namespace"
                ></component>
            </div>
        </div>
    </transition>
</template>

<script>
    import FormModal from 'Theme/components/modal/FormModal'
    import ConfirmModal from 'Theme/components/modal/ConfirmModal'
    import useModalStore from '@/use/modalStore'
    import { computed } from '@vue/composition-api'

    export default {
        components: {
            FormModal,
            ConfirmModal
        },

        setup() {
            return { ...useModalStore() }
        }
    }
</script>
