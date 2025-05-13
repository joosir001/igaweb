import { createI18nServer } from 'next-international/server';
import { locales, defaultLocale } from '.';

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } = createI18nServer({
  [locales[0]]: () => import('../../locales/en.json'),
  [locales[1]]: () => import('../../locales/zh.json'),
  [locales[2]]: () => import('../../locales/fr.json'),
});