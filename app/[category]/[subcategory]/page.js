import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import WhatsAppButton from '../../../components/WhatsAppButton';
import SubcategoryClient from './SubcategoryClient';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const supabase = createServerSupabaseClient();
  
  const { data: category } = await supabase.from('categories').select('name, slug').eq('slug', params.category).single();
  const { data: subcategory } = await supabase.from('subcategories').select('name, description, slug').eq('slug', params.subcategory).single();
  
  if (!subcategory || !category) return { title: 'Not Found | Party Hub' };
  
  const title = `${subcategory.name} in Bangalore | Party Hub | Book Now`;
  const description = `${subcategory.description} Book now with Party Hub in Bangalore. Same-day decoration service available. Call +91-63668 83984!`;
  
  return {
    title,
    description,
    keywords: [
      `${subcategory.name.toLowerCase()} bangalore`,
      `${subcategory.name.toLowerCase()} decoration`,
      `${category.name.toLowerCase()} ${subcategory.name.toLowerCase()}`,
      'party decoration bangalore',
      'event decorators bangalore',
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://partyhubs.in/${params.category}/${params.subcategory}`,
    },
  };
}

export default async function SubcategoryPage({ params }) {
  const supabase = createServerSupabaseClient();
  
  const { category: catSlug, subcategory: subSlug } = params;

  const { data: currentCategory } = await supabase.from('categories').select('*').eq('slug', catSlug).single();
  const { data: currentSubcategory } = await supabase.from('subcategories').select('*').eq('slug', subSlug).single();

  if (!currentCategory || !currentSubcategory) {
    notFound();
  }

  const { data: allSubcategories } = await supabase
    .from('subcategories')
    .select('*, categories(id, name, slug, icon)')
    .order('sort_order', { ascending: true });

  const { data: allDesigns } = await supabase
    .from('designs')
    .select('*')
    .order('created_at', { ascending: false });

  const designsBySubcategory = {};
  if (allDesigns) {
    allDesigns.forEach(design => {
      if (!designsBySubcategory[design.subcategory_id]) {
        designsBySubcategory[design.subcategory_id] = [];
      }
      designsBySubcategory[design.subcategory_id].push(design);
    });
  }

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
