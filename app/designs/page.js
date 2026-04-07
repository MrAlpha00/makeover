import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import DesignsClient from './DesignsClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Explore Designs | Party Hub Bangalore',
  description: 'Browse our complete gallery of event decoration designs. View photos, prices, and book your favorite setup for birthday, anniversary, and more.',
};

export default async function DesignsPage() {
  const supabase = createServerSupabaseClient();
  
  const { data: designs } = await supabase
    .from('designs')
    .select('*, categories(name, icon)')
    .order('created_at', { ascending: false });

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />
      
      {/* Header */}
      <section className="pt-28 pb-8 max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-2">Gallery</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
          Explore <span className="italic text-coral-400">Designs</span>
        </h1>
        <p className="text-white/40 text-lg max-w-2xl">
          Browse our complete collection of decoration designs. Tap any design to view full details, pricing, and book instantly.
        </p>
      </section>

      <Suspense fallback={<div className="pt-40 text-center text-white/30">Loading designs...</div>}>
        <DesignsClient designs={designs || []} categories={categories || []} />
      </Suspense>

      <Footer />
    </div>
  );
}
