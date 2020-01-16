<template>
    <div>
        <div class="flex">
            <div class="py-5 px-8 border-b-2 focus:outline-none cursor-pointer text-gray-600 font-bold"
                 v-for="tab in tabs"
                 :class="{ 'border-primary': currentTab == tab }"
                 @click="switchTab(tab)"
            >
                {{ tab }}
            </div>
            <div class="flex-1 border-b-2">&nbsp;</div>
        </div>

        <component v-for="field in data[currentTab] ? data[currentTab].fields : []"
                   :key="field.attribute"
                   :is="field.component"
                   :field="field"
                   :namespace="namespace"
        ></component>
    </div>
</template>

<script>
    import DynamicModulesMixin from '@/util/dynamicModulesMixin'
    import TextField from 'Theme/components/fields/TextField'
    import QuickAdd from 'Theme/components/form/QuickAdd'
    import ConditionalField from 'Theme/components/fields/ConditionalField'
    import MultiSelectField from 'Theme/components/fields/MultiSelectField'
    import PasswordField from 'Theme/components/fields/PasswordField'
    import RadioField from 'Theme/components/fields/RadioField'
    import CheckboxField from 'Theme/components/fields/CheckboxField'
    import SelectField from 'Theme/components/fields/SelectField'
    import SelectFilterField from 'Theme/components/fields/SelectFilterField'
    import TextareaField from 'Theme/components/fields/TextareaField'
    import ImageField from 'Theme/components/fields/ImageField'
    import BooleanField from 'Theme/components/fields/BooleanField'
    import DateField from 'Theme/components/fields/DateField'

    export default {
        mixins: [ DynamicModulesMixin ],

        data() {
            return {
                tabs: [],
                currentTab: ''
            }
        },

        components: {
            QuickAdd,
            ConditionalField,
            MultiSelectField,
            PasswordField,
            RadioField,
            CheckboxField,
            SelectField,
            SelectFilterField,
            TextareaField,
            TextField,
            ImageField,
            BooleanField,
            DateField
        },

        props: {
            namespace: String
        },

        states: {
            Form: ['data']
        },

        created() {
            this.getTabs()
        },

        methods: {
            getTabs() {
                for (let key in this.data) {
                    let tab = this.data[key]

                    if (tab.condition && this.data[tab.condition.field] == tab.condition.value)
                        this.tabs.push(key)
                    else if (!tab.condition)
                        this.tabs.push(key)
                }

                this.currentTab = this.tabs[0]
            },

            switchTab(tab) {
                this.currentTab = tab
            }
        }
    }
</script>
