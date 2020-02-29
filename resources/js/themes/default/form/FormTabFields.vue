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

        <FormFields :name="name" :section="currentTab"/>
    </div>
</template>

<script>
    import { useFormStore } from 'Store/form'
    import { ref, watch } from '@vue/composition-api'

    export default {
        props: {
            name: String
        },

        setup({name}) {
            let { state: form } = useFormStore(name)(),
                currentTab = ref(''),
                tabs = ref([])

            function getTabs() {
                for (let key in form.fields) {
                    let tab = form.fields[key]

                    if (tab.condition && form.fields[tab.condition.field] == tab.condition.value)
                        tabs.value.push(key)
                    else if (!tab.condition)
                        tabs.value.push(key)
                }

                currentTab.value = tabs.value[0]
            }

            function switchTab(tab) {
                currentTab.value = tab
            }

            getTabs()

            return {
                tabs,
                currentTab,
                switchTab
            }
        }
    }
</script>
