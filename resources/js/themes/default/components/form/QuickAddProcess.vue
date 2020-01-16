<template></template>

<script>
    import { mapActions } from 'vuex'
    import Form from '@/store/modules/form'
    import DynamicModulesMixin from '@/util/dynamicModulesMixin'

    export default {
        mixins: [ DynamicModulesMixin ],

        created() {
            this.handleOnCreated()
        },

        modules: {
            Form
        },

        props: {
            field: Object,
            namespace: String,
            formNamespace: String
        },

        actions: {
            Form: ['submitModal', 'stopProcessing']
        },

        methods: {
            ...mapActions('flash', [
                'success'
            ]),

            ...mapActions('modal', [
                'hide'
            ]),

            handleOnCreated() {
                this.submitModal({
                    modal: {
                        width: 'max-w-2xl',
                        title: this.field.quickAdd.title,
                        component: 'form-modal',
                        namespace: this.namespace,
                        uri: this.field.quickAdd.uri,
                        button: this.field.quickAdd.button || 'Create'
                    }
                })
                    .then(response => {
                        this.success(response.message)

                        this.stopProcessing()

                        this.hide()

                        if (response.option) {
                            this.$store.dispatch(this.formNamespace + 'Form/pushArrayOptions', {
                                field: this.field.attribute,
                                value: response.option
                            })
                        }

                        // this.$store.dispatch(this.formNamespace + 'Form/updateField', {
                        //     field: this.field.attribute,
                        //     value: 22
                        // })
                    })
            }
        }
    }
</script>
