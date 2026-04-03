import { createServerSupabaseClient } from '../../../lib/supabase';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import WhatsAppButton from '../../../components/WhatsAppButton';
import ServiceDetailClient from './ServiceDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const supabase = createServerSupabaseClient();
  const { data: service } = await supabase.from('designs').select('title, short_desc').eq('slug', params.slug).single();
  
  if (!service) return { title: 'Not Found | SLV Events' };
  
  return {
    title: `${service.title} | SLV Events Bangalore`,
    description: service.short_desc,
  };
}

export default async function ServiceDetailPage({ params }) {
  const supabase = createServerSupabaseClient();
  
  // Fetch service
  const { data: service, error } = await supabase
    .from('designs')
    .select('*, categories(name)')
    .eq('slug', params.slug)
    .single();

  if (error || !service) {
    notFound();
  }

  // Fetch related and also booked
  const [relatedRes, alsoBookedRes] = await Promise.all([
    supabase
      .from('designs')
      .select('*, categories(name)')
      .eq('category_id', service.category_id)
      .neq('id', service.id)
      .limit(4),
    supabase
      .from('designs')
      .select('*, categories(name)')
      .neq('category_id', service.category_id)
      .limit(4)
  ]);

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />
      <ServiceDetailClient 
        service={service} 
        related={relatedRes.data || []} 
        alsoBooked={alsoBookedRes.data || []} 
      />
      <Footer />
    </div>
  );
}
