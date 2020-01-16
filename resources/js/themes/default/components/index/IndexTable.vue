<template>
    <div class="overflow-hidden overflow-x-auto relative" :class="{'rounded-lg': config.noSelect}">
        <table cellpadding="0" cellspacing="0" class="table w-full">
            <thead>
                <tr>
                    <th class="w-4" v-if="config.noSelect" key="table-th-select">&nbsp;</th>
                    <th class="w-16" v-else key="table-th-select">&nbsp;</th>

                    <th v-for="column in items[0].fields" @click="sort(column)">
                        <div :class="{ 'text-center': column.align == 'center' }">
                            <span class="inline-flex items-center" :class="{ 'cursor-pointer': column.sortable }">
                                {{ column.name }}
                                <table-sort-icons :name="name" :attribute="column.attribute" v-if="column.sortable"></table-sort-icons>
                            </span>
                        </div>
                    </th>

                    <th style="width: 1%;" v-if="!config.noTableActions">&nbsp;</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in items">
                    <td class="w-4" v-if="config.noSelect" key="table-td-select">
                        &nbsp;
                    </td>
                    <td class="w-16" v-else key="table-td-select">
                        <input type="checkbox" class="form-checkbox h-5 w-5" :value="item.id" v-model="selected">
                    </td>

                    <td v-for="column in item.fields">
                        <component :is="column.component" :data="column"></component>
                    </td>

                    <td class="text-right pr-6" v-if="!config.noTableActions">
                        <div class="flex items-center">
                            <span v-if="!config.noView && can(title.toLowerCase() + ':show')">
                                <a :href="`/${config.uri.split('?')[0]}/${item.id}`" class="block cursor-pointer text-gray-500 hover:text-primary mr-3" title="View">
                                    <inline-svg name="view" style="margin-top: 1px;"></inline-svg>
                                </a>
                            </span>

                            <span v-if="!config.noEdit && can(title.toLowerCase() + ':edit')">
                                <a :href="`/${config.uri}/${item.id}/edit`" class="block cursor-pointer text-gray-500 hover:text-primary mr-3" title="Edit">
                                    <inline-svg name="edit"></inline-svg>
                                </a>
                            </span>

                            <index-delete-row :name="name" :item="item.id" v-if="!config.noDelete && can(title.toLowerCase() + ':delete')"></index-delete-row>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import useTable from '@/use/table'
    import TableSortIcons from './TableSortIcons'
    import IndexDeleteRow from './IndexDeleteRow'
    import TextField from './TextField'
    import LinkField from './LinkField'

    export default {
        components: {
            TableSortIcons,
            TextField,
            LinkField,
            IndexDeleteRow
        },

        props: {
            name: String,
            title: String
        },

        setup(props) {
            return { ...useTable(props) }
        }
    }
</script>
