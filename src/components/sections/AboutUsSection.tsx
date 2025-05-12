
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Target, Eye, Zap, Users, ShieldCheck } from 'lucide-react'; // Corrected import
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const missionVisionRef = useRef<HTMLDivElement>(null);
  const valuesGridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const valuesTitleRef = useRef<HTMLHeadingElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title and paragraph
      gsap.fromTo(
        [titleRef.current, paragraphRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9, // Longer duration
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%', // Trigger earlier
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // Animate image with reveal effect
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, clipPath: "inset(0 100% 0 0)" }, // Start clipped from right
          {
            opacity: 1,
            clipPath: "inset(0 0% 0 0)", // Reveal to full width
            duration: 1.2, // Longer duration for reveal
            ease: 'power4.out', // Smoother ease
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.2 // Delay after title
          }
        );
         // Add subtle scale and shadow on image reveal
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

      // Animate Mission & Vision text blocks
      if (missionVisionRef.current) {
         gsap.fromTo(
          missionVisionRef.current.children,
          { opacity: 0, x: 30 }, // Start from right
          {
            opacity: 1,
            x: 0,
            duration: 0.8, // Adjusted duration
            stagger: 0.25,
            ease: 'power3.out', // Smoother ease
            scrollTrigger: {
              trigger: missionVisionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
             delay: 0.4 // Delay after title/image
          }
        );
      }

      // Animate Core Values title
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
              start: 'top 85%', // Trigger later
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }


      // Animate core value cards
      if (valuesGridRef.current) {
        gsap.fromTo(
          valuesGridRef.current.children,
          { opacity: 0, y: 50 }, // Simple fade-up
          {
            opacity: 1,
            y: 0,
            duration: 0.7, // Adjusted duration
            stagger: 0.18, // Adjusted stagger
            ease: 'power3.out',
            scrollTrigger: {
              trigger: valuesGridRef.current,
              start: 'top 80%', // Trigger earlier
              toggleActions: 'play none none none',
              once: true,
            },
             delay: 0.2 // Delay after values title
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="bg-background/90 backdrop-blur-sm" ref={sectionRef}> {/* Adjusted background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            The <span className="highlight-text-primary">iGamX</span> Story {/* Updated Company Name */}
          </h2>
          <p ref={paragraphRef} className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-16 md:mb-20">
            We are a team of passionate iGaming experts and technology innovators dedicated to simplifying complexity and empowering our clients' success.
          </p>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20 md:mb-24"> {/* Increased spacing */}
            {/* Image container for reveal animation */}
            <div ref={imageRef} className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://picsum.photos/seed/teamOffice/800/600"
                alt="Modern tech office environment"
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 ease-out" // Ensure image scales correctly
                data-ai-hint="modern office team" // Updated hint
              />
            </div>
            <div ref={missionVisionRef} className="space-y-8"> {/* Increased spacing */}
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 flex items-center gap-3"> {/* Increased size and gap */}
                  <Target className="w-6 h-6 text-primary flex-shrink-0" /> Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base"> {/* Adjusted text size */}
                  To be the leading provider of agile and robust API integration solutions for the global iGaming industry, enabling our clients to innovate faster and achieve market leadership.
                </p>
              </div>
              <div>
                 <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-accent flex-shrink-0" /> Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  A seamlessly connected iGaming ecosystem where technology barriers are eliminated, fostering unparalleled growth and player experiences.
                </p>
              </div>
            </div>
          </div>

          <h3 ref={valuesTitleRef} className="text-2xl md:text-3xl font-bold text-center mb-12"> {/* Adjusted size */}
            Our Core <span className="highlight-text-accent">Values</span>
          </h3>
          <div
            ref={valuesGridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: Zap, title: 'Innovation', text: 'Continuously exploring new technologies to provide cutting-edge solutions.' },
              { icon: Users, title: 'Client-Centricity', text: 'Our clients success is our success. We build partnerships based on trust and mutual growth.' },
              { icon: ShieldCheck, title: 'Integrity & Reliability', text: 'Operating with transparency and delivering dependable solutions that our clients can count on.' } // Corrected icon name
            ].map((value, index) => (
              <motion.div // Keep Framer Motion for hover effect
                key={index}
                whileHover={{
                  y: -5,
                  boxShadow: "0px 10px 20px -5px hsla(var(--accent), 0.15), 0px 4px 10px -5px hsla(var(--accent), 0.1)" // Refined shadow
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-border/20 hover:border-accent/40 h-full flex flex-col" // Ensure flex column for alignment
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <value.icon className="w-6 h-6 text-accent" /> {/* Adjusted icon size */}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-foreground text-center mb-2">{value.title}</h4> {/* Adjusted size */}
                <p className="text-muted-foreground text-sm text-center leading-relaxed flex-grow">{value.text}</p> {/* Flex grow to push content */}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
