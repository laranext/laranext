<template>
    <button title="Delete" class="appearance-none cursor-pointer text-gray-500 hover:text-primary mr-3" @click="onDelete">
        <InlineSvg name="delete"/>
    </button>
</template>

<script>
    import { useIndexStore } from 'Store/index'
    import { useConfirmStore } from 'Store/confirm'

    export default {
        props: {
            name: String,
            item: Number
        },

        setup({name, item}, ctx) {
            const { confirm } = useConfirmStore()
            const { deleteItems } = useIndexStore(name)()

            function onDelete() {
                let items = []
                items.push(item)

                confirm(
                    deleteItems,
                    items,
                    {
                        title: ctx.root.$tc('miscellaneous.delete_resource'),
                        message: ctx.root.$tc('miscellaneous.delete_confirmation_message'),
                        button: ctx.root.$tc('words.delete')
                    }
                )
            }

            return { onDelete }
        }
    }
</script>
