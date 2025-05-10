// src/components/ThemeInitializer.tsx
import type { FC } from 'react';

const ThemeInitializer: FC = () => {
  // This script runs imperatively before React hydration to set the theme
  // and avoid a flash of incorrect theme.
  const script = `
    (function() {
      function getInitialTheme() {
        try {
          const persistedColorPreference = window.localStorage.getItem('neonconnect-theme');
          if (typeof persistedColorPreference === 'string') {
            return persistedColorPreference;
          }
          const mql = window.matchMedia('(prefers-color-scheme: dark)');
          if (typeof mql.matches === 'boolean') {
            return mql.matches ? 'dark' : 'light';
          }
        } catch (e) {
          // Fallback if localStorage or matchMedia is not available (e.g., SSR pre-render)
          // console.warn('Could not determine initial theme from client preferences.');
        }
        return 'dark'; // Default to dark if no preference found or in case of error
      }
      const theme = getInitialTheme();
      if (theme === 'light') {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
};

export default ThemeInitializer;
