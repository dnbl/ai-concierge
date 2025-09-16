// Simple mock for tests - just exports an empty object with required methods
const mockI18n = {
  use: () => mockI18n,
  init: () => Promise.resolve(),
  t: (key: string) => key,
  language: 'en',
  languages: ['en'],
  changeLanguage: () => Promise.resolve()
};

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: mockI18n
  }),
  initReactI18next: {
    type: '3rdParty',
    init: () => {}
  }
}));

// Mock i18next
jest.mock('i18next', () => mockI18n);