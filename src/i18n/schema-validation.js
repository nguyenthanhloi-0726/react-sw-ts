const { languages, resourceKeys  } = require('./constants.js')

/**
 * Flattens a nested object structure into a single
 * object with property chains as keys.
 * @param {Object} obj Object to flatten
 * @param {String} namespace Used for property chaining
 */
const flattenAnObject = (obj, namespace = '') => {
  const flattened = {}
  Object.keys(obj).forEach(key => {
    if (Array.isArray(obj[key])) {
      flattened[namespace ? `${namespace}.${key}` : key] = obj[key]
    } else if (typeof obj[key] === 'object') {
      Object.assign(
        flattened,
        flattenAnObject(obj[key], namespace ? `${namespace}.${key}` : key)
      )
    } else {
      flattened[namespace ? `${namespace}.${key}` : key] = obj[key]
    }
  })
  return flattened
}

/**
 * Checks if a translation object is missing keys
 * that are present in the schema.
 * @param {String[]} file Array of translation object's keys
 * @param {String[]} schema Array of matching schema's keys
 * @param {String} path string path to file
 */
const findMissingKeys = (file, schema, path) => {
  const missingKeys = []
  for (const key of schema) {
    if (!file.includes(key)) {
      missingKeys.push(key)
    }
  }
  if (missingKeys.length) {
    console.warn(
      `${path} is missing these required keys: ${missingKeys.join(', ')}`
    )
  }
}

/**
 * Checks if a translation object has extra
 * keys which are NOT present in the schema.
 * @param {String[]} file Array of translation object's keys
 * @param {String[]} schema Array of matching schema's keys
 * @param {String} path string path to file
 */
const findExtraneousKeys = (file, schema, path) => {
  const extraKeys = []
  for (const key of file) {
    if (!schema.includes(key)) {
      extraKeys.push(key)
    }
  }
  if (extraKeys.length) {
    console.warn(
      // prettier-ignore
      `${path} has these keys that are not in the schema: ${extraKeys.join(', ')}`
    )
  }
}

/**
 * Validates that all values in the object are non-empty. Includes
 * validation of nested objects.
 * @param {Object} obj The object to check the values of
 * @param {String} namespace String for tracking nested properties
 */
const noEmptyObjectValues = (obj, namespace = '') => {
  const emptyKeys = []
  for (const key of Object.keys(obj)) {
    if (Array.isArray(obj[key])) {
      if (!obj[key].length) {
        emptyKeys.push(namespace ? `${namespace}.${key}` : key)
      }
    } else if (typeof obj[key] === 'object') {
      emptyKeys.push(
        noEmptyObjectValues(obj[key], namespace ? `${namespace}.${key}` : key)
      )
    } else if (!obj[key]) {
      emptyKeys.push(namespace ? `${namespace}.${key}` : key)
    }
  }
  return emptyKeys.flat()
}

/**
 * Function that checks the language file
 * for each available client language.
 * @param {String[]} languages List of languages to test
 */
const schemaValidation = (languages, resource) => {
  languages.forEach(language => {
    const schema = require(`./locales/en/${resource}.json`)
    const keys = Object.keys(flattenAnObject(schema))
    const fileJson = require(`./locales/${language}/${resource}.json`)
    const fileKeys = Object.keys(flattenAnObject(fileJson))
    findMissingKeys(fileKeys, keys, `${language}/${resource}.json`)
    findExtraneousKeys(fileKeys, keys, `${language}/${resource}.json`)
    const emptyKeys = noEmptyObjectValues(fileJson)
    if (emptyKeys.length) {
      console.warn(
        `${language}/${resource}.json has these empty keys: ${emptyKeys.join(', ')}`
      )
    }
    console.info(`${language} ${resource}.json validation complete.`)
  })
}

const translatedLangs = languages.filter(x => x !== 'en')

resourceKeys.forEach(resource => {
  schemaValidation(translatedLangs, resource)
})
