<template>
    <input type="checkbox" class="form-checkbox h-5 w-5" :value="value" v-model="selected">
</template>

<script>
    export default {
        props: {
            namespace: String,
            value: Number
        },

        computed: {
            selected: {
                get() {
                    return this.$store.state[this.namespace + 'Actions'].selected
                },
                set(value) {
                    this.$store.dispatch(this.namespace + 'Actions/select', value)
                }
            }
        }
    }
</script>
