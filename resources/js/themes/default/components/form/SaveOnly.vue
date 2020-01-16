<template>
    <action-button class="btn-primary"
                   :processing="processing"
                   :disabled="processing"
                   @click.native="handleSubmit"
    >
        {{ $tc('words.save') }}
    </action-button>
</template>

<script>
    import { mapActions } from 'vuex'
    import DynamicModulesMixin from '@/util/dynamicModulesMixin'

    export default {
        mixins: [ DynamicModulesMixin ],

        props: {
            namespace: String
        },

        states: {
            Form: ['processing']
        },

        actions: {
            Form: ['submit', 'stopProcessing', 'resetErrors']
        },

        methods: {
            ...mapActions('flash', [
                'success'
            ]),

            handleSubmit() {
                this.submit({
                    namespace: this.namespace
                })
                    .then(response => {
                        this.resetErrors()

                        this.success(response.message)

                        this.stopProcessing()
                    })
            }
        }
    }
</script>
