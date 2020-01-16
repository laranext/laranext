<template>
    <div class="flex-1">
        <div class="card">
            <form-fields :namespace="namespace" :uri="getUri"></form-fields>
        </div>

        <div class="py-8" v-if="!loading">
            <div v-if="namespace == 'setting'" key="form-setting-button" class="flex">
                <div class="flex ml-auto">
                    <save-only :namespace="namespace"></save-only>
                </div>
            </div>

            <div v-else key="form-setting-button" class="flex">
                <div class="flex ml-auto" v-if="singleButton" key="form-submit-button">
                    <submit-single :namespace="namespace" :path="path" :id="id" :title="title" :uri="uri"></submit-single>
                </div>

                <div class="flex ml-auto" v-else key="form-submit-button">
                    <submit-another :namespace="namespace" :id="id" :title="title" class="mr-4"></submit-another>

                    <submit-default :namespace="namespace" :path="path" :id="id" :title="title" :uri="uri"></submit-default>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Form from '@/store/modules/form'
    import SubmitSingle from 'Theme/components/form/SubmitSingle'
    import SaveOnly from 'Theme/components/form/SaveOnly'
    import SubmitAnother from 'Theme/components/form/SubmitAnother'
    import SubmitDefault from 'Theme/components/form/SubmitDefault'
    import FormFields from 'Theme/components/form/FormFields'
    import DynamicModulesMixin from '@/util/dynamicModulesMixin'

    export default {
        mixins: [ DynamicModulesMixin ],

        components: {
            SaveOnly,
            SubmitSingle,
            SubmitAnother,
            SubmitDefault,
            FormFields
        },

        modules: {
            Form
        },

        props: {
            path: String,
            id: String,
            uri: String,
            title: String,
            namespace: String,
            singleButton: Boolean
        },

        created() {
            this.setUri({
                id: this.id,
                uri: this.uri
            })
        },

        states: {
            Form: ['loading', 'getUri']
        },

        actions: {
            Form: ['setUri']
        }
    }
</script>
