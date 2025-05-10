"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users } from 'lucide-react';

const clientLogos = [
  { name: "Client Alpha", src: "https://picsum.photos/seed/logoA/200/100", dataAiHint: "company logo" },
  { name: "Client Beta", src: "https://picsum.photos/seed/logoB/200/100", dataAiHint: "company logo" },
  { name: "Client Gamma", src: "https://picsum.photos/seed/logoC/200/100", dataAiHint: "company logo" },
  { name: "Client Delta", src: "https://picsum.photos/seed/logoD/200/100", dataAiHint: "company logo" },
  { name: "Client Epsilon", src: "https://picsum.photos/seed/logoE/200/100", dataAiHint: "company logo" },
];

const testimonials = [
  {
    quote: "NeonConnect revolutionized our integration timeline. Their APIs are robust and their support is top-notch!",
    author: "Jane Doe",
    title: "CTO, Alpha Gaming",
    avatar: "https://picsum.photos/seed/avatar1/100/100",
    dataAiHint: "person photo"
  },
  {
    quote: "The scalability and reliability of NeonConnect's solutions have been a game-changer for our platform.",
    author: "John Smith",
    title: "CEO, Beta Sports",
    avatar: "https://picsum.photos/seed/avatar2/100/100",
    dataAiHint: "person photo"
  },
  {
    quote: "Integrating their payment API was incredibly smooth. We've seen a significant improvement in transaction success rates.",
    author: "Alice Brown",
    title: "Head of Payments, Gamma Casino",
    avatar: "https://picsum.photos/seed/avatar3/100/100",
    dataAiHint: "person photo"
  }
];

export default function ClientsSection() {
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
    <section id="clients" className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="text-center"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="neon-text-primary">Industry Leaders</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 md:mb-16">
            We partner with innovative iGaming businesses worldwide, helping them achieve their technological and market goals.
          </motion.p>
        </motion.div>

        {/* Client Logos */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          {clientLogos.map((logo, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative h-12 w-32 md:h-16 md:w-40 filter grayscale hover:grayscale-0 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
            >
              <Image 
                src={logo.src} 
                alt={logo.name} 
                layout="fill" 
                objectFit="contain"
                data-ai-hint={logo.dataAiHint}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <motion.h3 variants={itemVariants} className="text-3xl font-bold text-center mb-12">
            What Our <span className="neon-text-accent">Partners Say</span>
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants} className="h-full">
                <Card className="h-full bg-card/80 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-transparent hover:border-accent/50 hover:shadow-accent/20 transition-all duration-300">
                  <CardContent className="flex flex-col h-full">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-foreground italic mb-4 flex-grow">"{testimonial.quote}"</blockquote>
                    <div className="flex items-center mt-auto">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image 
                          src={testimonial.avatar} 
                          alt={testimonial.author} 
                          layout="fill" 
                          objectFit="cover"
                          data-ai-hint={testimonial.dataAiHint}
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
