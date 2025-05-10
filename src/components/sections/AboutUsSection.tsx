
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Target, Eye, Zap, Users, ShieldCheckIcon } from 'lucide-react';

export default function AboutUsSection() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <section id="about" className="bg-background/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-center mb-4">
            The <span className="neon-text-primary">NeonConnect</span> Story
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12 md:mb-16">
            We are a team of passionate iGaming experts and technology innovators dedicated to simplifying complexity and empowering our clients' success.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div variants={imageVariants}>
              <Image 
                src="https://picsum.photos/seed/teamOffice/800/600" 
                alt="Modern tech office environment" 
                width={800}
                height={600}
                className="rounded-xl shadow-2xl shadow-primary/20 object-cover"
                data-ai-hint="modern office"
              />
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2 flex items-center">
                  <Target className="w-6 h-6 neon-text-primary mr-3" /> Our Mission
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading provider of agile and robust API integration solutions for the global iGaming industry, enabling our clients to innovate faster and achieve market leadership.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-2 flex items-center">
                  <Eye className="w-6 h-6 neon-text-accent mr-3" /> Our Vision
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  A seamlessly connected iGaming ecosystem where technology barriers are eliminated, fostering unparalleled growth and player experiences.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.h3 variants={itemVariants} className="text-3xl font-bold text-center mb-8">
            Our Core <span className="neon-text-accent">Values</span>
          </motion.h3>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={sectionVariants} // Reuse sectionVariants for staggering children
          >
            {[
              { icon: Zap, title: 'Innovation', text: 'Continuously exploring new technologies to provide cutting-edge solutions.' },
              { icon: Users, title: 'Client-Centricity', text: 'Our clients success is our success. We build partnerships based on trust and mutual growth.' },
              { icon: ShieldCheckIcon, title: 'Integrity & Reliability', text: 'Operating with transparency and delivering dependable solutions that our clients can count on.' }
            ].map((value, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0px 8px 16px hsla(var(--accent), 0.2), 0px 0px 12px hsla(var(--accent), 0.3)" 
                }}
                className="bg-card p-6 rounded-lg shadow-xl hover:shadow-accent/20 transition-shadow duration-300 border border-transparent hover:border-accent/50 h-full"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-accent/10 rounded-full">
                    <value.icon className="w-7 h-7 neon-text-accent" />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-foreground text-center mb-2">{value.title}</h4>
                <p className="text-muted-foreground text-sm text-center leading-relaxed">{value.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
