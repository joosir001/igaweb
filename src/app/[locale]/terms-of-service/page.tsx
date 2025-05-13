'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useScopedI18n, useCurrentLocale } from '@/i18n/client';

export default function TermsOfServicePage() {
  const t = useScopedI18n('terms_of_service_page');
  const currentLocale = useCurrentLocale();
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

   useEffect(() => {
    if (typeof window !== 'undefined') {
      setLastUpdatedDate(new Date().toLocaleDateString(currentLocale, { year: 'numeric', month: 'long', day: 'numeric' }));
    }
  }, [currentLocale]);


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 md:pt-40">
        <div className="max-w-3xl mx-auto">
           <Button variant="outline" size="sm" asChild className="mb-8 group border-primary/50 text-primary/90 hover:bg-primary/10 hover:text-primary">
            <Link href={`/${currentLocale}`}>
              <span className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" /> {t('back_to_home')}
              </span>
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold highlight-text-primary mb-8">{t('title')}</h1>

          <div className="prose dark:prose-invert max-w-none space-y-6">
             <p className="text-sm text-muted-foreground"><strong>{t('last_updated', { date: lastUpdatedDate || 'Loading...' })}</strong></p>

            <p>{t('intro1')}</p>
            <p>{t('intro2')}</p>
            <p>{t('intro3')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('accounts_title')}</h2>
            <p>{t('accounts_para1')}</p>
            <p>{t('accounts_para2')}</p>
            <p>{t('accounts_para3')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('ip_title')}</h2>
            <p>{t('ip_para')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('links_title')}</h2>
            <p>{t('links_para1')}</p>
            <p>{t('links_para2')}</p>
            <p>{t('links_para3')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('termination_title')}</h2>
            <p>{t('termination_para1')}</p>
            <p>{t('termination_para2')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('liability_title')}</h2>
            <p>{t('liability_para')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('disclaimer_title')}</h2>
            <p>{t('disclaimer_para1')}</p>
            <p>{t('disclaimer_para2')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('governing_law_title')}</h2>
            <p>{t('governing_law_para1')}</p>
            <p>{t('governing_law_para2')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('changes_title')}</h2>
            <p>{t('changes_para1')}</p>
            <p>{t('changes_para2')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('contact_title')}</h2>
            <p>{t('contact_para')}</p>
            <ul>
              <li><a href="mailto:legal@igamx.dev">{t('contact_email')}</a></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
