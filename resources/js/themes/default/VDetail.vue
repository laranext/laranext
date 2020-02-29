<template>
    <div class="flex">
        <div class="flex ml-auto mb-3">
            <!-- <detail-actions :id="id" :uri="uri" v-if="!noActions"></detail-actions> -->

            <DetailDelete v-if="!noDelete && can(name + ':delete')"/>

            <a :href="`${detail.baseUri}/${id}/edit`" class="btn btn-primary ml-3" v-if="!noEdit && can(name + ':edit')">
                <InlineSvg name="edit"/>
            </a>
        </div>
    </div>
</template>

<script>
    import { useDetailStore } from 'Store/detail'

    export default {
        props: {
            name: String,
            id: Number,
            uri: String,
            noEdit: Boolean,
            noDelete: Boolean,
            noActions: Boolean
        },

        setup(props) {
            const { state: detail, setConfig } = useDetailStore()

            setConfig(props)

            return { detail }
        }
    }
</script>
