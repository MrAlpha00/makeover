import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import WhatsAppButton from '../../../components/WhatsAppButton';
import ServiceDetailClient from './ServiceDetailClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const supabase = createServerSupabaseClient();
  const { data: service } = await supabase
    .from('designs')
    .select('title, short_desc, price, category_slug, subcategory_slug, images')
    .eq('slug', params.slug)
    .single();
  
  if (!service) return { title: 'Not Found | Party Hub' };
  
  const priceText = service.price ? `₹${service.price.toLocaleString()}` : '';
  const title = `${service.title} in Bangalore | Party Hub${priceText ? ` | Starting ${priceText}` : ''}`;
  const description = service.short_desc || `${service.title} decoration in Bangalore by Party Hub. Book now for same-day service. Call +91-63668 83984!`;
  
  return {
    title,
    description,
    keywords: [
      service.title.toLowerCase(),
      `${service.title.toLowerCase()} bangalore`,
      'party decoration bangalore',
      'event decorators bangalore',
      'birthday decoration bangalore',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_IN',
      images: service.images?.[0] ? [{ url: service.images[0], width: 1200, height: 630, alt: service.title }] : [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://partyhubs.in/services/${params.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const supabase = createServerSupabaseClient();
  
  const { data: service, error } = await supabase
    .from('designs')
    .select('*, categories(name, slug)')
    .eq('slug', params.slug)
    .single();

  if (error || !service) {
    notFound();
  }

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
