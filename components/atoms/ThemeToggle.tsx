import React from 'react';
import { useTheme } from '../providers/ThemeProvider';
import AccessibleButton from './AccessibleButton';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
  variant?: 'button' | 'icon';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  showLabel = false,
  variant = 'icon'
}) => {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  const SunIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );

  const MoonIcon = () => (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );

  if (variant === 'button') {
    return (
      <AccessibleButton
        onClick={toggleTheme}
        variant="ghost"
        className={`flex items-center gap-2 ${className}`}
        ariaLabel={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      >
        {isDark ? <SunIcon /> : <MoonIcon />}
        {showLabel && (
          <span className="text-sm">
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </span>
        )}
      </AccessibleButton>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isDark 
          ? 'bg-gray-700 focus:ring-offset-gray-900' 
          : 'bg-gray-200 focus:ring-offset-white'
        }
        ${className}
      `}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      role="switch"
      aria-checked={isDark}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          flex items-center justify-center
          ${isDark ? 'translate-x-6' : 'translate-x-1'}
        `}
      >
        <span className="text-gray-600 text-xs">
          {isDark ? '🌙' : '☀️'}
        </span>
      </span>
    </button>
  );
};

export default ThemeToggle;