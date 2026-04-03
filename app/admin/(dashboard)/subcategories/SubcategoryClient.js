'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';

export default function SubcategoryClient({ initialSubcategories, categories }) {
  const supabase = createClient();
  const [subcategories, setSubcategories] = useState(initialSubcategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [filterCategory, setFilterCategory] = useState('All');

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category_id: '',
    description: '',
    image_url: ''
  });
  const [file, setFile] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openModal = (sub = null) => {
    if (sub) {
      setEditingSub(sub);
      setFormData({
        name: sub.name,
        slug: sub.slug,
        category_id: sub.category_id,
        description: sub.description || '',
        image_url: sub.image_url || ''
      });
    } else {
      setEditingSub(null);
      setFormData({ 
        name: '', 
        slug: '', 
        category_id: filterCategory !== 'All' ? filterCategory : (categories[0]?.id || ''), 
        description: '', 
        image_url: '' 
      });
    }
    setFile(null);
    setIsModalOpen(true);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    if (!editingSub) {
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
        const fileName = `subcategories/${formData.slug}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from('designs')
          .upload(fileName, fileToUpload, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('designs').getPublicUrl(fileName);
        finalImageUrl = publicUrl;
      }

      const payload = {
        name: formData.name,
        slug: formData.slug,
        category_id: formData.category_id,
        description: formData.description,
        image_url: finalImageUrl
      };

      if (editingSub) {
        const { data, error } = await supabase
          .from('subcategories')
          .update(payload)
          .eq('id', editingSub.id)
          .select('*, categories(name)')
          .single();
          
        if (error) throw error;
        setSubcategories(subcategories.map(s => s.id === data.id ? data : s));
        showToast('Subcategory updated');
      } else {
        const { data, error } = await supabase
          .from('subcategories')
          .insert([{ ...payload, sort_order: subcategories.length }])
          .select('*, categories(name)')
          .single();
          
        if (error) throw error;
        setSubcategories([...subcategories, data]);
        showToast('Subcategory created');
      }

      setIsModalOpen(false);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this subcategory? All designs linking to it will be lost.')) return;
    try {
      const { error } = await supabase.from('subcategories').delete().eq('id', id);
      if (error) throw error;
      setSubcategories(subcategories.filter(s => s.id !== id));
      showToast('Deleted', 'error');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleReorder = async (subId, direction) => {
    // We only reorder among visible filtered subcategories logically, but wait, sort_order is global or per-category?
    // Usually it's simpler if sort_order is just global, but dragging inside a category implies scoping.
    // For simplicity, we just find the currentIndex in the filtered list.
    const filteredList = subcategories.filter(s => filterCategory === 'All' || s.category_id === filterCategory);
    const index = filteredList.findIndex(s => s.id === subId);
    
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === filteredList.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const targetItem = filteredList[targetIndex];
    const currentItem = filteredList[index];

    // Swap their sort functions
    const newSortCurrent = targetItem.sort_order;
    const newSortTarget = currentItem.sort_order;

    setSubcategories(prev => prev.map(s => {
      if (s.id === currentItem.id) return { ...s, sort_order: newSortCurrent };
      if (s.id === targetItem.id) return { ...s, sort_order: newSortTarget };
      return s;
    }).sort((a,b) => a.sort_order - b.sort_order));

    try {
      await Promise.all([
        supabase.from('subcategories').update({ sort_order: newSortCurrent }).eq('id', currentItem.id),
        supabase.from('subcategories').update({ sort_order: newSortTarget }).eq('id', targetItem.id)
      ]);
    } catch (err) {
      alert('Failed to reorder in DB');
    }
  };

  const displayedSubs = subcategories.filter(s => filterCategory === 'All' || s.category_id === filterCategory);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subcategories</h1>
          <p className="text-gray-500 text-sm mt-1">Manage themes within categories</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none w-full sm:w-auto"
          >
            <option value="All">All Categories</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button 
            onClick={() => openModal()}
            className="btn bg-coral-500 hover:bg-coral-600 text-white font-medium py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={16} /> Add Subcategory
          </button>
        </div>
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
              <th className="p-4">Parent Category</th>
              <th className="p-4 pr-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedSubs.map((sub, index) => (
              <tr key={sub.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors text-sm">
                <td className="p-4 pl-6">
                  <div className="flex flex-col gap-1 items-center justify-center">
                    <button disabled={index === 0} onClick={() => handleReorder(sub.id, 'up')} className="text-gray-400 hover:text-gray-700 disabled:opacity-30"><ArrowUp size={14}/></button>
                    <span className="font-mono text-xs">{sub.sort_order}</span>
                    <button disabled={index === displayedSubs.length - 1} onClick={() => handleReorder(sub.id, 'down')} className="text-gray-400 hover:text-gray-700 disabled:opacity-30"><ArrowDown size={14}/></button>
                  </div>
                </td>
                <td className="p-4">
                  {sub.image_url ? (
                    <div className="w-12 h-12 rounded-lg relative overflow-hidden bg-gray-100 border border-gray-200">
                      <Image src={sub.image_url} alt={sub.name} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                      <ImageIcon size={20} />
                    </div>
                  )}
                </td>
                <td className="p-4">
                  <div className="font-bold text-gray-900">{sub.name}</div>
                  <div className="text-gray-400 text-xs font-mono mt-0.5">/{sub.slug}</div>
                </td>
                <td className="p-4 text-gray-600">
                  <span className="bg-gray-100 px-2.5 py-1 rounded-md text-xs font-medium">
                    {sub.categories?.name || 'Unknown'}
                  </span>
                </td>
                <td className="p-4 pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openModal(sub)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                      <Edit2 size={15} />
                    </button>
                    <button onClick={() => handleDelete(sub.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {displayedSubs.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-400">No subcategories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">{editingSub ? 'Edit Subcategory' : 'New Subcategory'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-700">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input type="text" required value={formData.name} onChange={handleNameChange} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
                  <select required value={formData.category_id} onChange={(e) => setFormData({...formData, category_id: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none">
                    <option value="" disabled>Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail</label>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-coral-50 file:text-coral-600 hover:file:bg-coral-100" />
                {formData.image_url && !file && (
                  <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Image already explicitly set
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2 text-sm font-medium text-white bg-coral-500 hover:bg-coral-600 rounded-xl transition-colors flex items-center gap-2 disabled:opacity-70">
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save Subcategory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
