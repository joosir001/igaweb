
"use client";
import Link from 'next/link';
import { Linkedin, Twitter, Github, Gamepad2 } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);


  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    if (!footerRef.current) return;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%', // Start animation when 90% of footer is visible
            toggleActions: 'play none none none',
            once: true,
        }
    });

    // Animate elements sequentially or with slight overlaps
    if (logoRef.current) {
      tl.fromTo(logoRef.current, 
        { opacity: 0, y: 30, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
      );
    }

    if (navLinksRef.current?.children) {
      tl.fromTo(navLinksRef.current.children, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out' }, 
        "-=0.5" // Overlap with previous animation
      );
    }
    
    if (socialIconsRef.current?.children) {
       tl.fromTo(socialIconsRef.current.children, 
        { opacity: 0, scale: 0.7, y:15 }, 
        { opacity: 1, scale: 1, y:0, duration: 0.4, stagger: 0.1, ease: 'back.out(1.4)' }, // Playful back ease
        "-=0.4"
      );
    }

    if (copyrightRef.current && taglineRef.current) {
      tl.fromTo([copyrightRef.current, taglineRef.current], 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' }, 
        "-=0.3"
      );
    }

  }, []);

  return (
    <footer className="bg-background/80 border-t border-border/30 py-16 mt-20" ref={footerRef}> {/* Increased padding and margin */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div ref={logoRef} className="flex justify-center items-center mb-8 group"> {/* Increased margin */}
          <Gamepad2 className="h-9 w-9 text-primary group-hover:text-primary/80 transition-colors duration-300 group-hover:rotate-[15deg]" /> {/* Larger icon, hover rotate */}
          <span className="ml-3 text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors duration-300">iGamX</span>
        </div>
        <div ref={navLinksRef} className="flex justify-center space-x-6 mb-8"> {/* Increased margin */}
          <Link href="/privacy-policy" className="text-base text-muted-foreground hover:text-primary transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-base text-muted-foreground hover:text-primary transition-colors duration-200">
            Terms of Service
          </Link>
        </div>
        <div ref={socialIconsRef} className="flex justify-center space-x-6 mb-10"> {/* Increased margin */}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-125">
            <Linkedin size={22} /> {/* Slightly larger icon */}
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-125">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 1200 1227" fill="currentColor"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/></svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-125">
            <Github size={22} />
          </a>
        </div>
        <p ref={copyrightRef} className="text-base text-muted-foreground"> {/* Larger text */}
          &copy; {currentYear !== null ? currentYear : 'Loading...'} iGamX. All rights reserved.
        </p>
        <p ref={taglineRef} className="text-sm text-muted-foreground mt-3"> {/* Increased margin */}
          Advancing the world of iGaming integration.
        </p>
      </div>
    </footer>
  );
}
