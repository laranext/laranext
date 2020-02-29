<template>
    <div>
        <div class="bg-white shadow-md rounded-lg">
            <CardDataLoading :loading="form.loading">
                <FormTabFields :name="name" v-if="tabs && !Array.isArray(form.fields)"/>

                <FormFields :name="name" v-else/>
            </CardDataLoading>
        </div>

        <div class="flex py-8" v-if="!form.loading">
            <div class="flex ml-auto" v-if="saveOnly">
                <FormSubmit :name="name" another save-only>
                    Save
                </FormSubmit>
            </div>

            <div class="flex ml-auto" v-else>
                <FormSubmit :name="name" another v-if="!samepage">
                    {{ id ? 'Update & Continue Editing' : 'Create & Add Another' }}
                </FormSubmit>

                <FormSubmit class="ml-4" :name="name" :samepage="samepage">
                    {{ id ? $tc('words.update') : $tc('words.create') }} {{ title }}
                </FormSubmit>
            </div>
        </div>
    </div>
</template>

<script>
    import { useFormStore } from 'Store/form'

    export default {
        props: {
            id: String,
            name: String,
            route: String,
            title: String,
            tabs: Boolean,
            samepage: Boolean,
            saveOnly: Boolean
        },

        setup(props) {
            const { state: form, init } = useFormStore(props.name)()

            init(props)

            return { form }
        }
    }
</script>
