'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';

export default function CategoryClient({ initialCategories }) {
  const supabase = createClient();
  const [categories, setCategories] = useState(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    icon: '',
    description: '',
    image_url: ''
  });
  const [file, setFile] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        icon: category.icon || '',
        description: category.description || '',
        image_url: category.image_url || ''
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', slug: '', icon: '', description: '', image_url: '' });
    }
    setFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    if (!editingCategory) {
      // Auto-generate slug only for new categories
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, name, slug });
    } else {
      setFormData({ ...formData, name });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalImageUrl = formData.image_url;

      // Handle file upload
      if (file) {
        let fileToUpload = file;
        try {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1200,
            useWebWorker: true,
          };
          fileToUpload = await imageCompression(file, options);
        } catch (compressionError) {
          console.error("Image compression error:", compressionError);
        }
        
        const fileExt = fileToUpload.name.split('.').pop() || 'jpg';
        const fileName = `categories/${formData.slug}-${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('designs')
          .upload(fileName, fileToUpload, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('designs').getPublicUrl(fileName);
        finalImageUrl = publicUrl;
      }

      const payload = {
        name: formData.name,
        slug: formData.slug,
        icon: formData.icon,
        description: formData.description,
        image_url: finalImageUrl
      };

      if (editingCategory) {
        const { data, error } = await supabase
          .from('categories')
          .update(payload)
          .eq('id', editingCategory.id)
          .select()
          .single();
          
        if (error) throw error;
        setCategories(categories.map(c => c.id === data.id ? data : c));
        showToast('Category updated successfully');
      } else {
        const { data, error } = await supabase
          .from('categories')
          .insert([{ ...payload, sort_order: categories.length }])
          .select()
          .single();
          
        if (error) throw error;
        setCategories([...categories, data]);
        showToast('Category created successfully');
      }

      closeModal();
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category? This will cascade delete subcategories and designs!')) return;
    
    try {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
      
      setCategories(categories.filter(c => c.id !== id));
      showToast('Category deleted', 'error');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleReorder = async (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === categories.length - 1) return;

    const newCategories = [...categories];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap
    const temp = newCategories[index];
    newCategories[index] = newCategories[targetIndex];
    newCategories[targetIndex] = temp;

    // Update state immediately for UX
    setCategories(newCategories);

    // Update DB
    try {
      await Promise.all([
        supabase.from('categories').update({ sort_order: targetIndex }).eq('id', newCategories[targetIndex].id),
        supabase.from('categories').update({ sort_order: index }).eq('id', newCategories[index].id)
      ]);
      showToast('Order updated');
    } catch (error) {
      console.error('Reorder error', error);
      // Revert on error
      setCategories(categories);
      showToast('Failed to reorder', 'error');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 text-sm mt-1">Manage main event categories</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="btn bg-coral-500 hover:bg-coral-600 text-white font-medium py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium z-50 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-sm font-medium border-b border-gray-100">
              <th className="p-4 pl-6 w-20">Order</th>
              <th className="p-4 w-24">Image</th>
              <th className="p-4">Name & Slug</th>
              <th className="p-4">Description</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors text-sm">
                <td className="p-4 pl-6">
                  <div className="flex flex-col gap-1 items-center justify-center">
                    <button disabled={index === 0} onClick={() => handleReorder(index, 'up')} className="text-gray-400 hover:text-gray-700 disabled:opacity-30"><ArrowUp size={14}/></button>
                    <span className="font-mono text-xs">{cat.sort_order}</span>
                    <button disabled={index === categories.length - 1} onClick={() => handleReorder(index, 'down')} className="text-gray-400 hover:text-gray-700 disabled:opacity-30"><ArrowDown size={14}/></button>
                  </div>
                </td>
                <td className="p-4">
                  {cat.image_url ? (
                    <div className="w-12 h-12 rounded-lg relative overflow-hidden bg-gray-100 border border-gray-200">
                      <Image src={cat.image_url} alt={cat.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                      <ImageIcon size={20} />
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <div className="font-bold text-gray-900 flex items-center gap-2">
                    {cat.icon && <span>{cat.icon}</span>}
                    {cat.name}
                  </div>
                  <div className="text-gray-400 text-xs font-mono mt-0.5">/{cat.slug}</div>
                </td>
                <td className="p-4 text-gray-500 max-w-xs truncate">
                  {cat.description || '-'}
                </td>
                <td className="p-4 pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openModal(cat)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                      <Edit2 size={15} />
                    </button>
                    <button onClick={() => handleDelete(cat.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">{editingCategory ? 'Edit Category' : 'New Category'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-700">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" required value={formData.name} onChange={handleNameChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none" />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Icon (Emoji)</label>
                  <input type="text" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none text-center" placeholder="🎂" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none font-mono text-sm bg-gray-50" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Banner</label>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-coral-50 file:text-coral-600 hover:file:bg-coral-100" />
                {formData.image_url && !file && (
                  <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Image already explicitly set
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={closeModal} className="px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2 text-sm font-medium text-white bg-coral-500 hover:bg-coral-600 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-70">
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
