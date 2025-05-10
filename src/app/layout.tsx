import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import ThemeInitializer from '@/components/ThemeInitializer'; // Import the initializer

export const metadata: Metadata = {
  title: 'NeonConnect - iGaming API Solutions',
  description: 'Your trusted partner for cutting-edge, flexible, and rapid iGaming API integration solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Remove hardcoded "dark" class. ThemeInitializer will handle this.
    <html lang="en" suppressHydrationWarning> 
      <head>
        <ThemeInitializer />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
