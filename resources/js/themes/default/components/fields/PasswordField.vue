<template>
    <component :namespace="namespace"
               :is="field.field"
               :field="field"
    >
        <div class="flex items-center border rounded"
             :class="{ 'border-danger': errors[field.attribute] }"
        >
            <input :id="field.attribute"
                   :type="type"
                   autocomplete="new-password"
                   :placeholder="field.placeholder ? field.placeholder : field.name"
                   class="h-10 px-3 w-full focus:outline-none rounded"
                   v-model="value"
                   :readonly="field.readonly">

            <div class="px-2 cursor-pointer" @click="handleView">
                <inline-svg name="view" :classes="color"></inline-svg>
            </div>
        </div>
    </component>
</template>

<script>
    import FieldMixin from '@/util/FieldMixin'

    export default {
        mixins: [ FieldMixin ],

        data() {
            return {
                type: 'password'
            }
        },

        computed: {
            color() {
                if (this.type == 'password')
                    return 'text-red-500'

                return 'text-green-500'
            }
        },

        methods: {
            handleView() {
                if (this.type == 'password') {
                    this.type = 'text'
                    return
                }

                this.type = 'password'
            }
        }
    }
</script>
