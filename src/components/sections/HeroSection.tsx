
"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

interface AnimatedElementStyle {
  width: number;
  height: number;
  left: string;
  top: string;
  duration: number;
  delay: number;
  opacity: number;
}

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [animatedElements, setAnimatedElements] = useState<AnimatedElementStyle[]>([]);

  useEffect(() => {
    const elements: AnimatedElementStyle[] = [...Array(10)].map(() => ({ // Reduced for performance
      width: Math.random() * 60 + 30, // Range: 30-90
      height: Math.random() * 60 + 30, // Range: 30-90
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: Math.random() * 5 + 6, // Duration between 6-11 seconds
      delay: Math.random() * 5,
      opacity: Math.random() * 0.08 + 0.04, // Lower opacity range (0.04 to 0.12)
    }));
    setAnimatedElements(elements);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }});

    if (headlineRef.current) {
      const lines = Array.from(headlineRef.current.children) as HTMLElement[];
      if (lines.length > 0) {
        tl.fromTo(
          lines,
          { opacity: 0, y: 70, skewX: -8 }, // Increased y, more skew
          { opacity: 1, y: 0, skewX: 0, duration: 1.3, stagger: 0.18, delay: 0.3 } // Longer duration, adjusted stagger
        );
      }
    }

    if (subheadingRef.current) {
      tl.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.0 }, // Slower duration
        "-=1.0" // Overlap more
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.8 },
        "-=0.7" // Overlap more
      );
    }
  }, []);


  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 bg-gradient-to-br from-background via-background to-secondary/5 dark:from-background dark:via-background dark:to-primary/5"> {/* Subtle gradient */}
      <div className="absolute inset-0 z-0 opacity-80 dark:opacity-100"> {/* Adjusted opacity */}
        {animatedElements.length > 0 && animatedElements.map((style, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/5 dark:bg-primary/10 rounded-full blur-2xl" // More blur, adjusted color intensity
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: [0, style.opacity, 0], scale: [0.5, 1, 0.5] }} // Pulsating scale
            transition={{
              duration: style.duration,
              repeat: Infinity,
              repeatType: 'loop',
              ease: "linear",
              delay: style.delay,
            }}
            style={{
              width: style.width,
              height: style.height,
              left: style.left,
              top: style.top,
            }}
          />
        ))}
      </div>
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 z-10 opacity-[0.02] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground)) 1px, hsl(var(--background)) 1px)',
          backgroundSize: '30px 30px', // Smaller grid
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-background"/>


      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          className="inline-flex items-center gap-2.5 bg-primary/10 text-primary px-5 py-2 rounded-full text-xs sm:text-sm font-semibold mb-8 shadow-lg border border-primary/20" // Enhanced badge
        >
          <Zap size={16} /> {/* Slightly larger icon */}
          <span>Premium iGaming Integrations</span>
        </motion.div>
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-7 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70" // Gradient text
        >
          <span className="block">Seamless API Integration</span>
          <span className="block">for <span className="highlight-text-primary">Peak Performance</span></span>
        </h1>
        <p
          ref={subheadingRef}
          className="text-md md:text-lg lg:text-xl text-muted-foreground max-w-lg md:max-w-2xl mx-auto mb-12"
        >
          iGamX delivers robust, scalable, and lightning-fast API solutions, empowering your iGaming platform's success.
        </p>
        <div ref={ctaRef}>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 12px 30px -8px hsla(var(--primary), 0.35)" }} // Enhanced hover effect
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 18 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/85 text-primary-foreground text-base md:text-lg px-8 py-3.5 md:px-10 md:py-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <Link href="#services">
                <span className="inline-flex items-center">
                  Explore Solutions <ArrowRight size={20} className="ml-2.5" /> {/* Adjusted icon size and margin */}
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
