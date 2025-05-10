"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export default function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (headlineRef.current) {
      const chars = headlineRef.current.querySelectorAll('span');
      tl.fromTo(
        chars,
        { opacity: 0, y: 50, skewX: -15 },
        { opacity: 1, y: 0, skewX: 0, duration: 0.8, stagger: 0.03, delay: 0.2 }
      );
    }

    if (subheadingRef.current) {
      tl.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.4"
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5 },
        "-=0.3"
      );
    }
  }, []);

  // Helper to wrap each character in a span for GSAP animation
  const splitText = (text: string) => {
    return text.split("").map((char, index) => (
      <span key={index} style={{ display: 'inline-block' }}>
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-primary/30 rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.5, 0], scale: 1 }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: 'loop',
              delay: Math.random() * 3,
            }}
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-background z-10" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-6"
        >
          <Zap size={16} />
          <span>Powering iGaming Excellence</span>
        </motion.div>
        <h1
          ref={headlineRef}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight"
          style={{ lineHeight: '1.1' }}
        >
          {splitText("Seamless API").map(span => span)}
          <br />
          {splitText("Integration for").map(span => span)}
          <br />
          <span className="neon-text-primary">{splitText("Unmatched Speed").map(span => span)}</span>
        </h1>
        <p
          ref={subheadingRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          NeonConnect provides cutting-edge, flexible, and rapid iGaming API integration solutions, empowering your platform for success.
        </p>
        <div ref={ctaRef}>
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px hsl(var(--primary))" }}
            whileTap={{ scale: 0.95 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-7 rounded-full shadow-lg shadow-primary/30">
              <Link href="#services">
                Explore Solutions <ArrowRight size={20} className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
