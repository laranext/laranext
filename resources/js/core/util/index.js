
/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  let cache = Object.create(null)

  return (function cachedFn(str) {
    let hit = cache[str]

    return hit || (cache[str] = fn(str))
  })
}

/**
 * Capitalize a string.
 */
export let capitalize = cached(str => str.charAt(0).toUpperCase() + str.slice(1))

/**
 * Camelize a hyphen-delimited string.
 */
const camelizeRE = /-(\w)/g
export const camelize = cached(str => str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : ''))

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached(str => str.replace(hyphenateRE, '-$1').toLowerCase())

/**
 * Check if string is kebab case.
 */
export const isKebab = cached(str => str.indexOf('-') > 0 ? true : false)
