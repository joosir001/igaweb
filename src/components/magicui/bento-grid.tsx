// src/components/magicui/bento-grid.tsx
"use client";
import type { ReactNode } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';

export const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className?: string;
  background?: ReactNode;
  Icon: LucideIcon;
  description: string;
  href: string;
  cta: string;
}) => (
  <motion.div
    key={name}
    // Removed initial, whileInView, and viewport props to defer animation control to parent GSAP.
    // Retain motion.div for other potential Framer Motion features like layout animations or whileHover if added.
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      "bg-card text-card-foreground border border-border/50",
      "[box-shadow:0_0_0_1px_hsl(var(--border)/0.03),0_2px_4px_hsl(var(--border)/0.05),0_12px_24px_hsl(var(--border)/0.05)]",
      "dark:[box-shadow:0_-20px_80px_-20px_hsl(var(--primary)/0.1)_inset]",
      "transform-gpu transition-all duration-300 ease-out hover:shadow-2xl hover:border-primary/30",
      className,
    )}
  >
    {background && <div className="absolute inset-0 opacity-50 group-hover:opacity-75 transition-opacity duration-300">{background}</div>}
    
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2">
      <Icon className="h-10 w-10 mb-3 text-primary transition-transform duration-300 group-hover:scale-110" />
      <h3 className="text-xl font-semibold text-foreground dark:text-foreground">
        {name}
      </h3>
      <p className="max-w-lg text-muted-foreground text-sm leading-relaxed">
        {description}
      </p>
    </div>

    <div
      className={cn(
        "pointer-events-none z-10 absolute bottom-0 flex w-full translate-y-8 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Button variant="outline" asChild size="sm" className="pointer-events-auto bg-accent/10 hover:bg-accent/20 border-accent/30 text-accent hover:text-accent-foreground">
        <Link href={href} legacyBehavior>
          <a>
            <span className="inline-flex items-center">
              {cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </a>
        </Link>
      </Button>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-primary/[.03] dark:group-hover:bg-primary/[.05]" />
  </motion.div>
);
