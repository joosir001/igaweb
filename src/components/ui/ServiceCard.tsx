
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
        y: -6, // Slightly less lift
        boxShadow: "0px 8px 25px -5px hsla(var(--primary), 0.15), 0px 4px 15px -5px hsla(var(--primary), 0.1)", // More subtle shadow
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }} // Spring animation for hover
      className="h-full"
    >
      {/* Apply border transition directly on Card */}
      <Card className="h-full bg-card/90 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300 ease-out overflow-hidden group">
        <CardHeader className="items-center text-center pt-8 pb-4"> {/* Adjusted padding */}
          <motion.div
            className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full mb-5 inline-block transition-all duration-300 group-hover:scale-110" // Gradient background and scale on group hover
            whileHover={{ rotate: 10 }} // Slight rotate on icon hover
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon className="h-10 w-10 text-primary transition-colors duration-300" />
          </motion.div>
          <CardTitle className="text-xl font-semibold text-foreground">{title}</CardTitle> {/* Adjusted size */}
        </CardHeader>
        <CardContent className="text-center px-6 pb-8"> {/* Adjusted padding */}
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </CardContent>
        {/* Subtle decorative element */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left"></div>
      </Card>
    </motion.div>
  );
}
