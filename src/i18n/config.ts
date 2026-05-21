import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

void i18n.use(initReactI18next).init({
  lng: 'id',
  fallbackLng: 'id',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    id: {
      translation: {
        appName: 'VMI',
      },
    },
  },
})

export default i18n
