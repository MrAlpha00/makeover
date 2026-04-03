import { createServerSupabaseClient } from '../../../../../lib/supabase';
import CategoryClient from './CategoryClient';

export const metadata = {
  title: 'Manage Categories | Admin',
};

export default async function CategoriesPage() {
  const supabase = createServerSupabaseClient();
  
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div className="max-w-6xl mx-auto">
      <CategoryClient initialCategories={categories || []} />
    </div>
  );
}
