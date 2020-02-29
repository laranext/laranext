<template>
    <component :is="field.baseField" :name="name" :field="field">
        <select class="form-select w-full"
                :class="{ 'border-danger': form.errors[field.attribute] }"
                :disabled="field.readonly"
                v-model="form.data[field.attribute]"
                required
        >
            <option value="null" disabled="disabled">Choose {{ field.name }}</option>
            <option :value="option.id" v-for="(option, index) in field.options">
                {{ option.name }}
            </option>
        </select>
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
