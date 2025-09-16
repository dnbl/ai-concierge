import React from 'react';
import { useTranslation } from 'react-i18next';
import AccessibleButton from './AccessibleButton';

interface LanguageToggleProps {
  className?: string;
  variant?: 'dropdown' | 'buttons';
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  variant = 'dropdown'
}) => {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'es', name: t('language.spanish'), flag: '🇪🇸' },
    { code: 'fr', name: t('language.french'), flag: '🇫🇷' },
    { code: 'de', name: t('language.german'), flag: '🇩🇪' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  if (variant === 'buttons') {
    return (
      <div className={`flex gap-2 ${className}`}>
        {languages.map((lang) => (
          <AccessibleButton
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            variant={lang.code === i18n.language ? 'primary' : 'ghost'}
            size="sm"
            ariaLabel={`${t('language.select')}: ${lang.name}`}
            className="min-w-0"
          >
            <span className="text-lg" role="img" aria-label={lang.name}>
              {lang.flag}
            </span>
          </AccessibleButton>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <select
        value={i18n.language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="
          appearance-none bg-surface border border-themed rounded-md px-3 py-2 pr-8
          text-primary text-sm focus:outline-none focus:ring-2 focus:ring-blue-500
          cursor-pointer transition-colors
        "
        aria-label={t('language.select')}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
      
      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className="h-4 w-4 text-secondary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default LanguageToggle;