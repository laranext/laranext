<template>
    <div v-if="form.data[field.condition.field] == field.condition.value">
        <component v-for="field in field.fields"
                   :key="field.attribute"
                   :is="field.component"
                   :field="field"
                   :name="name"
        ></component>
    </div>
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
            console.log(form.data)
            return { form }
        }
    }
</script>
