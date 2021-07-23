const fs = require('fs')
const path = require('path')
const { resourceKeys  } = require('./constants.js')

/**
 * Function to flatten a nested object. Written specifically for
 * our translation flow, the `namespace` value is used to create the
 * property chains that are used in the i18n replacement scripts.
 * @param {Object} obj
 * @param {string} namespace
 */
const flattenAnObject = (obj, namespace) => {
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
 * Recursively read through the directory, grabbing .js files
 * in each nested subdirectory and concatenating them all in
 * to one string.
 * @param {String} filePath
 */
const readComponentCode = filePath => {
  let code = ''
  const isItFolder = fs.lstatSync(filePath).isDirectory()
  if (isItFolder) {
    const contents = fs.readdirSync(filePath)
    contents.forEach(file => {
      code += readComponentCode(path.join(filePath + '/' + file))
    })
  } else if (
    filePath.endsWith('.js') ||
    filePath.endsWith('.jsx') ||
    filePath.endsWith('.ts') ||
    filePath.endsWith('tsx')
  ) {
    code += fs.readFileSync(filePath)
  }
  return code
}

const clientCodebase = readComponentCode(path.join(process.cwd() + '/src'))

resourceKeys.forEach(resource => {
  const resourceObject = require(`./locales/en/${resource}.json`)
  const keys = Object.keys(flattenAnObject(resourceObject, resource))
  for (const key of keys) {
    if (!clientCodebase.includes(key)) {
      console.warn(`The ${resource} key '${key}' appears to be unused.`)
    }
  }
})
