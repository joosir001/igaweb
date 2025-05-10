// src/components/ui/ServiceCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  return (
    <motion.div
      // Removed initial, whileInView, viewport, and transition for entrance.
      // Entrance animation is now handled by GSAP in ServicesSection.tsx.
      whileHover={{ 
        y: -8, 
        boxShadow: "0px 10px 20px hsla(var(--primary), 0.2), 0px 0px 15px hsla(var(--primary), 0.3)",
        borderColor: "hsl(var(--primary))"
      }}
      className="h-full" // Ensure div takes full height for consistent layout
    >
      <Card className="h-full bg-card/80 backdrop-blur-sm border-2 border-transparent transition-all duration-300 ease-in-out transform hover:border-primary">
        <CardHeader className="items-center text-center">
          <motion.div 
            className="p-4 bg-primary/10 rounded-full mb-4 inline-block"
            whileHover={{ scale: 1.1, rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className="h-10 w-10 neon-text-primary" />
          </motion.div>
          <CardTitle className="text-2xl font-semibold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
