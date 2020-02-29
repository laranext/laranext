<template>
    <div>
        <IndexTopbar :name="name" v-if="!noTopbar"/>

        <div class="bg-white shadow-md rounded-lg">
            <IndexCardTopbar :name="name" v-if="isCardTopbar"/>

            <CardDataLoading :loading="index.loading">
                <div v-if="index.items.length" key="index-table-data">
                    <IndexTable :name="name"/>

                    <IndexPagination :name="name"/>
                </div>

                <IndexNoData :name="name" v-else key="index-table-data"/>
            </CardDataLoading>
        </div>
    </div>
</template>

<script>
    import { useIndexStore } from 'Store/index'

    export default {
        props: {
            name: String,
            route: String,
            only: Array,
            title: String,
            except: Array,
            noView: Boolean,
            noEdit: Boolean,
            noDelete: Boolean,
            noCreate: Boolean,
            noSearch: Boolean,
            noTopbar: Boolean,
            noSelect: Boolean,
            noActions: Boolean,
            noFilters: Boolean,
            noTableActions: Boolean,
            searchColumn: {
                type: String,
                default: 'name'
            }
        },

        setup(props) {
            const { state: index, isCardTopbar, fetch, setConfig, getActions, getFilters } = useIndexStore(props.name)()

            setConfig(props)

            fetch()

            if (!props.noActions)
                getActions()

            if (!props.noFilters)
                getFilters()

            return { index, isCardTopbar }
        }
    }
</script>
