'use client'; // This component uses client-side GSAP and Framer Motion, so it should be a client component.

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import Marquee from '@/components/magicui/marquee';
import { useScopedI18n } from '@/i18n/client'; // Import client-side i18n hook

gsap.registerPlugin(ScrollTrigger);

// Testimonial data would ideally come from a CMS or data source, and be translated there or via i18n keys.
// For this example, we'll keep them static in English, as translating user-generated content is complex.
// Or, provide keys for them if they are standard testimonials.
const testimonials = [
  {
    quote: "iGamX revolutionized our integration timeline. Their APIs are robust and their support is top-notch!",
    author: "Jane Doe",
    title: "CTO, Alpha Gaming",
    avatar: "https://picsum.photos/seed/avatar1/100/100",
    dataAiHint: "professional woman photo"
  },
  {
    quote: "The scalability and reliability of iGamX's solutions have been a game-changer for our platform.",
    author: "John Smith",
    title: "CEO, Beta Sports",
    avatar: "https://picsum.photos/seed/avatar2/100/100",
    dataAiHint: "professional man photo"
  },
  {
    quote: "Integrating their payment API was incredibly smooth. We've seen a significant improvement in transaction success rates.",
    author: "Alice Brown",
    title: "Head of Payments, Gamma Casino",
    avatar: "https://picsum.photos/seed/avatar3/100/100",
    dataAiHint: "business woman photo"
  }
];

const clientLogos = [
  { name: "Client Alpha", src: "https://picsum.photos/seed/logoA/200/100", dataAiHint: "tech company logo" },
  { name: "Client Beta", src: "https://picsum.photos/seed/logoB/200/100", dataAiHint: "gaming company logo" },
  { name: "Client Gamma", src: "https://picsum.photos/seed/logoC/200/100", dataAiHint: "finance company logo" },
  { name: "Client Delta", src: "https://picsum.photos/seed/logoD/200/100", dataAiHint: "startup logo" },
  { name: "Client Epsilon", src: "https://picsum.photos/seed/logoE/200/100", dataAiHint: "software company logo" },
  { name: "Client Zeta", src: "https://picsum.photos/seed/logoF/200/100", dataAiHint: "e-commerce logo" },
  { name: "Client Eta", src: "https://picsum.photos/seed/logoG/200/100", dataAiHint: "consulting firm logo" },
];

export default function ClientsSection() {
  const t = useScopedI18n('clients_section');
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialsGridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const testimonialsTitleRef = useRef<HTMLHeadingElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, paragraphRef.current],
        { opacity: 0, y: 50, filter: "blur(5px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.25,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      if (marqueeContainerRef.current) {
        gsap.fromTo(
          marqueeContainerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: marqueeContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.3,
          }
        );
      }
      
      if (testimonialsTitleRef.current) {
        gsap.fromTo(
          testimonialsTitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonialsTitleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.2
          }
        );
      }

      if (testimonialsGridRef.current) {
        gsap.fromTo(
          testimonialsGridRef.current.children,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonialsGridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.4
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="clients" className="bg-gradient-to-b from-background via-card/15 to-background dark:from-background dark:via-card/5 dark:to-background py-24 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('title_prefix')} <span className="highlight-text-primary">{t('title_highlight')}</span>
          </h2>
          <p ref={paragraphRef} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-20 md:mb-24">
            {t('subheading')}
          </p>
        </div>

        <div ref={marqueeContainerRef} className="mb-20 md:mb-28">
          <Marquee pauseOnHover className="[--duration:90s] [--gap:2rem]">
            {clientLogos.map((logo) => (
              <div key={logo.name} className="relative h-16 w-40 md:h-20 md:w-48 filter grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out flex-shrink-0 mx-4">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  sizes="(max-width: 768px) 160px, 192px"
                  className="object-contain"
                  data-ai-hint={logo.dataAiHint}
                />
              </div>
            ))}
          </Marquee>
        </div>

        <div>
          <h3 ref={testimonialsTitleRef} className="text-3xl md:text-4xl font-bold text-center mb-16">
            {t('testimonials_title_prefix')} <span className="highlight-text-accent">{t('testimonials_title_highlight')}</span>
          </h3>
          <div ref={testimonialsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="h-full"
                whileHover={{
                  y: -8,
                  boxShadow: "0px 15px 30px -10px hsla(var(--accent)/0.2), 0px 8px 15px -10px hsla(var(--accent)/0.15)"
                }}
                 transition={{ type: "spring", stiffness: 280, damping: 18 }}
              >
                <Card className="h-full bg-card p-6 md:p-8 rounded-xl shadow-lg border border-border/30 hover:border-accent/50 transition-all duration-300 flex flex-col transform hover:scale-[1.015]">
                  <CardContent className="flex flex-col flex-grow p-0">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-foreground/90 italic text-base md:text-lg mb-6 flex-grow leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center mt-auto pt-4 border-t border-border/20">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 shadow-inner">
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
                        <p className="font-semibold text-foreground text-md">{testimonial.author}</p>
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
