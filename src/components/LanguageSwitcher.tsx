'use client';

import { useChangeLocale, useCurrentLocale, useI18n } from '@/i18n/client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { locales } from '@/i18n';

export default function LanguageSwitcher() {
  const changeLocale = useChangeLocale();
  const currentLocale = useCurrentLocale();
  const t = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={t('language_switcher.change_language')} className="text-primary/80 hover:text-primary hover:bg-primary/10 transition-colors">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => changeLocale(locale)}
            disabled={currentLocale === locale}
            className="cursor-pointer"
          >
            {t(`language_switcher.${locale}` as any)} {/* Use 'any' if keys are dynamic and not strictly typed */}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
