
// src/components/magicui/animated-shiny-text.tsx
"use client";
import type { CSSProperties, FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100, // Default shimmer width in pixels
}) => {
  return (
    <span
      style={
        {
          "--shimmer-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "relative", 
        "animate-shimmer bg-clip-text text-transparent bg-no-repeat",
        "[background-position:0_0]", 
        "[background-size:calc(100%+var(--shimmer-width))_100%]", 
        
        // Updated Shimmer gradient for a more professional look
        "bg-gradient-to-r from-primary via-accent/70 to-primary",
        // Dark mode explicit gradient to ensure it uses theme accent
        "dark:from-primary dark:via-accent/50 dark:to-primary",

        className, 
      )}
    >
      {children}
    </span>
  );
};

export default AnimatedShinyText;

