import debounce from 'debounce'
import { createStore } from 'pinia'

export const useIndexStore = function (name) {
    return createStore({
        id: 'index-' + name,

        state: () => ({
            config: {},
            loading: false,
            items: [],
            selected: [],
            meta: {},
            defaultOrderBy: 'id',
            actions: [],
            filters: [],
            appliedFilters: [],
            params: {
                page: 1,
                search: null,
                searchColumn: 'name',
                searchNumericColumn: 'id',
                orderBy: 'id',
                orderByDirection: 'desc'
            }
        }),

        getters: {
            isCardTopbar: ({config}) => !config.noSelect || !config.noFilters || !config.noActions,
            isSelectAll: state => state.items.length == state.selected.length,
        },

        actions: {
            setConfig(config) {
                this.state.config = config
                this.state.config.uri = App.key + '/' + config.route
                this.state.config.baseUri = this.baseUri(config.route)
            },

            baseUri(segment) {
                let prefix = App.adminPrefix,
                    key = App.key,
                    uri = '/',
                    route = segment.split('?')[0]

                if (prefix && key)
                    uri += prefix + '/' + key + '/' + route
                else if (prefix)
                    uri += prefix + '/' + route
                else
                    uri += key + '/' + route

                return uri
            },

            onSearch: debounce(function () {
                this.fetch()
            }, 250),

            selectAll() {
                let items = []

                if (!this.isSelectAll.value) {
                    for (const key in this.state.items) {
                        items.push(this.state.items[key].id)
                    }
                }

                this.state.selected = items
            },

            sort({attribute, sortable}) {
                if (!sortable) return

                let orderBy = this.state.params.orderBy,
                    direction = this.state.params.orderByDirection

                if (orderBy == attribute && direction == 'asc') {
                    this.state.params.orderByDirection = 'desc'
                }
                else if (orderBy == attribute && direction == 'desc') {
                    this.state.params.orderBy = this.state.defaultOrderBy
                    this.state.params.orderByDirection = 'desc'
                }
                else {
                    this.state.params.orderBy = attribute
                    this.state.params.orderByDirection = 'asc'
                }

                this.fetch()
            },

            deleteItems(items) {
                console.log('Delete Items: ')
                console.log(items)

                return new Promise((resolve, reject) => {
                    axios.delete(`${this.state.config.uri}/null`, {
                        data: {
                            items
                        }
                    })
                        .then(response => {
                            console.log('response')
                            console.log(response)
                            this.fetch()
                            resolve(response)
                        })
                        .catch(error => {
                            reject(error)
                        })
                })
            },

            fetch() {
                this.state.loading = true

                axios.get(this.state.config.uri, {
                    params: this.state.params
                })
                    .then(({meta, data}) => {
                        this.state.loading = false
                        this.state.meta = meta
                        this.state.items = data
                    })
            },

            setAppliedFilter({attribute, component, value}) {
                let param = this.state.params[attribute].toString()

                if (param != value.toString() || component == 'date-filter') {
                    if (this.state.appliedFilters.indexOf(attribute) === -1) this.state.appliedFilters.push(attribute)
                }
                else {
                    const index = this.state.appliedFilters.indexOf(attribute)
                    this.state.appliedFilters.splice(index, 1)
                }
            },

            resetFilters() {
                for (let i = 0; i < this.state.filters.length; i++) {
                    let filter = this.state.filters[i]

                    this.state.params[filter.attribute] = filter.value
                }

                this.state.appliedFilters = []

                this.fetch()
            },

            getActions() {
                axios.get(this.state.config.uri + '/actions')
                    .then(data => this.state.actions = data)
            },

            getFilters() {
                axios.get(this.state.config.uri + '/filters')
                    .then(data => this.state.filters = data)
            },

            paginate(direction, page) {
                if (!this.state.meta[direction]) return

                this.state.params.page = this.state.params.page + page

                this.fetch()
            },
        }
    })
}
