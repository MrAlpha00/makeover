import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';
import DesignsClient from './DesignsClient';

export const metadata = {
  title: 'Manage Designs | Admin',
};

export default async function DesignsPage() {
  const supabase = createServerSupabaseClient();

  const { data: designs } = await supabase
    .from('designs')
    .select('*, categories(name), subcategories(name)')
    .order('created_at', { ascending: false });

  const { data: categories } = await supabase.from('categories').select('id, name');
  const { data: subcategories } = await supabase.from('subcategories').select('id, name, category_id');

  return (
    <div className="max-w-7xl mx-auto">
      <DesignsClient 
        initialDesigns={designs || []} 
        categories={categories || []}
        subcategories={subcategories || []}
      />
    </div>
  );
}
