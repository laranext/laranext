<template>
    <component :is="field.baseField" :name="name" :field="field">
        <input
            class="w-full form-input"
            v-model="form.data[field.attribute]"
            :id="field.attribute"
            :type="field.type"
            :placeholder="field.placeholder ? field.placeholder : field.name"
            :class="{ 'border-danger': form.errors[field.attribute] }"
            :readonly="field.readonly"
        >
    </component>
</template>

<script>
    import { useFormStore } from 'Store/form'

    export default {
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
