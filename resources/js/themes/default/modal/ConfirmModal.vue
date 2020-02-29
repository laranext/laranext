<template>
    <base-modal>
        <div class="px-6 mb-4">
            {{ modal.message }}
        </div>

        <template #button>
            <button class="btn ml-4 transition-all"
                    :class="{ 'btn-danger': modal.danger }"
                    :disabled="confirm.processing"
                    @click="proceed"
            >
                <LoadingSvg v-if="confirm.processing" color="text-white" width="40px"/>

                <span v-else>{{ modal.button }}</span>
            </button>
        </template>
    </base-modal>
</template>

<script>
    import { useModalStore } from 'Store/modal'
    import { useConfirmStore } from 'Store/confirm'

    export default {
        setup() {
            const { state: modal } = useModalStore()
            const { state: confirm, proceed } = useConfirmStore()

            return { modal, confirm, proceed }
        }
    }
</script>
