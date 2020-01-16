<template>
    <loading :loading="loading">
        <div v-if="Array.isArray(data)" key="form-fields">
            <component v-for="field in data"
                       :key="field.attribute"
                       :is="field.component"
                       :field="field"
                       :namespace="namespace"
            ></component>
        </div>

        <tabs-fields :namespace="namespace"
                     key="form-fields"
                     v-else
        ></tabs-fields>
    </loading>
</template>

<script>
    import TabsFields from './TabsFields'
    import DynamicModulesMixin from '@/util/dynamicModulesMixin'
    import TextField from 'Theme/components/fields/TextField'
    import QuickAdd from 'Theme/components/form/QuickAdd'
    import ConditionalField from 'Theme/components/fields/ConditionalField'
    import MultiSelectField from 'Theme/components/fields/MultiSelectField'
    import PasswordField from 'Theme/components/fields/PasswordField'
    import RadioField from 'Theme/components/fields/RadioField'
    import CheckboxField from 'Theme/components/fields/CheckboxField'
    import SelectField from 'Theme/components/fields/SelectField'
    import SelectFilterField from 'Theme/components/fields/SelectFilterField'
    import TextareaField from 'Theme/components/fields/TextareaField'
    import ImageField from 'Theme/components/fields/ImageField'
    import BooleanField from 'Theme/components/fields/BooleanField'
    import DateField from 'Theme/components/fields/DateField'

    export default {
        mixins: [ DynamicModulesMixin ],

        components: {
            TabsFields,
            QuickAdd,
            ConditionalField,
            MultiSelectField,
            PasswordField,
            RadioField,
            CheckboxField,
            SelectField,
            SelectFilterField,
            TextareaField,
            TextField,
            ImageField,
            BooleanField,
            DateField
        },

        props: {
            namespace: String,
            uri: String,
            fields: Array
            // fields: {
            //     type: Array,
            //     default: []
            // }
        },

        created() {
            if (this.fields)
                this.setFields(this.fields)
            else
                this.getFields(this.uri)
        },

        states: {
            Form: ['loading', 'data']
        },

        actions: {
            Form: ['getFields', 'setFields']
        }
    }
</script>
