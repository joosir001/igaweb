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
      whileHover={{
        y: -8, 
        boxShadow: "0px 12px 30px -8px hsla(var(--primary)/0.25), 0px 6px 15px -8px hsla(var(--primary)/0.2)",
        scale: 1.02,
      }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
      className="h-full"
    >
      <Card className="h-full bg-card/80 dark:bg-card/90 backdrop-blur-lg border border-border/40 hover:border-primary/60 transition-all duration-300 ease-out overflow-hidden group shadow-lg hover:shadow-xl rounded-xl">
        <CardHeader className="items-center text-center pt-8 pb-5">
          <motion.div
            className="p-4 bg-gradient-to-br from-primary/15 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-full mb-5 inline-block transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
            whileHover={{ rotate: 12, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
          >
            <Icon className="h-10 w-10 text-primary transition-colors duration-300" />
          </motion.div>
          <CardTitle className="text-xl md:text-2xl font-semibold text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent className="text-center px-6 pb-8">
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{description}</p>
        </CardContent>
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></div>
      </Card>
    </motion.div>
  );
}
