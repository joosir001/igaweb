import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import ThemeInitializer from '@/components/ThemeInitializer';

export const metadata: Metadata = {
  title: 'iGamX - Premium iGaming API Solutions', // Updated Company Name
  description: 'iGamX: Your partner for advanced, reliable, and fast iGaming API integration.', // Updated Company Name & refined description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeInitializer />
      </head>
      {/* Use Geist variables for better font management */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
