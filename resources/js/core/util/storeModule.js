// Use Cases
// 1. storeModule('name', module, 'namespace')
// 2 storeModule('name', 'namespace')

import store from '@/store'
import { capitalize, camelize, isObject } from '@/util'

export default function (name, module = '', namespace = '') {
  if (isObject(module)) {
    store.registerModule(name + capitalize(namespace), module)

    return
  }

  // module will be namespace while getting
  const key = name + capitalize(module)

  return {
    state: store.state[key],
    dispatch: (action, payload) => store.dispatch(`${key}/${action}`, payload)
  }
}
