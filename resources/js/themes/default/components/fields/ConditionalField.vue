<template>
    <div v-if="fields[field.condition.field] == field.condition.value">
        <component v-for="field in field.fields"
                   :key="field.attribute"
                   :is="field.component"
                   :field="field"
                   :namespace="namespace"
        ></component>
    </div>
</template>

<script>
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
            field: Object
        },

        states: {
            Form: ['fields']
        }
    }
</script>
