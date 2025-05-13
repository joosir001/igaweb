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
        "relative", // Needed for absolute positioning of pseudo-elements if we were to use them
        // Base text styling is expected to be provided by `className` or parent.
        // The component itself will make the text color transparent and use the gradient.
        
        // Shimmer animation classes
        "animate-shimmer bg-clip-text text-transparent bg-no-repeat",
        "[background-position:0_0]", // Initial position for the gradient
        "[background-size:calc(100%+var(--shimmer-width))_100%]", // Gradient size
        
        // Shimmer gradient:
        // The text itself will be the base color (e.g., primary),
        // and the shimmer (via color) will be a lighter shade or white.
        "bg-gradient-to-r from-primary via-foreground/80 to-primary dark:from-primary dark:via-background/80 dark:to-primary",

        className, // Allows overriding typography, etc.
      )}
    >
      {children}
    </span>
  );
};

export default AnimatedShinyText;
