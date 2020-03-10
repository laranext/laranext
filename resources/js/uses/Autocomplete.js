import debounce from 'debounce'
import { useFormStore } from 'Store/form'
import { ref, computed } from '@vue/composition-api'

export const useAutocomplete = function (name, field, ctx) {
    let { state: form } = useFormStore(name)(),
        currentItem = ref(0),
        isOpen = ref(false),
        items = ref([]),
        processing = ref(false),
        search = ref(''),
        selectedItems = ref([])

    setValue()

    let filteredItems = computed(() => {
        if (!field.uri) {
            return field.options.filter(item => {
                return item.name.toLowerCase().indexOf(search.value.toLowerCase()) > -1
            })
        }

        return items.value
    })

    function setValue() {
        let item = field.options.find(x => x.id === form.data[field.attribute])

        if (item) {
            search.value = item.name
            items.value.push(item)
        }

        selectItems()
    }

    function selectItems() {
        if (Array.isArray(form.data[field.attribute])) {
            console.log('selectItems')
            selectedItems.value = field.options.filter(item => {
                return form.data[field.attribute].includes(item.id)
            })
        }
    }

    let onInput = debounce(function (e) {
        show()

        if (!Array.isArray(field.value)) {
            if (!search.value)
                form.data[field.attribute] = null
        }

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

    function onFocus() {
        console.log('onFocus')
        if (filteredItems.value.length)
            show()
    }

    function move(offset) {
        let newIndex = currentItem.value + offset

        if (newIndex >= 0 && newIndex < filteredItems.value.length) {
            currentItem.value = newIndex
            updateScrollPosition()
        }
    }

    function select(item) {
        if (!item)
            item = filteredItems.value[currentItem.value]

        if (!item && field.acceptNewValue) {
            item = {
                id: search.value,
                name: search.value,
            }
        }

        if (!item) return

        if (Array.isArray(field.value)) {
            if (!form.data[field.attribute].find(x => x == item.id)) {
                form.data[field.attribute].push(item.id)
                search.value = ''
                selectItems()
                if (field.uri)
                    field.options.push(item)
            }
        } else {
            form.data[field.attribute] = item.id
            search.value = item.name
            items.value = [item]
        }

        hide()
    }

    function show() {
        isOpen.value = true
        document.addEventListener('click', handleClickOutside)
    }

    function hide() {
        isOpen.value = false
        currentItem.value = 0
        document.removeEventListener('click', handleClickOutside)
    }

    function handleClickOutside(evt) {
        if (! event.target.closest('.' + field.attribute)) {
            hide()
        }
    }

    function updateScrollPosition() {
        if (ctx.refs.current) {
            ctx.refs.list.scrollTop = (ctx.refs.current[0].offsetTop + ctx.refs.current[0].clientHeight) - ctx.refs.list.clientHeight
        }
    }

    function onRemove({id}) {
        let index = form.data[field.attribute].findIndex(x => x == id)
        form.data[field.attribute].splice(index, 1)
    }

    return {
        currentItem,
        filteredItems,
        form,
        handleClickOutside,
        hide,
        isOpen,
        items,
        move,
        onFocus,
        onInput,
        processing,
        search,
        select,
        selectedItems,
        onRemove,
    }
}
