<template>
    <div>
        <slot name="header">
            <div class="px-6 py-4 text-lg" v-if="modal.title">
                {{ modal.title }}
            </div>
        </slot>

        <slot></slot>

        <footer class="px-6 py-4 bg-gray-100 flex justify-end rounded-b-lg">
            <button class="btn btn-white transition-all" @click="hide">
                {{ $tc('words.cancel') }}
            </button>

            <slot name="button">
                <button class="btn-primary ml-4 transition-all"
                        :class="{ 'btn-danger': modal.danger }"
                >
                    Button
                </button>
            </slot>
        </footer>
    </div>
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
