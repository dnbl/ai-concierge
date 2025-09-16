import React, { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { ui } = useAppStore();

  useEffect(() => {
    // Apply theme to document root
    document.documentElement.setAttribute('data-theme', ui.theme);
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', ui.theme === 'dark' ? '#111827' : '#ffffff');
    }
  }, [ui.theme]);

  return <>{children}</>;
};

export default ThemeProvider;