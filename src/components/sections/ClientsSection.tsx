
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const clientLogos = [
  { name: "Client Alpha", src: "https://picsum.photos/seed/logoA/200/100", dataAiHint: "tech company logo" }, // Updated hints
  { name: "Client Beta", src: "https://picsum.photos/seed/logoB/200/100", dataAiHint: "gaming company logo" },
  { name: "Client Gamma", src: "https://picsum.photos/seed/logoC/200/100", dataAiHint: "finance company logo" },
  { name: "Client Delta", src: "https://picsum.photos/seed/logoD/200/100", dataAiHint: "startup logo" },
  { name: "Client Epsilon", src: "https://picsum.photos/seed/logoE/200/100", dataAiHint: "software company logo" },
];

const testimonials = [
  {
    quote: "iGamX revolutionized our integration timeline. Their APIs are robust and their support is top-notch!", // Updated company name
    author: "Jane Doe",
    title: "CTO, Alpha Gaming",
    avatar: "https://picsum.photos/seed/avatar1/100/100",
    dataAiHint: "professional woman photo" // Updated hints
  },
  {
    quote: "The scalability and reliability of iGamX's solutions have been a game-changer for our platform.", // Updated company name
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

export default function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logosContainerRef = useRef<HTMLDivElement>(null);
  const testimonialsGridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const testimonialsTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title and paragraph
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

      // Animate client logos container (fade in)
      if (logosContainerRef.current) {
         gsap.fromTo(
          logosContainerRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
             scrollTrigger: {
              trigger: logosContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
             delay: 0.3 // Delay after title
          }
         );
         // Stagger individual logos
        gsap.fromTo(
          logosContainerRef.current.children,
          { opacity: 0, scale: 0.8, y: 10 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'back.out(1.5)', // Bounce effect
            scrollTrigger: {
              trigger: logosContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.4 // Delay slightly more
          }
        );
      }

      // Animate testimonials title
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
             delay: 0.2 // Delay after logos start
          }
        );
      }


      // Animate testimonial cards
      if (testimonialsGridRef.current) {
        gsap.fromTo(
          testimonialsGridRef.current.children,
          { opacity: 0, y: 50 }, // Simple fade-up
          {
            opacity: 1,
            y: 0,
            duration: 0.8, // Slightly longer duration
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: testimonialsGridRef.current,
              start: 'top 80%', // Trigger slightly earlier
              toggleActions: 'play none none none',
              once: true,
            },
             delay: 0.4 // Delay after testimonial title
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
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Trusted by <span className="highlight-text-primary">Industry Leaders</span>
          </h2>
          <p ref={paragraphRef} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16 md:mb-20">
            We partner with innovative iGaming businesses worldwide, helping them achieve their technological and market goals.
          </p>
        </div>

        <div
          ref={logosContainerRef}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-20 md:mb-24" // Increased bottom margin
        >
          {clientLogos.map((logo, index) => (
            <motion.div
              key={index}
              className="relative h-12 w-32 md:h-14 md:w-36 filter grayscale hover:grayscale-0 transition-all duration-300 ease-in-out" // Adjusted size
              whileHover={{ scale: 1.08, filter: "grayscale(0%)" }} // Slightly more scale on hover
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                fill
                sizes="(max-width: 768px) 128px, 144px"
                className="object-contain"
                data-ai-hint={logo.dataAiHint}
              />
            </motion.div>
          ))}
        </div>

        <div>
          <h3 ref={testimonialsTitleRef} className="text-2xl md:text-3xl font-bold text-center mb-12">
            What Our <span className="highlight-text-accent">Partners Say</span>
          </h3>
          <div ref={testimonialsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="h-full" // Ensure card takes full height in grid
                whileHover={{
                  y: -6, // Subtle lift
                  boxShadow: "0px 10px 25px -8px hsla(var(--accent), 0.15), 0px 5px 15px -8px hsla(var(--accent), 0.1)" // Refined shadow
                }}
                 transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full bg-card/90 backdrop-blur-sm p-6 rounded-lg shadow-md border border-border/20 hover:border-accent/40 transition-all duration-300 flex flex-col"> {/* Added flex-col */}
                  <CardContent className="flex flex-col flex-grow p-0"> {/* Flex-grow for content */}
                    <div className="flex mb-3"> {/* Adjusted margin */}
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" /> // Slightly smaller stars
                      ))}
                    </div>
                    <blockquote className="text-foreground italic mb-4 flex-grow text-sm md:text-base"> {/* Adjusted text size */}
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center mt-auto pt-4 border-t border-border/10"> {/* Added top border */}
                      <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3"> {/* Adjusted size */}
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          fill
                          sizes="40px"
                          className="object-cover"
                          data-ai-hint={testimonial.dataAiHint}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{testimonial.author}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.title}</p> {/* Adjusted size */}
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
