import { languages, resourceKeys } from './constants'

const resources = languages.reduce((acc, langKey) => {
  acc[langKey] = resourceKeys.reduce(
    (acc2, resourceKey) => {
      const resource = require(`./locales/${langKey}/${resourceKey}.json`)
      acc2.translation[resourceKey] = resource
      return acc2
    },
    { translation: {} }
  )
  return acc
}, {})

export default resources
