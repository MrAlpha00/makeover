import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import WhatsAppButton from '../../../components/WhatsAppButton';
import SubcategoryClient from './SubcategoryClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const supabase = createServerSupabaseClient();
  const { data: subcategory } = await supabase.from('subcategories').select('name, description').eq('slug', params.subcategory).single();
  
  if (!subcategory) return { title: 'Not Found | Party Hub' };
  
  return {
    title: `${subcategory.name} | Party Hub Bangalore`,
    description: subcategory.description,
  };
}

export default async function SubcategoryPage({ params }) {
  const supabase = createServerSupabaseClient();
  
  const { category: catSlug, subcategory: subSlug } = params;

  // Fetch current category
  const { data: currentCategory } = await supabase.from('categories').select('*').eq('slug', catSlug).single();
  // Fetch current subcategory
  const { data: currentSubcategory } = await supabase.from('subcategories').select('*').eq('slug', subSlug).single();

  if (!currentCategory || !currentSubcategory) {
    notFound();
  }

  // Fetch ALL subcategories with their category info
  const { data: allSubcategories } = await supabase
    .from('subcategories')
    .select('*, categories(id, name, slug, icon)')
    .order('sort_order', { ascending: true });

  // Fetch ALL designs from ALL subcategories
  const { data: allDesigns } = await supabase
    .from('designs')
    .select('*')
    .order('created_at', { ascending: false });

  // Group designs by subcategory_id
  const designsBySubcategory = {};
  if (allDesigns) {
    allDesigns.forEach(design => {
      if (!designsBySubcategory[design.subcategory_id]) {
        designsBySubcategory[design.subcategory_id] = [];
      }
      designsBySubcategory[design.subcategory_id].push(design);
    });
  }

  // Group subcategories by category and create ordered list starting from current
  const categoriesMap = {};
  allSubcategories.forEach(sub => {
    const catId = sub.categories.id;
    if (!categoriesMap[catId]) {
      categoriesMap[catId] = {
        id: catId,
        name: sub.categories.name,
        slug: sub.categories.slug,
        icon: sub.categories.icon,
        subcategories: []
      };
    }
    categoriesMap[catId].subcategories.push({
      id: sub.id,
      name: sub.name,
      slug: sub.slug,
      image_url: sub.image_url,
      description: sub.description,
      designs: designsBySubcategory[sub.id] || []
    });
  });

  const orderedCategories = Object.values(categoriesMap);
  const currentCatIndex = orderedCategories.findIndex(c => c.id === currentCategory.id);
  const reorderedCategories = [
    ...orderedCategories.slice(currentCatIndex),
    ...orderedCategories.slice(0, currentCatIndex)
  ];

  return (
    <div className="min-h-screen bg-dark-900 relative">
      <Navbar />
      <WhatsAppButton />
      
      <SubcategoryClient 
        categories={reorderedCategories} 
        currentCategory={currentCategory}
        currentSubcategory={currentSubcategory}
      />

      <Footer />
    </div>
  );
}
