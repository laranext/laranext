<template>
    <div>
        <div class="flex mb-6" v-if="!noTopbar">
            <index-search :name="name" v-if="!noSearch"></index-search>

            <div class="flex ml-auto">
                <a :href="`/${uri}/create`" class="btn btn-white" v-if="!noCreate && can(title.toLowerCase() + ':create')">{{ $tc('words.create') }} {{ title }}</a>
            </div>
        </div><!-- / page topbar -->

        <div class="card">
            <div class="py-3 flex items-center border-b border-gray-300" v-if="cardTopbar">
                <div class="flex items-center px-3 h-9" v-if="items.length">
                    <index-select-all :name="name"></index-select-all>
                </div>

                <div class="flex ml-auto px-3">
                    <index-actions :name="name" v-if="!noActions && selected.length"></index-actions>

                    <index-filters :name="name" v-if="!noFilters"></index-filters>

                    <index-delete-rows :name="name" v-if="selected.length && !noDelete && can(title.toLowerCase() + ':delete')"></index-delete-rows>
                </div>
            </div><!-- / card topbar -->

            <loading :loading="loading">
                <div v-if="items.length" key="index-table-data">
                    <index-table :name="name" :title="title"></index-table>

                    <index-pagination :name="name"></index-pagination>
                </div>

                <index-no-data :title="title" :uri="uri" :no-create="noCreate" v-else key="index-table-data"></index-no-data>
            </loading>
        </div><!-- / card -->
    </div>
</template>

<script>
    import useIndex from '@/use/index'
    import IndexSearch from 'Theme/components/index/IndexSearch'
    import IndexTable from 'Theme/components/index/IndexTable'
    import IndexSelectAll from 'Theme/components/index/IndexSelectAll'
    import IndexPagination from 'Theme/components/index/IndexPagination'
    import IndexDeleteRows from 'Theme/components/index/IndexDeleteRows'
    import IndexFilters from 'Theme/components/index/IndexFilters'
    import IndexActions from 'Theme/components/index/IndexActions'
    import IndexNoData from 'Theme/components/index/IndexNoData'

    export default {
        components: {
            IndexSearch,
            IndexNoData,
            IndexTable,
            IndexSelectAll,
            IndexPagination,
            IndexDeleteRows,
            IndexActions,
            IndexFilters
        },

        props: {
            name: String,
            uri: String,
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
            return { ...useIndex(props) }
        }
    }
</script>
