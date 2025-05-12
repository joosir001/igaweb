
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
import { motion } from 'framer-motion';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

async function submitContactForm(data: ContactFormValues) {
  // Placeholder for actual form submission logic (e.g., API call)
  console.log("Form data submitted:", data);
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  // Simulate a successful submission
  return { success: true, message: "Your message has been sent successfully!" };
  // Example error simulation:
  // return { success: false, message: "Failed to send message due to a server error." };
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
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title and paragraph
      gsap.fromTo(
        [titleRef.current, paragraphRef.current],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
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
          { opacity: 0, x: -40 }, // Start from left
          {
            opacity: 1,
            x: 0,
            duration: 1.0, // Longer duration
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contactInfoRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.2, // Delay after title
          }
        );
      }

      // Animate form card
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, x: 40, scale: 0.98 }, // Start from right, slightly smaller
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.0, // Longer duration
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.3, // Delay slightly more
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
          variant: "default",
        });
        reset(); // Reset form on success
      } else {
        // Throw an error to be caught below
        throw new Error(response.message || "An unexpected error occurred.");
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
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
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Let's <span className="highlight-text-primary">Connect</span>
          </h2>
          <p ref={paragraphRef} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16 md:mb-20">
            Ready to elevate your iGaming platform? Reach out to us for a consultation or a custom quote. We're here to help you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start"> {/* Increased gap */}
          {/* Contact Info Column */}
          <div
            ref={contactInfoRef}
            className="md:col-span-2 space-y-6" // Adjusted spacing
          >
            <h3 className="text-2xl font-semibold text-foreground mb-4 border-b border-border/30 pb-2">Direct Contact</h3> {/* Added heading style */}
            <a href="mailto:info@igamx.dev" className="flex items-center space-x-3 group transition-colors duration-200 text-foreground/90 hover:text-primary"> {/* Updated email */}
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <span>info@igamx.dev</span>
            </a>
             <a href="tel:+1234567890" className="flex items-center space-x-3 group transition-colors duration-200 text-foreground/90 hover:text-primary">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <span>+1 (234) 567-890</span>
            </a>
            <p className="text-muted-foreground text-sm pt-2"> {/* Added padding top */}
              We typically respond within 24 business hours. For urgent inquiries, please call us.
            </p>
             {/* Map Placeholder */}
             <div className="aspect-video bg-card rounded-lg overflow-hidden shadow-md border border-border/20">
              <Image
                src="https://picsum.photos/seed/mapOffice/600/338"
                alt="Office Location Placeholder"
                width={600} height={338}
                className="object-cover w-full h-full grayscale-[50%] hover:grayscale-0 transition-all duration-500" // Subtle grayscale effect
                data-ai-hint="city map business" // Updated hint
              />
            </div>
          </div>

          {/* Form Column */}
          <div
            ref={formCardRef}
            className="md:col-span-3"
          >
            <Card className="shadow-lg border border-border/20 highlight-border-primary hover:shadow-xl transition-shadow duration-300"> {/* Subtle border */}
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below, and we'll get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5"> {/* Adjusted spacing */}
                  <div>
                    <Label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground/90">Full Name</Label>
                    <Input id="name" {...register("name")} placeholder="Your Name" className="mt-1"/>
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>} {/* Smaller error text */}
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground/90">Email Address</Label>
                    <Input id="email" type="email" {...register("email")} placeholder="your@email.com" className="mt-1"/>
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground/90">Company (Optional)</Label>
                    <Input id="company" {...register("company")} placeholder="Your Company Name" className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground/90">Message</Label>
                    <Textarea id="message" {...register("message")} placeholder="How can we help you?" rows={5} className="mt-1"/>
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                  </div>
                  <motion.div // Keep Framer motion for button hover
                    whileHover={{ scale: 1.02, boxShadow: "0 0 12px hsla(var(--primary), 0.3)" }} // Refined shadow
                    whileTap={{ scale: 0.98 }}
                    className="w-full pt-2" // Added padding top
                  >
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300">
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
