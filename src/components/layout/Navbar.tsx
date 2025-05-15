
'use client';

import Link from 'next/link';
import { Gamepad2, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { motion } from 'framer-motion';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useCurrentLocale, useScopedI18n } from '@/i18n/client';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useScopedI18n('navbar');
  const currentLocale = useCurrentLocale();

  const navItems = [
    { name: t('services'), href: '#services' },
    { name: t('technology'), href: '#technology' },
    { name: t('why_choose_us'), href: '#why-choose-us'},
    { name: t('benefits'), href: '#benefits'},
    { name: t('ai_advisor'), href: '#ai-advisor' },
    { name: t('about'), href: '#about' },
    { name: t('clients'), href: '#clients' },
    { name: t('contact'), href: '#contact' },
  ];
  
  const navbarRef = useRef<HTMLElement>(null);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={`/${currentLocale}${href.startsWith('#') ? href : `/${href}`}`}
      onClick={() => setMobileMenuOpen(false)}
      className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-3 py-2 rounded-md relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-center"></span>
    </Link>
  );

  return (
    <motion.nav
      ref={navbarRef}
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "circOut", delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? 'bg-background/95 backdrop-blur-xl shadow-lg border-b border-border/20'
          : 'bg-transparent backdrop-blur-none shadow-none border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href={`/${currentLocale}`} className="flex items-center gap-2.5 group">
            <Gamepad2 className="h-7 w-7 md:h-8 md:w-8 text-primary group-hover:text-primary/80 transition-all duration-300 group-hover:rotate-[-12deg]" />
            <span className="text-xl md:text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors">{t('igamx')}</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.name} href={item.href}>
                {item.name}
              </NavLink>
            ))}
            <ThemeToggle />
            <LanguageSwitcher /> 
            <Button asChild variant="outline" size="sm" className="ml-3 border-primary text-primary hover:bg-primary/10 hover:text-primary highlight-border-primary shadow-sm hover:shadow-md">
              <Link href={`/${currentLocale}#contact`}>
                <span>{t('get_started')}</span>
              </Link>
            </Button>
          </div>

          <div className="md:hidden flex items-center">
             <ThemeToggle />
             <LanguageSwitcher />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2 text-primary hover:bg-primary/10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background p-6 border-l border-border/50">
                <div className="flex justify-between items-center mb-8">
                   <Link href={`/${currentLocale}`} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                      <Gamepad2 className="h-7 w-7 text-primary" />
                      <span className="text-xl font-bold text-primary">{t('igamx')}</span>
                  </Link>
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="text-primary hover:bg-primary/10">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close menu</span>
                  </Button>
                </div>
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                     <Link key={item.name} href={`/${currentLocale}${item.href.startsWith('#') ? item.href : `/${item.href}`}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base font-medium text-foreground/90 hover:text-primary transition-colors py-2"
                      >
                        {item.name}
                    </Link>
                  ))}
                  <Button asChild variant="default" className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground">
                     <Link href={`/${currentLocale}#contact`} onClick={() => setMobileMenuOpen(false)}>
                       <span>{t('get_started')}</span>
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
