<template>
    <button class="btn btn-primary"
            :disabled="form.processing"
            @click="onSubmit"
    >
        <LoadingSvg v-if="loading" color="text-white" width="40px"/>

        <slot v-else></slot>
    </button>
</template>

<script>
    import { useFormStore } from 'Store/form'
    import { useIndexStore } from 'Store/index'
    import { useFlashStore } from 'Store/flash'
    import { ref } from '@vue/composition-api'

    export default {
        props: {
            name: String,
            another: Boolean,
            samepage: Boolean,
            saveOnly: Boolean
        },

        setup({name, another, samepage, saveOnly}) {
            let { state: form, submit, reset } = useFormStore(name)(),
                { fetch } = useIndexStore(name)(),
                { flash } = useFlashStore(),
                loading = ref(false)

            function onSubmit() {
                if (form.processing) return

                loading.value = true

                submit()
                    .then(response => {
                        // Update samepage      samepage id
                            // -> Redirect
                        // Create               -
                            // -> Redirect
                        // Update               id
                            // -> Redirect

                        // Create & Add another         another
                            // -> Reset
                            // -> Loading False
                        // Create samepage              samepage
                            // -> Reset
                            // -> Fetch
                            // -> Loading False
                        // Update & Continue Editing    another id
                            // -> Loading False

                        flash(response.message)

                        if (another || (samepage && !form.id)) {
                            loading.value = false
                            form.processing = false

                            if (samepage) {
                                fetch()
                            }

                            if (!form.id && !saveOnly) {
                                reset()
                            }

                            return
                        }

                        location.href = response.redirect || `${form.baseUri}`
                    })
                    .catch(error => {
                        loading.value = false
                    })
            }

            return { form, onSubmit, loading }
        }
    }
</script>
