import type { Metadata } from 'next';
import { GeistSans, GeistMono } from 'geist/font';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en" className="dark"> {/* Apply dark theme by default */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
