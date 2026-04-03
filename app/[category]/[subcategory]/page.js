import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import WhatsAppButton from '../../../components/WhatsAppButton';
import SubcategoryClient from './SubcategoryClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const supabase = createServerSupabaseClient();
  const { data: subcategory } = await supabase.from('subcategories').select('name, description').eq('slug', params.subcategory).single();
  
  if (!subcategory) return { title: 'Not Found | SLV Events' };
  
  return {
    title: `${subcategory.name} | SLV Events Bangalore`,
    description: subcategory.description,
  };
}

export default async function SubcategoryPage({ params }) {
  const supabase = createServerSupabaseClient();
  
  const { category: catSlug, subcategory: subSlug } = params;

  // Fetch Category
  const { data: category } = await supabase.from('categories').select('*').eq('slug', catSlug).single();
  // Fetch Subcategory
  const { data: subcategory } = await supabase.from('subcategories').select('*').eq('slug', subSlug).single();

  if (!category || !subcategory) {
    notFound();
  }

  // Fetch Designs
  const { data: designs } = await supabase
    .from('designs')
    .select('*')
    .eq('subcategory_id', subcategory.id);

  return (
    <div className="min-h-screen bg-dark-900 relative">
      <Navbar />
      <WhatsAppButton />
      
      <SubcategoryClient 
        category={category} 
        subcategory={subcategory} 
        designs={designs || []} 
      />

      <Footer />
    </div>
  );
}
