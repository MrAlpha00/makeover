import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import ServicesClient from './ServicesClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'All Services | SLV Events Bangalore',
  description: 'Browse our complete catalog of event decorations in Bangalore.',
};

export default async function ServicesPage() {
  const supabase = createServerSupabaseClient();
  
  // Fetch all designs
  const { data: designs } = await supabase
    .from('designs')
    .select('*, categories(name)')
    .order('created_at', { ascending: false });

  // Fetch all categories for the filter tabs
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />
      
      {/* Header */}
      <section className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-2">SLV Events, Bangalore</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
          Our <span className="italic text-coral-400">Services</span>
        </h1>
        <p className="text-white/40 text-lg">Handcrafted decorations for every occasion in Bangalore.</p>
      </section>

      <Suspense fallback={<div className="pt-40 text-center text-white/30">Loading services...</div>}>
        <ServicesClient initialDesigns={designs || []} parentCategories={categories || []} />
      </Suspense>

      <Footer />
    </div>
  );
}
