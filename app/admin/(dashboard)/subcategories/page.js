import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';
import SubcategoryClient from './SubcategoryClient';

export const metadata = {
  title: 'Manage Subcategories | Admin',
};

export default async function SubcategoriesPage() {
  const supabase = createServerSupabaseClient();
  
  // Fetch subcategories with their parent category name
  const { data: subcategories } = await supabase
    .from('subcategories')
    .select('*, categories(name)')
    .order('sort_order', { ascending: true });

  // Fetch categories for the dropdown
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('sort_order', { ascending: true });

  return (
    <div className="max-w-6xl mx-auto">
      <SubcategoryClient 
        initialSubcategories={subcategories || []} 
        categories={categories || []} 
      />
    </div>
  );
}
