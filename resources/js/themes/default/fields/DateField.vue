<template>
    <component :is="field.baseField" :name="name" :field="field">
        <flat-pickr :id="field.attribute"
                    :placeholder="field.placeholder ? field.placeholder : field.name"
                    class="w-full form-input"
                    :class="{ 'border-danger': form.errors[field.attribute] }"
                    v-model="form.data[field.attribute]"
        ></flat-pickr>
    </component>
</template>

<script>
    import { useFormStore } from 'Store/form'
    import flatPickr from 'vue-flatpickr-component'

    export default {
        components: {
            flatPickr
        },

        props: {
            name: String,
            field: Object
        },

        setup({name, field}) {
            const { state: form } = useFormStore(name)()

            return { form }
        }
    }
</script>
