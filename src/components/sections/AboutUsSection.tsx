'use client'; // This component uses client-side GSAP and Framer Motion, so it should be a client component.

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Target, Eye, Zap, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedList, AnimatedListItem } from '@/components/magicui/animated-list';
import { useScopedI18n } from '@/i18n/client'; // Import client-side i18n hook

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsSection() {
  const t = useScopedI18n('about_us_section');

  const coreValues = [
    { id: 'value-innovation', icon: Zap, title: t('value_innovation_title'), text: t('value_innovation_text') },
    { id: 'value-client-centricity', icon: Users, title: t('value_client_centricity_title'), text: t('value_client_centricity_text') },
    { id: 'value-integrity', icon: ShieldCheck, title: t('value_integrity_title'), text: t('value_integrity_text') }
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const missionVisionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const valuesTitleRef = useRef<HTMLHeadingElement>(null);
  const animatedListContainerRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [titleRef.current, paragraphRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          {
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 1.2,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.2
          }
        );
        gsap.fromTo(
          imageRef.current.querySelector('img'),
          { scale: 1.05 },
          {
            scale: 1,
            duration: 1.5,
            ease: 'power2.out',
             scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
             delay: 0.2
          }
        );
      }

      if (missionVisionRef.current) {
         gsap.fromTo(
          missionVisionRef.current.children,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.25,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: missionVisionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
             delay: 0.4
          }
        );
      }

      if (valuesTitleRef.current) {
        gsap.fromTo(
          valuesTitleRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: valuesTitleRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
      
      if (animatedListContainerRef.current) {
        gsap.fromTo(
          animatedListContainerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: animatedListContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.3, 
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="bg-gradient-to-br from-background via-card/30 to-background py-24 md:py-32 dark:from-background dark:via-card/10 dark:to-background" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {t('title_prefix')} <span className="highlight-text-primary">{t('title_highlight')}</span> {t('title_suffix')}
          </h2>
          <p ref={paragraphRef} className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16 md:mb-20">
            {t('subheading')}
          </p>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 md:mb-24">
            <div ref={imageRef} className="rounded-xl overflow-hidden shadow-2xl border border-border/20 hover:shadow-primary/10 transition-all duration-300">
              <Image
                src="https://picsum.photos/seed/teamOffice/800/600"
                alt="Modern tech office environment"
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                data-ai-hint="modern office team"
              />
            </div>
            <div ref={missionVisionRef} className="space-y-8">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 flex items-center gap-3">
                  <Target className="w-7 h-7 text-primary flex-shrink-0" /> {t('mission_title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {t('mission_text')}
                </p>
              </div>
              <div>
                 <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 flex items-center gap-3">
                  <Eye className="w-7 h-7 text-accent flex-shrink-0" /> {t('vision_title')}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  {t('vision_text')}
                </p>
              </div>
            </div>
          </div>

          <h3 ref={valuesTitleRef} className="text-2xl md:text-3xl font-bold text-center mb-12">
            {t('core_values_title_prefix')} <span className="highlight-text-accent">{t('core_values_title_highlight')}</span>
          </h3>
          <div ref={animatedListContainerRef}>
            <AnimatedList
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              animationType="fadeIn"
              delay={0.1}
            >
              {coreValues.map((value) => (
                <AnimatedListItem
                  key={value.id}
                  className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-border/30 hover:border-accent/50 h-full flex flex-col items-center text-center transform hover:-translate-y-1.5"
                >
                  <div className="flex justify-center mb-5">
                    <div className="p-3.5 bg-accent/10 rounded-full transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110">
                      <value.icon className="w-7 h-7 text-accent" />
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-foreground mb-2.5">{value.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-grow">{value.text}</p>
                </AnimatedListItem>
              ))}
            </AnimatedList>
          </div>
        </div>
      </div>
    </section>
  );
}
