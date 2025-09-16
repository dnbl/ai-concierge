import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Mock i18n for tests
i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          // Simple mock translations for tests
          'app.title': 'Aura AI Assistant',
          'welcome.title': 'Welcome to Aura AI',
          'ui.send': 'Send message',
          'ui.attachment': 'Add attachment',
          'errors.general': 'Something went wrong',
        }
      }
    },
    react: {
      useSuspense: false
    }
  });