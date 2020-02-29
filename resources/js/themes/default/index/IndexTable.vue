<template>
    <div class="overflow-hidden overflow-x-auto relative" :class="{'rounded-lg': !isCardTopbar}">
        <table cellpadding="0" cellspacing="0" class="table w-full">
            <thead>
                <tr>
                    <th class="w-4" v-if="index.config.noSelect" key="table-th-select">&nbsp;</th>
                    <th class="w-16" v-else key="table-th-select">&nbsp;</th>

                    <th v-for="column in index.items[0].fields" @click="sort(column)">
                        <div :class="{ 'text-center': column.align == 'center' }">
                            <span class="inline-flex items-center" :class="{ 'cursor-pointer': column.sortable }">
                                {{ column.name }}
                                <IndexTableSortIcons :name="name" :attribute="column.attribute" v-if="column.sortable"/>
                            </span>
                        </div>
                    </th>

                    <th style="width: 1%;" v-if="!index.config.noTableActions">&nbsp;</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="item in index.items">
                    <td class="w-4" v-if="index.config.noSelect" key="table-td-select">
                        &nbsp;
                    </td>
                    <td class="w-16" v-else key="table-td-select">
                        <input type="checkbox" class="form-checkbox h-5 w-5" :value="item.id" v-model="index.selected">
                    </td>

                    <td v-for="column in item.fields">
                        <component :is="`index-${column.component}`" :data="column"></component>
                    </td>

                    <td class="text-right pr-6" v-if="!index.config.noTableActions">
                        <div class="flex items-center">
                            <span v-if="!index.config.noView && can(index.config.title.toLowerCase() + ':show')">
                                <a :href="`${index.config.baseUri}/${item.id}`"
                                   class="block cursor-pointer text-gray-500 hover:text-primary mr-3"
                                   title="View"
                                >
                                    <InlineSvg name="view" style="margin-top: 1px;"/>
                                </a>
                            </span>

                            <span v-if="!index.config.noEdit && can(index.config.title.toLowerCase() + ':update')">
                                <a :href="`${index.config.baseUri}/${item.id}/edit`"
                                   class="block cursor-pointer text-gray-500 hover:text-primary mr-3"
                                   title="Edit"
                                >
                                    <InlineSvg name="edit"/>
                                </a>
                            </span>

                            <IndexDeleteRow :name="name"
                                            :item="item.id"
                                            v-if="!index.config.noDelete && can(index.config.title.toLowerCase() + ':delete')"
                            />
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import { useIndexStore } from 'Store/index'

    export default {
        props: {
            name: String
        },

        setup({name}) {
            const { state: index, isCardTopbar, sort } = useIndexStore(name)()

            return { index, isCardTopbar, sort }
        }
    }
</script>
