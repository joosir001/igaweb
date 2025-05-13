// src/components/magicui/animated-list.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode, HTMLAttributes, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface AnimatedListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  delay?: number;
  animationType?: "fadeIn" | "slideIn";
  className?: string;
}

const AnimatedList = ({
  children,
  delay = 0,
  animationType = "fadeIn",
  className,
  ...props
}: AnimatedListProps) => {
  const childrenArray = Array.isArray(children) ? children : [children];

  const animations = {
    fadeIn: {
      initial: { opacity: 0, y: 20 },
      animate: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: delay + i * 0.1,
          duration: 0.3,
          ease: "easeOut",
        },
      }),
      exit: (i: number) => ({
        opacity: 0,
        y: -20,
        transition: {
          delay: i * 0.05, // Stagger exit slightly
          duration: 0.2,
          ease: "easeIn",
        },
      }),
    },
    slideIn: {
      initial: { opacity: 0, x: -50 },
      animate: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
          delay: delay + i * 0.1,
          type: "spring",
          stiffness: 100,
          damping: 12,
        },
      }),
      exit: (i: number) => ({
        opacity: 0,
        x: 50,
        transition: {
          delay: i * 0.05,
          duration: 0.2,
          ease: "easeIn",
        },
      }),
    },
  };

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <AnimatePresence>
        {childrenArray.map((child, i) => (
          <motion.div
            key={(child as any)?.key || i}
            custom={i}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={animations[animationType]}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

interface AnimatedListItemProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  // No index needed here as it's handled by AnimatedList
}

const AnimatedListItem = ({
  children,
  className,
  style,
  ...props
}: AnimatedListItemProps) => {
  // The motion.div for animation is now part of AnimatedList
  return (
    <div className={cn("p-4 rounded-lg border bg-card text-card-foreground shadow-sm", className)} style={style} {...props}>
      {children}
    </div>
  );
};


export { AnimatedList, AnimatedListItem };
