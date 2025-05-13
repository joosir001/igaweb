'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useScopedI18n, useCurrentLocale } from '@/i18n/client';

export default function PrivacyPolicyPage() {
  const t = useScopedI18n('privacy_policy_page');
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

            <p>{t('intro')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('info_collection_title')}</h2>
            <p>{t('info_collection_para')}</p>

            <h3 className="text-xl font-semibold !mt-6 !mb-3">{t('types_of_data_title')}</h3>
            <h4 className="!text-lg !font-semibold !mt-4 !mb-2">{t('personal_data_title')}</h4>
            <p>{t('personal_data_para')}</p>
            <ul>
              <li>{t('personal_data_list.email')}</li>
              <li>{t('personal_data_list.name')}</li>
              <li>{t('personal_data_list.phone')}</li>
              <li>{t('personal_data_list.company')}</li>
              <li>{t('personal_data_list.cookies')}</li>
            </ul>

            <h4 className="!text-lg !font-semibold !mt-4 !mb-2">{t('usage_data_title')}</h4>
            <p>{t('usage_data_para')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('use_of_data_title')}</h2>
            <p>{t('use_of_data_para')}</p>
            <ul>
              <li>{t('use_of_data_list.provide_maintain')}</li>
              <li>{t('use_of_data_list.notify_changes')}</li>
              <li>{t('use_of_data_list.interactive_features')}</li>
              <li>{t('use_of_data_list.customer_support')}</li>
              <li>{t('use_of_data_list.gather_analysis')}</li>
              <li>{t('use_of_data_list.monitor_usage')}</li>
              <li>{t('use_of_data_list.technical_issues')}</li>
            </ul>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('security_title')}</h2>
            <p>{t('security_para')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('changes_title')}</h2>
            <p>{t('changes_para')}</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">{t('contact_title')}</h2>
            <p>{t('contact_para')}</p>
            <ul>
              <li><a href="mailto:privacy@igamx.dev">{t('contact_email')}</a></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
