'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/client'; // Import i18n hook

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);
  const t = useI18n();

  useEffect(() => {
    const getCurrentTheme = () => {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    };

    setTheme(getCurrentTheme());

    const observer = new MutationObserver(() => {
        setTheme(getCurrentTheme());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();

  }, []);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme); 
    try {
      localStorage.setItem('igamx-theme', newTheme); 
    } catch (e) {
      console.warn('Failed to set theme in localStorage');
    }
    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(newTheme);
  };

   if (theme === null) {
     return <div className="w-10 h-10 opacity-0" aria-hidden="true" />;
   }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={theme === 'light' ? t('theme_toggle.switch_to_dark') : t('theme_toggle.switch_to_light')}
      className="text-primary/80 hover:text-primary hover:bg-primary/10 transition-colors"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
