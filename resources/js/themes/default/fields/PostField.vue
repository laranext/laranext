<template>
    <component :is="field.baseField" :name="name" :field="field">
        <div id="post-content">
            <div>+</div>
            <div>
                <input>
            </div>

            <section>
                <p contenteditable="true" v-model="p">write here...</p>
            </section>
        </div>

        <button @click="updatePost">Update Post</button>
    </component>
</template>

<script>
    import { useFormStore } from 'Store/form'
    import { ref } from '@vue/composition-api'

    export default {
        props: {
            name: String,
            field: Object
        },

        setup({name, field}) {
            const { state: form } = useFormStore(name)()
            let p = ref('default')

            function updatePost() {
                form.data[field.attribute] = document.querySelector('#post-content').innerHTML
            }

            return { form, p, updatePost }
        }
    }
</script>
