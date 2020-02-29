<template>
    <div>
        <component v-for="field in Array.isArray(form.fields) ? form.fields : form.fields[section]"
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
            section: String
        },

        setup({name, section}) {
            const { state: form } = useFormStore(name)()

            return { form }
        }
    }
</script>
