<template>
    <component :is="field.baseField" :name="name" :field="field">
        <div class="relative" :class="field.attribute">
            <input
                type="search"
                autocomplete="autocomplete_off_hack_xfr4!k"
                class="form-select w-full"
                placeholder="Choose Customer"
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

            <div class="bg-white w-full overflow-auto max-h-40 border border-gray-300 rounded mt-1" v-if="isOpen" ref="list">
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
    import { useFormStore } from 'Store/form'
    import { ref, computed } from '@vue/composition-api'
    import debounce from 'debounce'

    export default {
        props: {
            name: String,
            field: Object
        },

        setup({name, field}, ctx) {
            const { state: form } = useFormStore(name)()

            const items = ref([]),
                  isOpen = ref(false),
                  search = ref(''),
                  status = ref(''),
                  currentItem = ref(0),
                  processing = ref(false)

            const filteredItems = computed(() => {
                if (!field.uri) {
                    return field.options.filter(item => {
                        return item.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1
                    })
                }

                return items.value
            })

            const onInput = debounce(function (e) {
                show()

                console.log('onInput')
                if (!search.value)
                    form.data[field.attribute] = null

                if (field.uri) {
                    processing.value = true

                    axios.get(field.uri, {
                        params: {
                            search: search.value
                        }
                    })
                        .then(data => {
                            items.value = data
                            processing.value = false
                        })
                }
            }, 250)

            function onFocus () {
                console.log('onFocus')
                if (filteredItems.value.length)
                    show()
            }

            function move (offset) {
                let newIndex = currentItem.value + offset

                if (newIndex >= 0 && newIndex < filteredItems.value.length) {
                    currentItem.value = newIndex
                    updateScrollPosition()
                }
            }

            function select (item) {
                if (!item)
                    item = filteredItems.value[currentItem.value]

                console.log(item)
                if (!item) return

                form.data[field.attribute] = item.id
                search.value = item.name
                items.value = [item]

                hide()
            }

            function show() {
                isOpen.value = true
                document.addEventListener('click', handleClickOutside)
            }

            function hide () {
                isOpen.value = false
                currentItem.value = 0
                document.removeEventListener('click', handleClickOutside)
            }

            function handleClickOutside(evt) {
                if (! event.target.closest('.' + field.attribute)) {
                    console.log('handleClickOutside')
                    hide()
                }
            }

            function updateScrollPosition() {
                if (ctx.refs.current) {
                    ctx.refs.list.scrollTop = (ctx.refs.current[0].offsetTop + ctx.refs.current[0].clientHeight) - ctx.refs.list.clientHeight
                }
            }

            function setValue() {
                const item = field.options.find(x => x.id === form.data[field.attribute])

                if (item) {
                    search.value = item.name
                    items.value.push(item)
                }
            }

            setValue()

            return {
                form,
                onInput,
                onFocus,
                items,
                search,
                move,
                select,
                hide,
                currentItem,
                handleClickOutside,
                isOpen,
                processing,
                filteredItems,
            }
        }
    }
</script>

<style scoped>
    div.active {
        background-color: #e2e8f0;
    }
</style>
