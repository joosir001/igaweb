export const locales = ['en', 'zh', 'fr'] as const;
export const defaultLocale = 'en';
export type Locale = (typeof locales)[number];
