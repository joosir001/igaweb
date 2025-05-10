// src/components/sections/ClientsSection.tsx
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion'; // Keep for individual logo hover and testimonial hover

gsap.registerPlugin(ScrollTrigger);

const clientLogos = [
  { name: "Client Alpha", src: "https://picsum.photos/seed/logoA/200/100", dataAiHint: "company logo" },
  { name: "Client Beta", src: "https://picsum.photos/seed/logoB/200/100", dataAiHint: "company logo" },
  { name: "Client Gamma", src: "https://picsum.photos/seed/logoC/200/100", dataAiHint: "company logo" },
  { name: "Client Delta", src: "https://picsum.photos/seed/logoD/200/100", dataAiHint: "company logo" },
  { name: "Client Epsilon", src: "https://picsum.photos/seed/logoE/200/100", dataAiHint: "company logo" },
];

const testimonials = [
  {
    quote: "NeonConnect revolutionized our integration timeline. Their APIs are robust and their support is top-notch!",
    author: "Jane Doe",
    title: "CTO, Alpha Gaming",
    avatar: "https://picsum.photos/seed/avatar1/100/100",
    dataAiHint: "person photo"
  },
  {
    quote: "The scalability and reliability of NeonConnect's solutions have been a game-changer for our platform.",
    author: "John Smith",
    title: "CEO, Beta Sports",
    avatar: "https://picsum.photos/seed/avatar2/100/100",
    dataAiHint: "person photo"
  },
  {
    quote: "Integrating their payment API was incredibly smooth. We've seen a significant improvement in transaction success rates.",
    author: "Alice Brown",
    title: "Head of Payments, Gamma Casino",
    avatar: "https://picsum.photos/seed/avatar3/100/100",
    dataAiHint: "person photo"
  }
];

export default function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logosContainerRef = useRef<HTMLDivElement>(null);
  const testimonialsGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title and paragraph
      gsap.fromTo(
        ['.clients-title', '.clients-paragraph'],
        { opacity: 0, y: 30, skewX: -3 },
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // Animate client logos
      if (logosContainerRef.current) {
        gsap.fromTo(
          logosContainerRef.current.children,
          { opacity: 0, y: 20, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: logosContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // Animate testimonials title
       gsap.fromTo(
        '.testimonials-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-title',
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // Animate testimonial cards
      if (testimonialsGridRef.current) {
        gsap.fromTo(
          testimonialsGridRef.current.children,
          { opacity: 0, y: 50, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonialsGridRef.current,
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
    <section id="clients" className="bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="clients-title text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="neon-text-primary">Industry Leaders</span>
          </h2>
          <p className="clients-paragraph text-lg text-muted-foreground max-w-2xl mx-auto mb-12 md:mb-16">
            We partner with innovative iGaming businesses worldwide, helping them achieve their technological and market goals.
          </p>
        </div>

        <div 
          ref={logosContainerRef}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-16 md:mb-24"
        >
          {clientLogos.map((logo, index) => (
            <motion.div // GSAP handles entrance, Framer Motion for hover
              key={index}
              className="relative h-12 w-32 md:h-16 md:w-40 filter grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <Image 
                src={logo.src} 
                alt={logo.name} 
                fill // Use fill instead of layout
                sizes="(max-width: 768px) 128px, 160px" // Provide sizes for responsiveness with fill
                className="object-contain" // Use object-contain with fill
                data-ai-hint={logo.dataAiHint}
              />
            </motion.div>
          ))}
        </div>

        <div>
          <h3 className="testimonials-title text-3xl font-bold text-center mb-12">
            What Our <span className="neon-text-accent">Partners Say</span>
          </h3>
          <div ref={testimonialsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div // GSAP handles entrance, Framer Motion for hover
                key={index} 
                className="h-full"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0px 8px 16px hsla(var(--accent), 0.2), 0px 0px 12px hsla(var(--accent), 0.3)"
                }}
              >
                <Card className="h-full bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-transparent hover:border-accent/50 hover:shadow-accent/20 transition-all duration-300">
                  <CardContent className="flex flex-col h-full p-0">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-foreground italic mb-4 flex-grow">"{testimonial.quote}"</blockquote>
                    <div className="flex items-center mt-auto">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          fill
                          sizes="48px"
                          className="object-cover"
                          data-ai-hint={testimonial.dataAiHint}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
