<template>
    <div class="flex items-center justify-center w-10 border border-gray-300 rounded px-2 ml-1 cursor-pointer" style="height: 42px;" @click="toggle">
        <inline-svg name="add"></inline-svg>

        <quick-add-process :namespace="field.quickAdd.namespace" :form-namespace="formNamespace" :field="field" v-if="process"></quick-add-process>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import QuickAddProcess from './QuickAddProcess'

    export default {
        components: {
            QuickAddProcess
        },

        data() {
            return {
                process: false
            }
        },

        props: {
            field: Object,
            namespace: String,
            formNamespace: String
        },

        computed: {
            ...mapState('modal', [
                'show'
            ])
        },

        watch: {
            show: function (value) {
                if (value == false)
                    this.toggle()
            }
        },

        methods: {
            toggle() {
                this.process = ! this.process
            }
        }
    }
</script>
