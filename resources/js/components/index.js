import Vue from 'vue'

Vue.component('InlineSvg', require('./InlineSvg').default)

Vue.component('RouteLink', () => import(/* webpackChunkName: "components" */ './RouteLink'))
