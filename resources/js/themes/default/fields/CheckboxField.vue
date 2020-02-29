<template>
    <component :is="field.baseField" :name="name" :field="field" :classes="field.class">
        <div v-if="Array.isArray(field.options)" class="pt-2">
            <label class="block items-center"
                   v-for="(item, index) in field.options"
                   :class="{
                      'inline-flex': !field.vertical,
                      'mr-6': !field.vertical,
                      'mt-4': (index > 0 && field.vertical)
                   }"
            >
                <input class="form-checkbox h-5 w-5"
                       type="checkbox"
                       v-model="form.data[field.attribute]"
                       :value="item.id"
                       :disabled="field.readonly"
                       :class="[field.classes]"
                >
                <span class="ml-2">{{ item.name }}</span>
            </label>
        </div>

        <div v-else>
            <div class="flex flex-wrap pt-4" v-for="option in field.options">
                <label class="block items-center w-1/5"
                       v-for="(item, index) in option"
                       :class="{
                          'inline-flex': !field.vertical,
                          // 'mr-6': !field.vertical,
                          'mt-4': (index > 0 && field.vertical)
                       }"
                >
                    <input class="form-checkbox h-5 w-5"
                           type="checkbox"
                           v-model="form.data[field.attribute]"
                           :value="item.id"
                           :disabled="field.readonly"
                           :class="[field.classes]"
                    >
                    <span class="ml-2">{{ item.name }}</span>
                </label>
            </div>
        </div>
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
