import i18n from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import resources from './resources'

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    lng: 'en',
    resources,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: true
    }
  })

export default i18n

export { useTranslation }
