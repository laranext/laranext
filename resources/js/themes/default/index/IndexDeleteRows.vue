<template>
    <button title="Delete" class="bg-gray-200 flex items-center h-9 rounded px-3 ml-3" @click="onDelete">
        <InlineSvg name="delete" classes="text-gray-600"/>
    </button>
</template>

<script>
    import { useIndexStore } from 'Store/index'
    import { useConfirmStore } from 'Store/confirm'

    export default {
        props: {
            name: String
        },

        setup({name}, ctx) {
            const { confirm } = useConfirmStore()
            const { state: index, deleteItems } = useIndexStore(name)()

            function onDelete() {
                confirm(
                    deleteItems,
                    index.selected,
                    {
                        title: ctx.root.$tc('miscellaneous.delete_resource', 2),
                        message: ctx.root.$tc('miscellaneous.delete_confirmation_message', 2),
                        button: ctx.root.$tc('words.delete'),
                    }
                )
            }

            return { onDelete }
        }
    }
</script>
