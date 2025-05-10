
"use client";

import { motion } from 'framer-motion';
import { Zap, ShieldCheck, DatabaseZap, Cog, Code2, Link2, Server, Share2 } from 'lucide-react';
// import Image from 'next/image'; // Image component not used for new animation

const features = [
  {
    icon: Zap,
    title: "Blazing Speed",
    description: "Our APIs are optimized for high performance and low latency, ensuring rapid response times for all transactions."
  },
  {
    icon: ShieldCheck,
    title: "Robust Security",
    description: "State-of-the-art security protocols protect your data and transactions, ensuring a safe and trustworthy environment."
  },
  {
    icon: DatabaseZap,
    title: "Scalable Architecture",
    description: "Built to handle growth, our solutions scale effortlessly with your business needs, supporting millions of users."
  },
  {
    icon: Cog,
    title: "Easy Integration",
    description: "Developer-friendly APIs with comprehensive documentation and SDKs for quick and straightforward integration."
  },
];

const ApiIntegrationAnimation = () => {
  const iconVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i:number) => ({
      scale: 1,
      opacity: 1,
      transition: { delay: i * 0.3, duration: 0.5, type: "spring", stiffness: 150 }
    }),
    hover: { scale: 1.2, color: "hsl(var(--primary))" }
  };

  const lineVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: (i:number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { delay: 0.5 + i * 0.2, duration: 0.8, ease: "easeInOut" }
    })
  };

  const centerIconVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [1, 1.1, 1],
      opacity: 1,
      transition: { delay: 1.2, duration: 1, repeat: Infinity, repeatType: "mirror", ease:"easeInOut" }
    },
     hover: { scale: 1.3, color: "hsl(var(--accent))" }
  };


  return (
    <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Central API Hub Icon */}
        <motion.g variants={centerIconVariants} initial="initial" animate="animate" whileHover="hover">
          <Share2 x="85" y="85" width="30" height="30" className="text-accent" strokeWidth={1.5}/>
        </motion.g>

        {/* Peripheral Service Icons and Connecting Lines */}
        {[
          { icon: Server, x: 30, y: 30, cx: 100, cy: 100, angle: -135 },
          { icon: Code2, x: 140, y: 30, cx: 100, cy: 100, angle: -45 },
          { icon: Link2, x: 30, y: 140, cx: 100, cy: 100, angle: 135 },
          { icon: DatabaseZap, x: 140, y: 140, cx: 100, cy: 100, angle: 45 },
        ].map((item, index) => (
          <g key={index}>
            <motion.line
              x1={item.cx + 25 * Math.cos(item.angle * Math.PI / 180)}
              y1={item.cy + 25 * Math.sin(item.angle * Math.PI / 180)}
              x2={item.x + 15} /* Offset to center of icon */
              y2={item.y + 15} /* Offset to center of icon */
              stroke="hsl(var(--border))"
              strokeWidth="1"
              variants={lineVariants}
              custom={index}
              initial="initial"
              animate="animate"
            />
            <motion.g variants={iconVariants} custom={index} initial="initial" animate="animate" whileHover="hover">
              <item.icon x={item.x} y={item.y} width="30" height="30" className="text-primary/80" strokeWidth={1.5} />
            </motion.g>
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 rounded-full blur-xl -z-10"></div>
    </div>
  );
};


export default function TechnologySection() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="technology" className="bg-background/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
            Engineered for <span className="neon-text-accent">Peak Performance</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 md:mb-16">
            Our platform is built on a foundation of cutting-edge technology, designed for reliability, speed, and security to give you a competitive edge.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative" // Removed aspect-square and max-w-md for the new animation
          >
            <ApiIntegrationAnimation />
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
            className="space-y-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants} className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-accent/10 rounded-full">
                  <feature.icon className="w-7 h-7 neon-text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
             <motion.div variants={itemVariants} className="mt-8 p-4 border border-dashed border-border rounded-lg bg-card/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Code2 size={18} className="text-primary" />
                    <span>Developer-first: Comprehensive SDKs & dedicated support.</span>
                </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
