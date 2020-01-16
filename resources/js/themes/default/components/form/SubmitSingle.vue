<template>
    <action-button class="btn-primary"
                   :processing="processing == 'single'"
                   :disabled="processing"
                   @click.native="handleSubmit"
    >
        {{ buttonText() }} {{ title }}
    </action-button>
</template>

<script>
    import { mapActions } from 'vuex'
    import DynamicModulesMixin from '@/util/dynamicModulesMixin'

    export default {
        mixins: [ DynamicModulesMixin ],

        props: {
            path: String,
            uri: String,
            id: String,
            title: String,
            namespace: String
        },

        states: {
            Form: ['processing']
        },

        actions: {
            Form: ['submit', 'stopProcessing', 'resetFields', 'resetErrors'],
            Index: ['fetch']
        },

        methods: {
            ...mapActions('flash', [
                'success'
            ]),

            buttonText() {
                return this.id ? 'Update' : 'Create'
            },

            handleSubmit() {
                this.submit({
                    id: this.id,
                    type: 'single',
                    namespace: this.namespace
                })
                    .then(response => {
                        if (!this.id) {
                            this.resetFields()
                        } else {
                            location.href = response.redirect ? response.redirect : `/${this.path}/${this.uri}`
                            this.resetErrors()
                        }

                        this.fetch()

                        this.success(response.message)

                        this.stopProcessing()
                    })
            }
        }
    }
</script>
