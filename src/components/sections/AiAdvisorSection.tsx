// src/components/sections/AiAdvisorSection.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { integrationAdvisor, IntegrationAdvisorInput } from '@/ai/flows/integration-advisor';
import { Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion'; // Keep for internal elements like button hover or loader
import { useToast } from "@/hooks/use-toast";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const servicesOptions = [
  { id: 'casino_games', label: 'Casino Games' },
  { id: 'sportsbook', label: 'Sportsbook' },
  { id: 'payment_solutions', label: 'Payment Solutions' },
  { id: 'pam', label: 'Player Account Management (PAM)' },
  { id: 'kyc_aml', label: 'KYC/AML Solutions' },
  { id: 'affiliate_systems', label: 'Affiliate Systems' },
] as const;

const platformTypeOptions = [
  'Existing Platform',
  'New Platform',
  'White Label',
] as const;

const FormSchema = z.object({
  servicesNeeded: z.array(z.string()).min(1, { message: 'Please select at least one service.' }),
  platformType: z.enum(platformTypeOptions, {
    errorMap: () => ({ message: "Please select a platform type." }),
  }),
});

type FormValues = z.infer<typeof FormSchema>;

export default function AiAdvisorSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const { toast } = useToast();
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const adviceCardRef = useRef<HTMLDivElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      servicesNeeded: [],
      platformType: undefined,
    },
  });

  const { control, handleSubmit, formState: { errors } } = form;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title and paragraph (if they were separate components or had classes)
      gsap.fromTo(
        ['.ai-advisor-title', '.ai-advisor-paragraph'],
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // Animate form card
      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, x: -50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
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

      // Animate advice card
      if (adviceCardRef.current) {
         gsap.fromTo(
          adviceCardRef.current,
          { opacity: 0, x: 50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.2, // Slight delay if desired
            ease: 'power3.out',
            scrollTrigger: {
              trigger: adviceCardRef.current,
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


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setAdvice(null);
    try {
      const input: IntegrationAdvisorInput = {
        servicesNeeded: data.servicesNeeded,
        platformType: data.platformType,
      };
      const result = await integrationAdvisor(input);
      setAdvice(result.integrationStrategy);
      toast({
        title: "AI Advisor Success",
        description: "Integration strategy generated successfully.",
        variant: "default",
      });
    } catch (error) {
      console.error('Error fetching AI advice:', error);
      setAdvice('Failed to generate advice. Please try again.');
       toast({
        title: "AI Advisor Error",
        description: "Could not generate integration strategy. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-advisor" className="bg-background/70 backdrop-blur-sm" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div> {/* Container for title animations */}
          <h2 className="ai-advisor-title text-4xl md:text-5xl font-bold text-center mb-4">
            AI-Powered <span className="neon-text-accent">Integration Advisor</span>
          </h2>
          <p className="ai-advisor-paragraph text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12 md:mb-16">
            Get personalized recommendations for your API integration strategy. Tell us your needs, and our AI will suggest the optimal approach.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div ref={formCardRef}> {/* GSAP target */}
            <Card className="shadow-xl border-primary/30 neon-border-primary">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Tell Us About Your Project
                </CardTitle>
                <CardDescription>
                  Provide details about your iGaming platform and service requirements.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-2 block">Services Needed</Label>
                    <div className="space-y-2">
                      {servicesOptions.map((service) => (
                        <Controller
                          key={service.id}
                          name="servicesNeeded"
                          control={control}
                          render={({ field }) => (
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={service.id}
                                checked={field.value?.includes(service.label)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), service.label])
                                    : field.onChange(
                                        (field.value || []).filter(
                                          (value) => value !== service.label
                                        )
                                      );
                                }}
                              />
                              <Label htmlFor={service.id} className="font-normal text-sm text-foreground/90">
                                {service.label}
                              </Label>
                            </div>
                          )}
                        />
                      ))}
                    </div>
                    {errors.servicesNeeded && (
                      <p className="text-sm text-destructive mt-1">{errors.servicesNeeded.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="platformType" className="text-base font-semibold mb-2 block">Platform Type</Label>
                    <Controller
                      name="platformType"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger id="platformType" className="w-full">
                            <SelectValue placeholder="Select platform type" />
                          </SelectTrigger>
                          <SelectContent>
                            {platformTypeOptions.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.platformType && (
                      <p className="text-sm text-destructive mt-1">{errors.platformType.message}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <motion.div // Framer Motion for button hover
                    whileHover={{ scale: 1.02, boxShadow: "0 0 15px hsl(var(--primary))" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      Get AI Advice
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          <div ref={adviceCardRef}> {/* GSAP target */}
            <Card className="min-h-[400px] shadow-xl border-accent/30 neon-border-accent">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-accent" />
                  AI-Generated Strategy
                </CardTitle>
                <CardDescription>
                  Our AI will analyze your input and provide a tailored integration strategy.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <Loader2 className="h-12 w-12 animate-spin text-accent mb-4" />
                    <p>Generating your personalized strategy...</p>
                  </div>
                )}
                {!isLoading && advice && (
                  <motion.div // Framer motion for content reveal after loading
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="prose prose-sm sm:prose dark:prose-invert max-w-none p-4 bg-background/50 rounded-md max-h-[300px] overflow-y-auto"
                  >
                    <p className="whitespace-pre-wrap">{advice}</p>
                  </motion.div>
                )}
                {!isLoading && !advice && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center">
                    <Sparkles className="h-12 w-12 text-accent/50 mb-4" />
                    <p>Your personalized integration strategy will appear here once generated.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
