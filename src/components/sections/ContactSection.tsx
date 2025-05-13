'use client';

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
import { useScopedI18n } from '@/i18n/client';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const t = useScopedI18n('contact_section');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactFormSchema = z.object({
    name: z.string().min(2, { message: t('form_validation.name_min') }),
    email: z.string().email({ message: t('form_validation.email_invalid') }),
    company: z.string().optional(),
    message: z.string().min(10, { message: t('form_validation.message_min') }),
  });

  type ContactFormValues = z.infer<typeof contactFormSchema>;

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

      if (contactInfoRef.current) {
        gsap.fromTo(
          contactInfoRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contactInfoRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.2,
          }
        );
      }

      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, x: 40, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formCardRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.3,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  
  async function submitContactForm(data: ContactFormValues) {
    console.log("Form data submitted:", data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, message: t('toast_success_description') };
  }

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await submitContactForm(data);
      if (response.success) {
        toast({
          title: t('toast_success_title'),
          description: response.message,
          variant: "default",
        });
        reset();
      } else {
        throw new Error(response.message || t('toast_error_description'));
      }
    } catch (error: any) {
      console.error("Form submission error:", error);
      toast({
        title: t('toast_error_title'),
        description: error.message || t('toast_error_description'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-gradient-to-t from-background via-card/10 to-background dark:from-background dark:via-card/5 dark:to-background py-24 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('title_prefix')} <span className="highlight-text-primary">{t('title_highlight')}</span>
          </h2>
          <p ref={paragraphRef} className="text-lg text-muted-foreground max-w-2xl mx-auto mb-16 md:mb-20">
            {t('subheading')}
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-start">
          <div
            ref={contactInfoRef}
            className="md:col-span-2 space-y-6"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-4 border-b border-border/30 pb-2">{t('direct_contact_title')}</h3>
            <a href="mailto:info@igamx.dev" className="flex items-center space-x-3 group transition-colors duration-200 text-foreground/90 hover:text-primary">
              <Mail className="w-5 h-5 text-primary flex-shrink-0" />
              <span>info@igamx.dev</span>
            </a>
             <a href="tel:+1234567890" className="flex items-center space-x-3 group transition-colors duration-200 text-foreground/90 hover:text-primary">
              <Phone className="w-5 h-5 text-primary flex-shrink-0" />
              <span>+1 (234) 567-890</span>
            </a>
            <p className="text-muted-foreground text-sm pt-2">
              {t('response_time_note')}
            </p>
             <div className="aspect-video bg-card rounded-lg overflow-hidden shadow-md border border-border/20">
              <Image
                src="https://picsum.photos/seed/mapOffice/600/338"
                alt="Office Location Placeholder"
                width={600} height={338}
                className="object-cover w-full h-full grayscale-[50%] hover:grayscale-0 transition-all duration-500"
                data-ai-hint="city map business"
              />
            </div>
          </div>

          <div
            ref={formCardRef}
            className="md:col-span-3"
          >
            <Card className="shadow-lg border border-border/20 highlight-border-primary hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl">{t('form_card_title')}</CardTitle>
                <CardDescription>{t('form_card_description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <Label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground/90">{t('name_label')}</Label>
                    <Input id="name" {...register("name")} placeholder={t('name_placeholder')} className="mt-1"/>
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground/90">{t('email_label')}</Label>
                    <Input id="email" type="email" {...register("email")} placeholder={t('email_placeholder')} className="mt-1"/>
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="company" className="mb-1.5 block text-sm font-medium text-foreground/90">{t('company_label')}</Label>
                    <Input id="company" {...register("company")} placeholder={t('company_placeholder')} className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground/90">{t('message_label')}</Label>
                    <Textarea id="message" {...register("message")} placeholder={t('message_placeholder')} rows={5} className="mt-1"/>
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.02, boxShadow: "0 0 12px hsla(var(--primary), 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full pt-2"
                  >
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300">
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="mr-2 h-4 w-4" />
                      )}
                      {isSubmitting ? t('submitting_button') : t('send_button')}
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
