import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import BookingForm from './BookingForm';
import { Suspense } from 'react';
import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';

export const metadata = {
  title: 'Book a Decoration | SLV Events Bangalore',
  description: 'Book your event decoration in Bangalore in under 2 minutes.',
};

export default async function BookingPage() {
  const supabase = createServerSupabaseClient();
  const { data: designs } = await supabase.from('designs').select('id, slug, title').order('title', { ascending: true });

  return (
    <div className="min-h-screen bg-light-primary dark:bg-dark-900">
      <Navbar />
      <WhatsAppButton />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="text-center mb-10">
          <span className="badge mb-4">Book in 2 minutes</span>
          <h1 className="font-display text-4xl font-bold text-light-text-primary dark:text-white mb-3">
            Let's plan your <span className="italic text-coral-400">celebration</span>
          </h1>
          <p className="text-light-text-secondary dark:text-white/40">Fill in the details below and our team will call you to confirm.</p>
        </div>
        <div className="card-light dark:card-dark p-6 sm:p-8">
          <Suspense fallback={<div className="text-light-text-secondary dark:text-white/30 text-sm">Loading form...</div>}>
            <BookingForm designs={designs || []} />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}
