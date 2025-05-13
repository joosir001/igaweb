'use client';

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
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScopedI18n } from '@/i18n/client';

gsap.registerPlugin(ScrollTrigger);

export default function AiAdvisorSection() {
  const t = useScopedI18n('ai_advisor_section');
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<string | null>(null);
  const { toast } = useToast();

  const sectionRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const adviceCardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const servicesOptions = [
    { id: 'casino_games', label: t('services_options.casino_games') },
    { id: 'sportsbook', label: t('services_options.sportsbook') },
    { id: 'payment_solutions', label: t('services_options.payment_solutions') },
    { id: 'pam', label: t('services_options.pam') },
    { id: 'kyc_aml', label: t('services_options.kyc_aml') },
    { id: 'affiliate_systems', label: t('services_options.affiliate_systems') },
  ] as const;

  const platformTypeOptions = [
    t('platform_type_options.existing'),
    t('platform_type_options.new'),
    t('platform_type_options.white_label'),
  ] as const;
  
  const FormSchema = z.object({
    servicesNeeded: z.array(z.string()).min(1, { message: t('form_validation.services_min') }),
    platformType: z.string({
      required_error: t('form_validation.platform_type_required'),
    }).refine(val => platformTypeOptions.includes(val as typeof platformTypeOptions[number]), {
      message: t('form_validation.platform_type_invalid'),
    }),
  });
  
  type FormValues = z.infer<typeof FormSchema>;


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

      if (formCardRef.current) {
        gsap.fromTo(
          formCardRef.current,
          { opacity: 0, x: -50, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.0,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: formCardRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
              once: true,
            },
            delay: 0.2,
          }
        );
      }

      if (adviceCardRef.current) {
         gsap.fromTo(
          adviceCardRef.current,
          { opacity: 0, x: 50, scale: 0.98 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.0,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: adviceCardRef.current,
              start: 'top 80%',
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
        title: t('toast_success_title'),
        description: t('toast_success_description'),
        variant: "default",
      });
    } catch (error) {
      console.error('Error fetching AI advice:', error);
      setAdvice(t('toast_error_description')); // Using description for error message display
       toast({
        title: t('toast_error_title'),
        description: t('toast_error_description'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-advisor" className="bg-gradient-to-b from-background to-background/90 backdrop-blur-sm py-24 md:py-32" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
            {t('title_prefix')} <span className="highlight-text-accent">{t('title_highlight')}</span>
          </h2>
          <p ref={paragraphRef} className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-16 md:mb-20">
            {t('subheading')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div ref={formCardRef}>
            <Card className="shadow-lg border border-border/20 highlight-border-primary hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                  <Sparkles className="w-5 h-5 text-primary" />
                  {t('form_card_title')}
                </CardTitle>
                <CardDescription>
                  {t('form_card_description')}
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6 pt-4">
                  <div>
                    <Label className="text-base font-semibold mb-3 block text-foreground/90">{t('services_needed_label')}</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
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
                                  const currentValues = field.value || [];
                                  return checked
                                    ? field.onChange([...currentValues, service.label])
                                    : field.onChange(
                                        currentValues.filter(
                                          (value) => value !== service.label
                                        )
                                      );
                                }}
                                aria-labelledby={`${service.id}-label`}
                              />
                              <Label htmlFor={service.id} id={`${service.id}-label`} className="font-normal text-sm text-foreground/90 cursor-pointer">
                                {service.label}
                              </Label>
                            </div>
                          )}
                        />
                      ))}
                    </div>
                    {errors.servicesNeeded && (
                      <p className="text-sm text-destructive mt-2">{errors.servicesNeeded.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="platformType" className="text-base font-semibold mb-3 block text-foreground/90">{t('platform_type_label')}</Label>
                    <Controller
                      name="platformType"
                      control={control}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger id="platformType" className="w-full">
                            <SelectValue placeholder={t('platform_type_placeholder')} />
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
                      <p className="text-sm text-destructive mt-2">{errors.platformType.message}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <motion.div
                    whileHover={{ scale: 1.02, boxShadow: "0 0 12px hsla(var(--primary), 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300">
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="mr-2 h-4 w-4" />
                      )}
                      {t('cta_button')}
                    </Button>
                  </motion.div>
                </CardFooter>
              </form>
            </Card>
          </div>

          <div ref={adviceCardRef}>
            <Card className="min-h-[400px] shadow-lg border border-border/20 highlight-border-accent flex flex-col hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                  <Sparkles className="w-5 h-5 text-accent" />
                  {t('advice_card_title')}
                </CardTitle>
                <CardDescription>
                  {t('advice_card_description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow flex items-center justify-center p-6">
                {isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-2">
                    <Loader2 className="h-10 w-10 animate-spin text-accent" />
                    <p className="text-sm">{t('generating_strategy')}</p>
                  </div>
                )}
                {!isLoading && advice && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="prose prose-sm dark:prose-invert max-w-none p-4 bg-background/50 rounded-md max-h-[350px] overflow-y-auto w-full"
                  >
                    {advice.split('\n').map((line, index) => (
                        <p key={index} className="mb-2 last:mb-0">{line || '\u00A0'}</p>
                    ))}
                  </motion.div>
                )}
                {!isLoading && !advice && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center space-y-3">
                    <Sparkles className="h-12 w-12 text-accent/40" />
                    <p className="text-sm">{t('strategy_placeholder')}</p>
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
