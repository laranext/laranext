import Vue from 'vue'

let components = {
    'Avatar': 'Avatar',
    'InlineSvg': 'InlineSvg',
}

for (const name in components) {
    const path = components[name]

    Vue.component(name, require('./' + path).default)
}
