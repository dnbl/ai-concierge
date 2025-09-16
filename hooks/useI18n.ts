import { useCallback, useMemo } from 'react';
import { useAppStore } from '../store/useAppStore';

// Translation strings type
interface TranslationStrings {
  [key: string]: string | TranslationStrings;
}

// Default English translations
const defaultTranslations: TranslationStrings = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    retry: 'Retry'
  },
  navigation: {
    home: 'Home',
    fleet: 'Fleet',
    services: 'Services',
    settings: 'Settings',
    help: 'Help',
    logout: 'Logout'
  },
  greeting: {
    morning: 'Good morning',
    afternoon: 'Good afternoon',
    evening: 'Good evening',
    welcome: 'Welcome',
    welcomeBack: 'Welcome back',
    newUser: 'Welcome to IE Vehicle Concierge'
  },
  fleet: {
    title: 'Your Fleet',
    noVehicles: 'No vehicles found',
    addVehicle: 'Add Vehicle',
    viewDetails: 'View Details',
    bookService: 'Book Service',
    testDrive: 'Test Drive',
    vehicleInfo: 'Vehicle Information',
    maintenance: 'Maintenance',
    status: 'Status'
  },
  services: {
    title: 'Services',
    book: 'Book Service',
    history: 'Service History',
    upcoming: 'Upcoming Services',
    completed: 'Completed Services',
    maintenance: 'Maintenance',
    repair: 'Repair',
    inspection: 'Inspection'
  },
  chat: {
    placeholder: 'Message Aura AI...',
    send: 'Send',
    voiceInput: 'Voice Input',
    attachment: 'Attach File',
    newChat: 'New Chat',
    typing: 'Typing...',
    thinking: 'Thinking...'
  },
  errors: {
    general: 'Something went wrong. Please try again.',
    network: 'Network error. Please check your connection.',
    notFound: 'The requested resource was not found.',
    unauthorized: 'You are not authorized to perform this action.',
    validation: 'Please check your input and try again.',
    timeout: 'Request timed out. Please try again.'
  },
  accessibility: {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    skipToContent: 'Skip to main content',
    toggleTheme: 'Toggle theme',
    toggleSidebar: 'Toggle sidebar',
    loading: 'Content is loading',
    sortBy: 'Sort by',
    filterBy: 'Filter by'
  }
};

// Language support interface
interface Language {
  code: string;
  name: string;
  nativeName: string;
  rtl?: boolean;
}

// Supported languages
const supportedLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', rtl: true }
];

// Load translations dynamically (placeholder for future implementation)
const loadTranslations = async (languageCode: string): Promise<TranslationStrings> => {
  // In a real implementation, this would fetch translations from an API or load them from files
  // For now, return default English translations
  console.log(`Loading translations for language: ${languageCode}`);
  return defaultTranslations;
};

// Utility function to get nested translation
const getNestedTranslation = (
  translations: TranslationStrings,
  key: string,
  fallback?: string
): string => {
  const keys = key.split('.');
  let current: string | TranslationStrings = translations;
  
  for (const k of keys) {
    if (typeof current === 'object' && current !== null && k in current) {
      current = current[k];
    } else {
      return fallback || key;
    }
  }
  
  return typeof current === 'string' ? current : fallback || key;
};

// Pluralization function (simple English rules)
const pluralize = (count: number, singular: string, plural?: string): string => {
  if (count === 1) return singular;
  return plural || `${singular}s`;
};

// Format with parameters
const formatString = (template: string, params: Record<string, string | number>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return params[key]?.toString() || match;
  });
};

export interface UseI18nReturn {
  // Translation function
  t: (key: string, params?: Record<string, string | number>) => string;
  
  // Pluralization function
  plural: (count: number, singularKey: string, pluralKey?: string) => string;
  
  // Language management
  currentLanguage: Language;
  setLanguage: (languageCode: string) => void;
  supportedLanguages: Language[];
  
  // Formatting utilities
  formatNumber: (value: number) => string;
  formatCurrency: (value: number, currency?: string) => string;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  formatTime: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  
  // Direction support
  isRTL: boolean;
  dir: 'ltr' | 'rtl';
}

export const useI18n = (): UseI18nReturn => {
  // For now, use English as default - in a real app this would come from user preferences or browser settings
  const currentLanguageCode = 'en';
  const currentLanguage = supportedLanguages.find(lang => lang.code === currentLanguageCode) || supportedLanguages[0];
  
  // In a real implementation, translations would be loaded from store or context
  const translations = defaultTranslations;
  
  const t = useCallback((key: string, params?: Record<string, string | number>): string => {
    const translation = getNestedTranslation(translations, key, key);
    
    if (params) {
      return formatString(translation, params);
    }
    
    return translation;
  }, [translations]);
  
  const plural = useCallback((count: number, singularKey: string, pluralKey?: string): string => {
    const singularTranslation = t(singularKey);
    const pluralTranslation = pluralKey ? t(pluralKey) : undefined;
    
    return pluralize(count, singularTranslation, pluralTranslation);
  }, [t]);
  
  const setLanguage = useCallback((languageCode: string) => {
    console.log(`Setting language to: ${languageCode}`);
    // In a real implementation, this would update global state or localStorage
    // and trigger re-loading of translations
  }, []);
  
  const formatNumber = useCallback((value: number): string => {
    return new Intl.NumberFormat(currentLanguage.code).format(value);
  }, [currentLanguage.code]);
  
  const formatCurrency = useCallback((value: number, currency = 'USD'): string => {
    return new Intl.NumberFormat(currentLanguage.code, {
      style: 'currency',
      currency
    }).format(value);
  }, [currentLanguage.code]);
  
  const formatDate = useCallback((date: Date, options?: Intl.DateTimeFormatOptions): string => {
    return new Intl.DateTimeFormat(currentLanguage.code, options).format(date);
  }, [currentLanguage.code]);
  
  const formatTime = useCallback((date: Date, options?: Intl.DateTimeFormatOptions): string => {
    return new Intl.DateTimeFormat(currentLanguage.code, {
      timeStyle: 'short',
      ...options
    }).format(date);
  }, [currentLanguage.code]);
  
  const isRTL = useMemo(() => currentLanguage.rtl || false, [currentLanguage.rtl]);
  const dir = useMemo(() => isRTL ? 'rtl' : 'ltr', [isRTL]);
  
  return {
    t,
    plural,
    currentLanguage,
    setLanguage,
    supportedLanguages,
    formatNumber,
    formatCurrency,
    formatDate,
    formatTime,
    isRTL,
    dir
  };
};

// Helper hook for quick access to common translations
export const useCommonTranslations = () => {
  const { t } = useI18n();
  
  return useMemo(() => ({
    loading: t('common.loading'),
    error: t('common.error'),
    success: t('common.success'),
    save: t('common.save'),
    cancel: t('common.cancel'),
    delete: t('common.delete'),
    edit: t('common.edit'),
    view: t('common.view'),
    close: t('common.close'),
    retry: t('common.retry')
  }), [t]);
};

export default useI18n;