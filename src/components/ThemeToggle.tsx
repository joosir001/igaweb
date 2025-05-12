// src/components/ThemeToggle.tsx
"use client";

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // Function to determine theme from class list
    const getCurrentTheme = () => {
      return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    };

    // Set initial theme after component mounts
    setTheme(getCurrentTheme());

    // Optional: Listen for changes triggered elsewhere (e.g., system preference change)
    // This might be overkill if ThemeInitializer is the only source of truth initially.
    const observer = new MutationObserver(() => {
        setTheme(getCurrentTheme());
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();

  }, []);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme); // Optimistically update state
    try {
      localStorage.setItem('igamx-theme', newTheme); // Updated storage key
    } catch (e) {
      console.warn('Failed to set theme in localStorage');
    }
    // Apply class changes
    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(newTheme);
  };

  // Render placeholder initially to avoid hydration issues if theme state isn't ready
   if (theme === null) {
     // Render a placeholder with the same size as the button
     // Use opacity-0 to prevent flash of placeholder content
     return <div className="w-10 h-10 opacity-0" aria-hidden="true" />;
   }


  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="text-primary/80 hover:text-primary hover:bg-primary/10 transition-colors" // Adjusted colors
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
}
