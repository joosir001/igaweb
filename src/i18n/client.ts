'use client';

import { createI18nClient } from 'next-international/client';
import { locales } from '.';

export const { useI18n, useScopedI18n, I18nProviderClient, useChangeLocale, useCurrentLocale } = createI18nClient({
  [locales[0]]: () => import('@/locales/en'),
  [locales[1]]: () => import('@/locales/zh'),
  [locales[2]]: () => import('@/locales/fr'),
});
