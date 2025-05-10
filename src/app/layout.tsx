import type { Metadata } from 'next';
import { GeistSans, GeistMono } from 'geist/font'; // Corrected import from geist/font
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = GeistSans; // Corrected usage
const geistMono = GeistMono; // Corrected usage

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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
