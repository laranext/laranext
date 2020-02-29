<template>
    <button title="Delete" class="btn btn-white ml-3" @click="onDelete">
        <InlineSvg name="delete"/>
    </button>
</template>

<script>
    import { useDetailStore } from 'Store/detail'
    import { useConfirmStore } from 'Store/confirm'

    export default {
        setup({name, item}, ctx) {
            const { confirm } = useConfirmStore()
            const { deleteItem } = useDetailStore()

            function onDelete() {
                confirm(
                    deleteItem,
                    null,
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
