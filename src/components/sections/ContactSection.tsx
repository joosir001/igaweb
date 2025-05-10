// src/components/sections/ContactSection.tsx
"use client";

import { useRef, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion'; // Keep for button hover
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  servicesOfInterest: z.array(z.string()).optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

async function submitContactForm(data: ContactFormValues) {
  console.log("Form data submitted:", data);
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, message: "Your message has been sent successfully!" };
}

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title and paragraph
      gsap.fromTo(
        ['.contact-title', '.contact-paragraph'],
        { opacity: 0, y: 30, skewX: -2 },
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // Animate contact info block
      if (contactInfoRef.current) {
        gsap.fromTo(
          contactInfoRef.current,
          { opacity: 0, x: -50, filter: "blur(5px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contactInfoRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }

      // Animate form card
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, x: 50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.9,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await submitContactForm(data);
      if (response.success) {
        toast({
          title: "Message Sent!",
          description: response.message,
          variant: "default"
        });
        reset();
      } else {
        throw new Error(response.message || "An unexpected error occurred.");
      }
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Could not send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="contact-title text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="neon-text-primary">Connect</span>
          </h2>
          <p className="contact-paragraph text-lg text-muted-foreground max-w-2xl mx-auto mb-12 md:mb-16">
            Ready to elevate your iGaming platform? Reach out to us for a consultation or a custom quote. We're here to help you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-start">
          <div 
            ref={contactInfoRef}
            className="md:col-span-2 space-y-8"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-4">Direct Contact</h3>
            <a href="mailto:info@neonconnect.dev" className="flex items-center space-x-3 group">
              <Mail className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-foreground/90 group-hover:text-primary transition-colors">info@neonconnect.dev</span>
            </a>
             <a href="tel:+1234567890" className="flex items-center space-x-3 group">
              <Phone className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-foreground/90 group-hover:text-primary transition-colors">+1 (234) 567-890</span>
            </a>
            <p className="text-muted-foreground text-sm">
              We typically respond within 24 business hours. For urgent inquiries, please call us.
            </p>
             <div className="aspect-video bg-card rounded-lg overflow-hidden shadow-lg">
              <Image 
                src="https://picsum.photos/seed/mapOffice/600/338" 
                alt="Office Location Placeholder" 
                width={600} height={338} 
                className="object-cover w-full h-full"
                data-ai-hint="city map" 
              />
            </div>
          </div>

          <div 
            ref={formCardRef}
            className="md:col-span-3"
          >
            <Card className="shadow-xl border-primary/30 neon-border-primary">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below, and we'll get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...register("name")} placeholder="Your Name" className="mt-1"/>
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="your@email.com" className="mt-1"/>
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input id="company" {...register("company")} placeholder="Your Company Name" className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" {...register("message")} placeholder="How can we help you?" rows={5} className="mt-1"/>
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                  </div>
                  <motion.div // Keep Framer motion for button hover
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px hsl(var(--primary))" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
