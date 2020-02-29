<template>
    <component :is="field.baseField" :name="name" :field="field">
        <div class="flex items-center border rounded"
             :class="{ 'border-danger': form.errors[field.attribute] }"
        >
            <input :id="field.attribute"
                   :type="type"
                   autocomplete="new-password"
                   :placeholder="field.placeholder ? field.placeholder : field.name"
                   class="h-10 px-3 w-full focus:outline-none rounded"
                   v-model="form.data[field.attribute]"
                   :readonly="field.readonly"
            >

            <div class="px-2 cursor-pointer" @click="onView">
                <inline-svg name="view" :classes="color"></inline-svg>
            </div>
        </div>
    </component>
</template>

<script>
    import { useFormStore } from 'Store/form'
    import { ref, computed } from '@vue/composition-api'

    export default {
        props: {
            name: String,
            field: Object
        },

        setup({name, field}) {
            const { state: form } = useFormStore(name)(),
                  type = ref('password'),
                  color = computed(() => {
                      if (type.value == 'password')
                          return 'text-red-500'

                      return 'text-green-500'
                  })

            function onView() {
                if (type.value == 'password') {
                    type.value = 'text'
                    return
                }

                type.value = 'password'
            }

            return { form, type, color, onView }
        }
    }
</script>
