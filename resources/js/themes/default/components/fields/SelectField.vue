<template>
    <component :namespace="namespace"
               :is="field.field"
               :field="field"
    >
        <div class="flex">
            <select class="form-select w-full"
                    :class="{ 'border-danger': errors[field.attribute] }"
                    :disabled="field.readonly"
                    v-model="value"
                    required
            >
                <option value="null" disabled="disabled">Choose {{ field.name }}</option>
                <option :value="option.id" v-for="(option, index) in field.options">
                    {{ option.name }}
                </option>
            </select>

            <quick-add :namespace="field.quickAdd.namespace"
                       :form-namespace="namespace"
                       :field="field"
                       v-if="field.quickAdd"
            ></quick-add>
        </div>

        <a :href="field.add.uri" class="text-xs leading-normal text-blue-400 mt-2" v-if="field['add']">
            {{ field.add.name }}
        </a>
    </component>
</template>

<script>
    import FieldMixin from '@/util/FieldMixin'
    import QuickAdd from 'Theme/components/form/QuickAdd'

    export default {
        mixins: [ FieldMixin ],

        components: {
            QuickAdd
        }
    }
</script>
