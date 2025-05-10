// src/components/sections/AboutUsSection.tsx
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Target, Eye, Zap, Users, ShieldCheckIcon } from 'lucide-react';
import { motion } from 'framer-motion'; // Keep for hover effects

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const missionVisionRef = useRef<HTMLDivElement>(null);
  const valuesGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title and paragraph
      gsap.fromTo(
        ['.about-title', '.about-paragraph'],
        { opacity: 0, y: 40, skewX: -5 },
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // Animate image
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.85, filter: "blur(8px)" },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
      
      // Animate Mission & Vision text blocks
      if (missionVisionRef.current) {
         gsap.fromTo(
          missionVisionRef.current.children,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.25,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: missionVisionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }


      // Animate Core Values title
      gsap.fromTo(
        '.core-values-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.core-values-title',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // Animate core value cards
      if (valuesGridRef.current) {
        gsap.fromTo(
          valuesGridRef.current.children,
          { opacity: 0, y: 50, rotateX: -30 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'back.out(1.2)',
            scrollTrigger: {
              trigger: valuesGridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="bg-background/70 backdrop-blur-sm" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="about-title text-4xl md:text-5xl font-bold text-center mb-4">
            The <span className="neon-text-primary">NeonConnect</span> Story
          </h2>
          <p className="about-paragraph text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12 md:mb-16">
            We are a team of passionate iGaming experts and technology innovators dedicated to simplifying complexity and empowering our clients' success.
          </p>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div ref={imageRef}>
              <Image 
                src="https://picsum.photos/seed/teamOffice/800/600" 
                alt="Modern tech office environment" 
                width={800}
                height={600}
                className="rounded-xl shadow-2xl shadow-primary/20 object-cover"
                data-ai-hint="modern office"
              />
            </div>
            <div ref={missionVisionRef} className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2 flex items-center">
                  <Target className="w-6 h-6 neon-text-primary mr-3" /> Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading provider of agile and robust API integration solutions for the global iGaming industry, enabling our clients to innovate faster and achieve market leadership.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2 flex items-center">
                  <Eye className="w-6 h-6 neon-text-accent mr-3" /> Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  A seamlessly connected iGaming ecosystem where technology barriers are eliminated, fostering unparalleled growth and player experiences.
                </p>
              </div>
            </div>
          </div>

          <h3 className="core-values-title text-3xl font-bold text-center mb-8">
            Our Core <span className="neon-text-accent">Values</span>
          </h3>
          <div 
            ref={valuesGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: Zap, title: 'Innovation', text: 'Continuously exploring new technologies to provide cutting-edge solutions.' },
              { icon: Users, title: 'Client-Centricity', text: 'Our clients success is our success. We build partnerships based on trust and mutual growth.' },
              { icon: ShieldCheckIcon, title: 'Integrity & Reliability', text: 'Operating with transparency and delivering dependable solutions that our clients can count on.' }
            ].map((value, index) => (
              <motion.div // Keep Framer Motion for hover effect
                key={index} 
                whileHover={{ 
                  y: -5,
                  boxShadow: "0px 8px 16px hsla(var(--accent), 0.2), 0px 0px 12px hsla(var(--accent), 0.3)" 
                }}
                className="bg-card p-6 rounded-lg shadow-xl hover:shadow-accent/20 transition-shadow duration-300 border border-transparent hover:border-accent/50 h-full"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <value.icon className="w-7 h-7 neon-text-accent" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-foreground text-center mb-2">{value.title}</h4>
                <p className="text-muted-foreground text-sm text-center leading-relaxed">{value.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
