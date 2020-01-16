import Vue from 'vue'

let components = [
    'Loading',
    'LoadingSvg',
    'ActionButton',
    'Dropdown'
]

for (let i = 0; i < components.length; i++) {
    const component = components[i]

    Vue.component(component, require('./' + component).default)
}
