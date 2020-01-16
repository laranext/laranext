<template>
    <div class="flex">
        <div class="flex ml-auto mb-3">
            <detail-actions :id="id" :uri="uri" v-if="!noActions"></detail-actions>

            <detail-delete :id="id" :uri="uri" v-if="!noDelete"></detail-delete>

            <detail-edit :id="id" :uri="uri" v-if="!noEdit"></detail-edit>
        </div>
    </div>
</template>

<script>
    import DetailEdit from 'Theme/components/detail/DetailEdit'
    import DetailDelete from 'Theme/components/detail/DetailDelete'
    import DetailActions from 'Theme/components/detail/DetailActions'

    export default {
        components: {
            DetailEdit,
            DetailDelete,
            DetailActions
        },

        props: {
            id: Number,
            uri: String,
            noEdit: Boolean,
            noDelete: Boolean,
            noActions: Boolean
        },

        setup(props) {

        }
    }
</script>
