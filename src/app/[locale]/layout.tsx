import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import '../globals.css'; // Adjusted path
import { Toaster } from "@/components/ui/toaster";
import ThemeInitializer from '@/components/ThemeInitializer';
import { I18nProviderClient } from '@/i18n/client';
import type { Locale } from '@/i18n';

export const metadata: Metadata = {
  title: 'iGamX - Premium iGaming API Solutions', 
  description: 'iGamX: Your partner for advanced, reliable, and fast iGaming API integration.', 
};

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <ThemeInitializer />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased bg-background text-foreground`}>
        <I18nProviderClient locale={locale}>
          {children}
          <Toaster />
        </I18nProviderClient>
      </body>
    </html>
  );
}
