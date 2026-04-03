import { createServerSupabaseClient } from '../../../../../../lib/supabase';
import DesignForm from '../DesignForm';

export const metadata = {
  title: 'New Design | Admin',
};

export default async function NewDesignPage() {
  const supabase = createServerSupabaseClient();
  
  const { data: categories } = await supabase.from('categories').select('id, name');
  const { data: subcategories } = await supabase.from('subcategories').select('id, name, category_id');

  return (
    <DesignForm 
      categories={categories || []} 
      subcategories={subcategories || []} 
    />
  );
}
