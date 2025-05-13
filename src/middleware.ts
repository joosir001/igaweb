import type { NextRequest } from 'next/server';
import { createI18nMiddleware } from 'next-international/middleware';
import { locales, defaultLocale } from '@/i18n';

const I18nMiddleware = createI18nMiddleware({
  locales: locales,
  defaultLocale: defaultLocale,
  urlMappingStrategy: 'rewrite', // or 'redirect'
});

export function middleware(request: NextRequest) {
  return I18nMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
