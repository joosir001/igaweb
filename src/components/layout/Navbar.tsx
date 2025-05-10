
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
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    // Set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} passHref legacyBehavior>
      <a
        onClick={() => setMobileMenuOpen(false)}
        className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md neon-text-primary-hover"
      >
        {children}
      </a>
    </Link>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${scrolled ? 'bg-background/90 shadow-xl' : 'bg-background/80 shadow-lg'}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" passHref legacyBehavior>
            <a className="flex items-center gap-2">
              <Gamepad2 className="h-8 w-8 neon-text-primary" />
              <span className="text-xl font-bold neon-text-primary">NeonConnect</span>
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
            <Button asChild variant="outline" className="ml-2 neon-border-primary hover:bg-primary/10">
              <Link href="#contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden flex items-center">
             <ThemeToggle /> {/* Add ThemeToggle for mobile too */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Menu className="h-6 w-6 text-primary" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6">
                <div className="flex justify-between items-center mb-8">
                   <Link href="/" passHref legacyBehavior>
                    <a className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                      <Gamepad2 className="h-8 w-8 neon-text-primary" />
                      <span className="text-xl font-bold neon-text-primary">NeonConnect</span>
                    </a>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-6 w-6 text-primary" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <NavLink key={item.name} href={item.href}>
                      {item.name}
                    </NavLink>
                  ))}
                  <Button asChild variant="default" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                     <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <style jsx>{`
        .neon-text-primary-hover:hover {
          color: hsl(var(--primary));
          text-shadow:
            0 0 3px hsl(var(--primary) / 0.7),
            0 0 6px hsl(var(--primary) / 0.5);
        }
        .dark .neon-text-primary-hover:hover {
           text-shadow:
            0 0 3px hsl(var(--primary)),
            0 0 6px hsl(var(--primary) / 0.8);
        }
      `}</style>
    </motion.nav>
  );
}
