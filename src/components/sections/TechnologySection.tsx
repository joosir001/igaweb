"use client";

import { motion } from 'framer-motion';
import { Zap, ShieldCheck, DatabaseZap, Cog, Code2 } from 'lucide-react';
import Image from 'next/image';

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
            className="relative aspect-square max-w-md mx-auto"
          >
            <Image 
              src="https://picsum.photos/seed/techAbstract/600/600" 
              alt="Abstract Technology Visualization" 
              layout="fill"
              objectFit="cover"
              className="rounded-xl shadow-2xl shadow-accent/20"
              data-ai-hint="abstract network"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl"></div>
             <motion.div 
                className="absolute -top-4 -left-4 w-24 h-24 border-4 border-accent rounded-full opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5]}}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
             />
             <motion.div 
                className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-primary rounded-lg opacity-50"
                animate={{ rotate: [0, 90, 0], opacity: [0.5, 0.8, 0.5]}}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
             />
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
