
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { AuroraBackground } from '@/components/magicui/aurora-background';
import { useScopedI18n, useCurrentLocale } from '@/i18n/client';

export default function HeroSection() {
  const t = useScopedI18n('hero');
  const currentLocale = useCurrentLocale();
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null); 


  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }});
    
    if (sectionRef.current) {
      tl.fromTo(
        sectionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
      );
    }
    
    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -30, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)'},
        "+=0.2" 
      );
    }

    if (headlineRef.current) {
      const lines = Array.from(headlineRef.current.children) as HTMLElement[];
      if (lines.length > 0) {
        tl.fromTo(
          lines,
          { opacity: 0, y: 80, skewX: -8, filter: 'blur(4px)' }, 
          { opacity: 1, y: 0, skewX: 0, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'expo.out' },
          "-=0.5" 
        );
      }
    }

    if (subheadingRef.current) {
      tl.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        "-=0.9" 
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.65)' },
        "-=0.7" 
      );
    }
  }, []);


  return (
    <AuroraBackground interactive={false}>
      <motion.section 
        id="hero" 
        ref={sectionRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16"
      >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <div ref={badgeRef}>
          <motion.div
            className="inline-flex items-center gap-2.5 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold mb-8 shadow-lg border border-primary/20 ring-1 ring-primary/30"
          >
            <Zap size={18} className="animate-pulse" /> 
            <span>{t('badge')}</span>
          </motion.div>
        </div>
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-7 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-br from-primary via-accent to-secondary"
        >
          <span className="block">{t('headline1')}</span>
          <span className="block">{t('headline2_prefix')} <span className="highlight-text-primary">{t('headline2_highlight')}</span></span>
        </h1>
        <p
          ref={subheadingRef}
          className="text-md md:text-lg lg:text-xl text-muted-foreground max-w-lg md:max-w-2xl mx-auto mb-12"
        >
          {t('subheading')}
        </p>
        <div ref={ctaRef}>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 15px 35px -10px hsla(var(--primary), 0.4)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 15 }}
          >
            <Button asChild size="xl" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-lg px-10 py-4 md:px-12 md:py-5 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 group">
              <Link href={`/${currentLocale}#services`} legacyBehavior>
                <a>
                  <span className="inline-flex items-center">
                    {t('cta')} <ArrowRight size={22} className="ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </a>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      </motion.section>
    </AuroraBackground>
  );
}
