<template>
    <component :is="field.baseField" :name="name" :field="field">
        <div :class="field.attribute">
            <div class="form-input w-full">
                <div class="flex flex-wrap">
                    <span v-for="item in selectedItems" class="flex items-center bg-green-200 text-green-800 rounded-full px-2 py-1 mb-2 mr-2 text-sm">
                        {{ item.name }}
                        <span @click="onRemove(item)" class="pl-1 cursor-pointer">x</span>
                    </span>
                </div>

                <input
                    type="search"
                    autocomplete="autocomplete_off_hack_xfr4!k"
                    class="focus:outline-none w-full"
                    :placeholder="field.placeholder ? field.placeholder : 'Choose ' + field.name"
                    v-model="search"
                    @keydown.up.prevent="move(-1)"
                    @keydown.down.prevent="move(1)"
                    @keydown.enter.prevent="select()"
                    @keydown.tab="hide"
                    @keydown.esc="hide"
                    @input="onInput"
                    @focus="onFocus"
                    ref="search-filter-input"
                >
            </div>

            <div class="bg-white w-full overflow-auto max-h-40 border border-gray-300 rounded mt-1 relative" v-if="isOpen" ref="list">
                <div class="py-3" v-if="processing" key="autocomplete-list">
                    <LoadingSvg width="40px"/>
                </div>

                <div v-else key="autocomplete-list">
                    <div class="py-2 pl-3 text-sm" v-if="!filteredItems.length">
                        No results found!
                    </div>

                    <div v-else>
                        <div class="px-3 py-1 hover:bg-gray-300"
                             v-for="(item, index) in filteredItems"
                             :class="{ active: index === currentItem }"
                             :ref="index === currentItem ? 'current' : null"
                             @click="select(item)"
                        >
                            {{ item.name }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </component>
</template>

<script>
    import { useAutocomplete } from 'Use/Autocomplete'

    export default {
        props: {
            name: String,
            field: Object
        },

        setup({name, field}, ctx) {
            return {
                ...useAutocomplete(name, field, ctx)
            }
        }
    }
</script>

<style scoped>
    div.active {
        background-color: #e2e8f0;
    }
</style>
