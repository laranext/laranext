import Vue from 'vue'

const pages = [
    'VModal',
    'VIndex',
    'VForm',
    'VDetail',
    'FlashMessage',
    'DataRow',
    'RefreshButton'
]

const allPages = {}

for (let i = 0; i < pages.length; i++) {
    const page = pages[i]

    allPages[page] = require('./' + page).default
}

export default allPages
