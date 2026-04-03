import { createServerSupabaseClient } from '../../../../../../../lib/supabase';
import DesignForm from '../../DesignForm';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Edit Design | Admin',
};

export default async function EditDesignPage({ params }) {
  const supabase = createServerSupabaseClient();
  const { id } = params;

  const { data: design, error } = await supabase
    .from('designs')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !design) {
    notFound();
  }

  const { data: categories } = await supabase.from('categories').select('id, name');
  const { data: subcategories } = await supabase.from('subcategories').select('id, name, category_id');

  return (
    <DesignForm 
      initialData={design}
      categories={categories || []} 
      subcategories={subcategories || []} 
    />
  );
}
