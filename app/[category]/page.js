import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import CategoryPageClient from './CategoryPageClient';
import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const supabase = createServerSupabaseClient();
  const { data: category } = await supabase.from('categories').select('name, description').eq('slug', params.category).single();
  if (!category) return { title: 'Not Found | Party Hub' };
  
  return {
    title: `${category.name} Decorations | Party Hub Bangalore`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }) {
  const supabase = createServerSupabaseClient();
  
  // Fetch current category
  const { data: currentCategory, error: catError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.category)
    .single();

  if (catError || !currentCategory) {
    notFound();
  }

  // Fetch ALL categories
  const { data: allCategories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  // Fetch ALL subcategories for all categories
  const { data: allSubcategories } = await supabase
    .from('subcategories')
    .select('*')
    .order('sort_order', { ascending: true });

  // Group subcategories by category_id
  const categoriesWithSubcategories = allCategories.map(cat => ({
    ...cat,
    subcategories: allSubcategories.filter(sub => sub.category_id === cat.id)
  }));

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-coral-500/5 blur-[100px] rounded-full w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {currentCategory.icon && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-800 border border-white/10 text-3xl mb-6">
              {currentCategory.icon}
            </div>
          )}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            {currentCategory.name} <span className="italic text-coral-400">Decorations</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            {currentCategory.description}
          </p>
        </div>
      </section>

      {/* Subcategories with continuation */}
      <CategoryPageClient 
        categories={categoriesWithSubcategories} 
        currentCategory={currentCategory} 
      />

      <Footer />
    </div>
  );
}
