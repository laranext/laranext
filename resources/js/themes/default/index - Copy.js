import Vue from 'vue'

let components = [
    'VDiv',
    'VIndex',
    'VForm',
    'VDetail',
    'VModal',
    'LoadingSvg',
    'CardDataLoading',
    'FlashMessage',
    'Dropdown',
    'Avatar',
    'DataRow',
]

for (let i = 0; i < components.length; i++) {
    const component = components[i]

    Vue.component(component, () => import(`./${component}`))
    // Vue.component(component, require(`./${component}`).default)
}

// Vue.component('IndexCardTopbar', require('./index/IndexCardTopbar').default)
// Vue.component('IndexNoData', require('./index/IndexNoData').default)
// Vue.component('IndexSearch', require('./index/IndexSearch').default)
// Vue.component('IndexTopbar', require('./index/IndexTopbar').default)
// Vue.component('IndexPagination', require('./index/IndexPagination').default)
// Vue.component('IndexTable', require('./index/IndexTable').default)
// Vue.component('IndexSelectAll', require('./index/IndexSelectAll').default)
// Vue.component('IndexTableSortIcons', require('./index/IndexTableSortIcons').default)
// Vue.component('IndexDeleteRow', require('./index/IndexDeleteRow').default)
// Vue.component('IndexDeleteRows', require('./index/IndexDeleteRows').default)
// Vue.component('IndexTextField', require('./index/IndexTextField').default)
// Vue.component('IndexLinkField', require('./index/IndexLinkField').default)
// Vue.component('IndexActions', require('./index/IndexActions').default)
// Vue.component('IndexFilters', require('./index/IndexFilters').default)

// Vue.component('FormFields', require('./form/FormFields').default)
// Vue.component('FormTabFields', require('./form/FormTabFields').default)
// Vue.component('FormSubmit', require('./form/FormSubmit').default)

// Vue.component('DetailDelete', require('./detail/DetailDelete').default)

// Vue.component('BaseField', require('./fields/BaseField').default)
// Vue.component('DefaultField', require('./fields/DefaultField').default)
// Vue.component('InlineField', require('./fields/InlineField').default)
// Vue.component('TextField', require('./fields/TextField').default)
// Vue.component('PasswordField', require('./fields/PasswordField').default)
// Vue.component('SelectField', require('./fields/SelectField').default)
// Vue.component('CheckboxField', require('./fields/CheckboxField').default)
// Vue.component('RadioField', require('./fields/RadioField').default)
// Vue.component('BooleanField', require('./fields/BooleanField').default)
// Vue.component('TextareaField', require('./fields/TextareaField').default)
// Vue.component('DateField', require('./fields/DateField').default)
// Vue.component('PostField', require('./fields/PostField').default)

// Vue.component('BaseModal', require('./modal/BaseModal').default)
// Vue.component('ConfirmModal', require('./modal/ConfirmModal').default)
// Vue.component('FormModal', require('./modal/FormModal').default)

// Vue.component('SelectFilter', require('./filters/SelectFilter').default)

Vue.component('IndexCardTopbar', () => import(/* webpackChunkName: "index" */ './index/IndexCardTopbar'))
Vue.component('IndexNoData', () => import(/* webpackChunkName: "index" */ './index/IndexNoData'))
Vue.component('IndexSearch', () => import(/* webpackChunkName: "index" */ './index/IndexSearch'))
Vue.component('IndexTopbar', () => import(/* webpackChunkName: "index" */ './index/IndexTopbar'))
Vue.component('IndexPagination', () => import(/* webpackChunkName: "index" */ './index/IndexPagination'))
Vue.component('IndexTable', () => import(/* webpackChunkName: "index" */ './index/IndexTable'))
Vue.component('IndexSelectAll', () => import(/* webpackChunkName: "index" */ './index/IndexSelectAll'))
Vue.component('IndexTableSortIcons', () => import(/* webpackChunkName: "index" */ './index/IndexTableSortIcons'))
Vue.component('IndexDeleteRow', () => import(/* webpackChunkName: "index" */ './index/IndexDeleteRow'))
Vue.component('IndexDeleteRows', () => import(/* webpackChunkName: "index" */ './index/IndexDeleteRows'))
Vue.component('IndexTextField', () => import(/* webpackChunkName: "index" */ './index/IndexTextField'))
Vue.component('IndexLinkField', () => import(/* webpackChunkName: "index" */ './index/IndexLinkField'))
Vue.component('IndexActions', () => import(/* webpackChunkName: "index" */ './index/IndexActions'))
Vue.component('IndexFilters', () => import(/* webpackChunkName: "index" */ './index/IndexFilters'))

Vue.component('FormFields', () => import(/* webpackChunkName: "form" */ './form/FormFields'))
Vue.component('FormTabFields', () => import(/* webpackChunkName: "form" */ './form/FormTabFields'))
Vue.component('FormSubmit', () => import(/* webpackChunkName: "form" */ './form/FormSubmit'))

Vue.component('DetailDelete', () => import(/* webpackChunkName: "detail" */ './detail/DetailDelete'))

Vue.component('BaseField', () => import(/* webpackChunkName: "field" */ './fields/BaseField'))
Vue.component('DefaultField', () => import(/* webpackChunkName: "field" */ './fields/DefaultField'))
Vue.component('InlineField', () => import(/* webpackChunkName: "field" */ './fields/InlineField'))
Vue.component('TextField', () => import(/* webpackChunkName: "field" */ './fields/TextField'))
Vue.component('PasswordField', () => import(/* webpackChunkName: "field" */ './fields/PasswordField'))
Vue.component('SelectField', () => import(/* webpackChunkName: "field" */ './fields/SelectField'))
Vue.component('CheckboxField', () => import(/* webpackChunkName: "field" */ './fields/CheckboxField'))
Vue.component('RadioField', () => import(/* webpackChunkName: "field" */ './fields/RadioField'))
Vue.component('BooleanField', () => import(/* webpackChunkName: "field" */ './fields/BooleanField'))
Vue.component('TextareaField', () => import(/* webpackChunkName: "field" */ './fields/TextareaField'))
Vue.component('DateField', () => import(/* webpackChunkName: "field" */ './fields/DateField'))
Vue.component('PostField', () => import(/* webpackChunkName: "field" */ './fields/PostField'))

Vue.component('BaseModal', () => import(/* webpackChunkName: "modal" */ './modal/BaseModal'))
Vue.component('ConfirmModal', () => import(/* webpackChunkName: "modal" */ './modal/ConfirmModal'))
Vue.component('FormModal', () => import(/* webpackChunkName: "modal" */ './modal/FormModal'))

Vue.component('SelectFilter', () => import(/* webpackChunkName: "filter" */ './filters/SelectFilter'))
