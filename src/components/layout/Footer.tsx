
"use client";
import Link from 'next/link';
import { Linkedin, Twitter, Github, Gamepad2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-background/80 border-t border-border/30 py-12 mt-16"> {/* Slightly different background */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center mb-6 group">
          <Gamepad2 className="h-8 w-8 text-primary group-hover:text-primary/80 transition-colors" />
          <span className="ml-2 text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">iGamX</span> {/* Updated Company Name */}
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </div>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
            {/* Using X icon SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1200 1227" fill="currentColor"><path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z"/></svg>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
            <Github size={20} />
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear !== null ? currentYear : 'Loading...'} iGamX. All rights reserved. {/* Updated Company Name */}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Advancing the world of iGaming integration. {/* Refined Tagline */}
        </p>
      </div>
    </footer>
  );
}
