
"use client";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PrivacyPolicyPage() {
  const [lastUpdatedDate, setLastUpdatedDate] = useState('');

  useEffect(() => {
    // This check ensures the code only runs on the client side
    if (typeof window !== 'undefined') {
       setLastUpdatedDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })); // Format date
    }
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 md:pt-40"> {/* Added more top padding */}
        <div className="max-w-3xl mx-auto">
          <Button variant="outline" size="sm" asChild className="mb-8 group border-primary/50 text-primary/90 hover:bg-primary/10 hover:text-primary">
            <Link href="/">
              <span className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" /> Back to Home
              </span>
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-bold highlight-text-primary mb-8">Privacy Policy</h1>

          <div className="prose dark:prose-invert max-w-none space-y-6"> {/* Removed prose-lg for default sizing */}
             <p className="text-sm text-muted-foreground"><strong>Last Updated: {lastUpdatedDate || 'Loading...'}</strong></p>

            <p>iGamX ("us", "we", or "our") operates the iGamX website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</p> {/* Updated Company Name */}

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">Information Collection and Use</h2> {/* Added highlight and spacing */}
            <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>

            <h3 className="text-xl font-semibold !mt-6 !mb-3">Types of Data Collected</h3> {/* Added spacing */}
            <h4 className="!text-lg !font-semibold !mt-4 !mb-2">Personal Data</h4> {/* Adjusted heading level and style */}
            <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</p>
            <ul>
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Company Name</li>
              <li>Cookies and Usage Data</li>
            </ul>

            <h4 className="!text-lg !font-semibold !mt-4 !mb-2">Usage Data</h4>
            <p>We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">Use of Data</h2>
            <p>iGamX uses the collected data for various purposes:</p> {/* Updated Company Name */}
            <ul>
              <li>To provide and maintain our Service</li>
              <li>To notify you about changes to our Service</li>
              <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
              <li>To provide customer support</li>
              <li>To gather analysis or valuable information so that we can improve our Service</li>
              <li>To monitor the usage of our Service</li>
              <li>To detect, prevent and address technical issues</li>
            </ul>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">Security of Data</h2>
            <p>The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>

            <h2 className="text-2xl font-semibold highlight-text-accent !mt-10 !mb-4">Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us:</p>
            <ul>
              <li>By email: <a href="mailto:privacy@igamx.dev">privacy@igamx.dev</a></li> {/* Updated email */}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
