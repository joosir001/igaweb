// src/components/ui/ServiceCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { AnimatedListItem } from '@/components/magicui/animated-list'; // Import AnimatedListItem

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  id: string; // Add id for key prop in AnimatedList
}

export default function ServiceCard({ icon: Icon, title, description, id }: ServiceCardProps) {
  return (
    <AnimatedListItem
      key={id} // key is important for AnimatePresence in AnimatedList
      className="bg-card/70 dark:bg-card/80 backdrop-blur-xl border border-border/30 hover:border-primary/60 transition-all duration-300 ease-out overflow-hidden group shadow-xl hover:shadow-2xl rounded-2xl p-0 h-full" // Added p-0 and h-full
    >
      <CardHeader className="items-center text-center pt-10 pb-6"> {/* Increased padding */}
        <motion.div
          className="p-5 bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/25 dark:to-primary/15 rounded-full mb-6 inline-block transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/30 group-hover:shadow-lg"
          whileHover={{ rotate: [0, 10, -8, 0], scale: 1.18 }} // More dynamic rotation
          transition={{ type: "spring", stiffness: 280, damping: 12 }} // Adjusted spring
        >
          <Icon className="h-12 w-12 text-primary transition-colors duration-300" /> {/* Larger icon */}
        </motion.div>
        <CardTitle className="text-2xl md:text-3xl font-bold text-foreground">{title}</CardTitle> {/* Bolder title */}
      </CardHeader>
      <CardContent className="text-center px-7 pb-10"> {/* Increased padding */}
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{description}</p> {/* Larger text */}
      </CardContent>
      {/* Enhanced decorative element */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1.5 bg-gradient-to-r from-transparent via-primary/60 to-transparent rounded-t-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></div>
    </AnimatedListItem>
  );
}
