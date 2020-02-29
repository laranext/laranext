<template>
    <component :is="field.baseField" :name="name" :field="field" classes="w-4/5">
        <textarea
            :id="field.attribute"
            rows="5"
            class="w-full form-control form-input form-input-bordered py-3 h-auto"
            :class="{ 'border-danger': form.errors[field.attribute] }"
            :placeholder="field.placeholder ? field.placeholder : field.name"
            v-model="form.data[field.attribute]"
        ></textarea>
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
