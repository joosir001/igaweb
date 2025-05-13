// src/components/magicui/animated-beam.tsx
"use client";

import type { SVGProps } from "react";
import React, { forwardRef, useId, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedBeamProps
  extends React.ComponentPropsWithoutRef<"svg"> {
  className?: string;
  containerRef: React.RefObject<HTMLElement>; // Path container
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam = forwardRef<SVGElement, AnimatedBeamProps>(
  (
    {
      className,
      containerRef,
      fromRef,
      toRef,
      curvature = 0,
      reverse = false, // Beam moving from To to From
      pathColor = "hsl(var(--primary))", // Using theme color
      pathWidth = 2,
      pathOpacity = 0.2,
      gradientStartColor = "hsl(var(--primary))", // Using theme color
      gradientStopColor = "hsl(var(--accent))", // Using theme accent
      delay = 0,
      duration = Math.random() * 3 + 4, // Random duration between 4-7 seconds
      startXOffset = 0,
      startYOffset = 0,
      endXOffset = 0,
      endYOffset = 0,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const pathRef = useRef<SVGPathElement>(null);

    // Calculate the gradient coordinates based on the reverse prop
    const gradientCoordinates = reverse
      ? {
          x1: ["90%", "-10%"],
          x2: ["100%", "0%"],
          y1: ["0%", "0%"],
          y2: ["0%", "0%"],
        }
      : {
          x1: ["10%", "110%"],
          x2: ["0%", "100%"],
          y1: ["0%", "0%"],
          y2: ["0%", "0%"],
        };

    return (
      <svg
        fill="none"
        width="100%"
        height="100%"
        className={cn(
          "pointer-events-none absolute left-0 top-0 transform-gpu stroke-2",
          className,
        )}
        ref={ref}
        {...props}
      >
        <defs>
          <motion.linearGradient
            id={id}
            gradientUnits="userSpaceOnUse"
            initial={{
              x1: "0%",
              x2: "0%",
              y1: "0%",
              y2: "0%",
            }}
            animate={{
              x1: gradientCoordinates.x1,
              x2: gradientCoordinates.x2,
              y1: gradientCoordinates.y1,
              y2: gradientCoordinates.y2,
            }}
            transition={{
              delay,
              duration,
              ease: [0.16, 1, 0.3, 1], // https://easings.net/#easeOutExpo
              repeat: Infinity,
              repeatDelay: 0,
            }}
          >
            <stop stopColor={gradientStartColor} stopOpacity="0"></stop>
            <stop stopColor={gradientStartColor}></stop>
            <stop offset="32.5%" stopColor={gradientStopColor}></stop>
            <stop
              offset="100%"
              stopColor={gradientStopColor}
              stopOpacity="0"
            ></stop>
          </motion.linearGradient>
        </defs>
        <path
          d={getBeamPath({
            containerRef,
            fromRef,
            toRef,
            curvature,
            startXOffset,
            startYOffset,
            endXOffset,
            endYOffset,
          })}
          stroke={pathColor}
          strokeWidth={pathWidth}
          strokeOpacity={pathOpacity}
          strokeLinecap="round"
        />
        <path
          d={getBeamPath({
            containerRef,
            fromRef,
            toRef,
            curvature,
            startXOffset,
            startYOffset,
            endXOffset,
            endYOffset,
          })}
          strokeWidth={pathWidth}
          stroke={`url(#${id})`}
          strokeOpacity="1"
          strokeLinecap="round"
        />
      </svg>
    );
  },
);

AnimatedBeam.displayName = "AnimatedBeam";


interface GetBeamPathParams {
  containerRef: React.RefObject<HTMLElement>;
  fromRef: React.RefObject<HTMLElement>;
  toRef: React.RefObject<HTMLElement>;
  curvature?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

const getBeamPath = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: GetBeamPathParams): string => {
  if (!containerRef.current || !fromRef.current || !toRef.current) {
    return "";
  }

  const containerRect = containerRef.current.getBoundingClientRect();
  const fromRect = fromRef.current.getBoundingClientRect();
  const toRect = toRef.current.getBoundingClientRect();

  const startX =
    fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
  const startY =
    fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
  const endX =
    toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
  const endY =
    toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

  const controlX = (startX + endX) / 2;
  const controlY = (startY + endY) / 2 - curvature;

  return `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`;
};
