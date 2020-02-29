<template>
    <base-modal>
        <FormFields :name="modal.name"/>

        <template #button>
            <button class="btn ml-4 transition-all"
                    :class="{ 'btn-danger': modal.danger, 'btn-primary': !modal.danger }"
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
    import { useFormStore } from 'Store/form'
    import { useModalStore } from 'Store/modal'
    import { useConfirmStore } from 'Store/confirm'

    export default {
        setup() {
            const { state: modal } = useModalStore()
            const { state: confirm, proceed } = useConfirmStore()
            const { state: form, setFields } = useFormStore(modal.name)()

            setFields(modal.fields)

            return { modal, form, confirm, proceed }
        }
    }
</script>
