
"use client";

import Link from 'next/link';
import { Gamepad2, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle'; // Import ThemeToggle

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Technology', href: '#technology' },
  { name: 'AI Advisor', href: '#ai-advisor' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // Trigger slightly later
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} passHref legacyBehavior>
      <a
        onClick={() => setMobileMenuOpen(false)}
        className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md relative group"
      >
        {children}
        {/* Subtle underline animation on hover */}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
      </a>
    </Link>
  );

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} // Slightly slower, added delay
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'bg-background/90 backdrop-blur-lg shadow-md border-b border-border/10' // More blur, subtle shadow and border when scrolled
          : 'bg-transparent backdrop-blur-none shadow-none border-b border-transparent' // Transparent when at top
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20"> {/* Slightly taller navbar */}
          <Link href="/" passHref legacyBehavior>
            <a className="flex items-center gap-2 group">
              <Gamepad2 className="h-7 w-7 md:h-8 md:w-8 text-primary group-hover:text-primary/80 transition-colors" />
              <span className="text-xl md:text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">iGamX</span> {/* Updated Company Name */}
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
            <ThemeToggle /> {/* Add ThemeToggle here */}
            <Button asChild variant="outline" size="sm" className="ml-3 border-primary text-primary hover:bg-primary/10 hover:text-primary highlight-border-primary">
              <Link href="#contact" legacyBehavior passHref>
                <a>Get Started</a>
              </Link>
            </Button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden flex items-center">
             <ThemeToggle /> {/* Add ThemeToggle for mobile too */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2 text-primary hover:bg-primary/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6 border-l border-border/50">
                <div className="flex justify-between items-center mb-8">
                   <Link href="/" passHref legacyBehavior>
                    <a className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                      <Gamepad2 className="h-7 w-7 text-primary" />
                      <span className="text-xl font-bold text-primary">iGamX</span> {/* Updated Company Name */}
                    </a>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:bg-primary/10">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                     <Link key={item.name} href={item.href} passHref legacyBehavior>
                      <a
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base font-medium text-foreground/90 hover:text-primary transition-colors py-2"
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))}
                  <Button asChild variant="default" className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                     <Link href="#contact" legacyBehavior passHref>
                       <a onClick={() => setMobileMenuOpen(false)}>Get Started</a>
                     </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
