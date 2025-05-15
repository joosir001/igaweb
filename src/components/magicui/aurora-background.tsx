// src/components/magicui/aurora-background.tsx
"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  className?: string;
  interactive?: boolean; // Allow disabling mouse interaction
  strength?: number; // Control gradient strength/spread
  duration?: number; // Control animation speed
  chromaticAberration?: number; // Add subtle chromatic aberration effect
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  interactive = true,
  strength = 800, // Default: 800, can be adjusted for more/less spread
  duration = 4, // Default: 4 seconds for a slow, mesmerizing effect
  chromaticAberration = 0.01, // Default: subtle effect, 0 to disable
  ...props
}: AuroraBackgroundProps) => {
  // Mouse position state
  const [mouseX, setMouseX] = React.useState(0);
  const [mouseY, setMouseY] = React.useState(0);

  // Handle mouse move to update gradient position
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!interactive || !currentTarget) return;
    const rect = currentTarget.getBoundingClientRect();
    setMouseX(clientX - rect.left);
    setMouseY(clientY - rect.top);
  }

  // Unique ID for gradient
  const id = React.useId();

  return (
    <div
      className={cn(
        "relative flex flex-col h-full items-center justify-center bg-background text-foreground transition-bg",
        className
      )}
      onMouseMove={interactive ? handleMouseMove : undefined}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          key={id} // Ensure re-render on key props change if any
          className="absolute inset-[-10px] h-[calc(100%+20px)] w-[calc(100%+20px)] opacity-20" // Changed from opacity-30
          style={{
            filter: chromaticAberration > 0 ? `url(#${id}-chromaticAberration)` : "none",
          }}
        >
          <defs>
            <motion.radialGradient
              id={`${id}-gradient`}
              cx={interactive ? mouseX : "50%"}
              cy={interactive ? mouseY : "50%"}
              r="50%" // Define radius for spread control
              gradientUnits="userSpaceOnUse"
              initial={{
                r: "30%", // Start with a smaller radius for a subtle intro
                opacity: 0,
              }}
              animate={{
                r: "80%", // Expand radius for a broader effect
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                duration: duration * 0.8, // Link to main duration
              }}
            >
              {/* Primary Color Stop - Electric Blue (Neon) */}
              <stop stopColor="hsl(var(--primary))" />
              {/* Secondary Color Stop - Vibrant Purple (Aurora) */}
              <stop offset="0.4" stopColor="hsl(var(--secondary))" />
              {/* Accent Color Stop - Professional Teal/Cyan */}
              <stop offset="0.8" stopColor="hsl(var(--accent))" />
              <stop offset="1" stopColor="hsl(var(--primary))" />
            </motion.radialGradient>

            {chromaticAberration > 0 && (
              <filter id={`${id}-chromaticAberration`}>
                <feColorMatrix
                  type="matrix"
                  values={`1 0 0 0 ${chromaticAberration}
                           0 1 0 0 0
                           0 0 1 0 ${-chromaticAberration}
                           0 0 0 1 0`}
                />
              </filter>
            )}
          </defs>
          {/* The main rectangle that uses the gradient */}
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${id}-gradient)`} />
        </motion.svg>
      </div>

      {/* Radial gradient glow at mouse position or center */}
      {showRadialGradient && interactive && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-20 blur-2xl"
          style={{
            background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, hsl(var(--primary)/0.5), transparent ${strength * 0.5}px)`,
            // Using primary for the direct mouse glow, can be changed
          }}
          animate={{
            background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, hsl(var(--primary)/0.5), transparent ${strength * 0.5}px)`,
          }}
          transition={{ type: "tween", ease: "linear", duration: 0.1 }}
        />
      )}
      {showRadialGradient && !interactive && (
         <motion.div
          className="pointer-events-none absolute inset-0 z-10 opacity-15 blur-3xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, hsl(var(--primary)/0.3), transparent 40%)`,
          }}
          initial={{ opacity: 0, scale: 0.8}}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: duration * 0.7, ease: "circOut", delay: 0.3 }}
        />
      )}

      {/* Content */}
      <div className="relative z-20">{children}</div>
    </div>
  );
};
