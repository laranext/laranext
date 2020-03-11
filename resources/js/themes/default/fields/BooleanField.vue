<template>
    <component :is="field.baseField" :name="name" :field="field">
        <input
            class="form-checkbox h-5 w-5"
            type="checkbox"
            v-model="form.data[field.attribute]"
            :id="field.attribute"
            :disabled="field.readonly"
            :class="[field.classes]"
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
