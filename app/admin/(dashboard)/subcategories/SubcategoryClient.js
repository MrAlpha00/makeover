'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import WatermarkedImage from '@/components/WatermarkedImage';
import imageCompression from 'browser-image-compression';

export default function SubcategoryClient({ initialSubcategories, categories }) {

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
        const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (!validTypes.includes(file.type)) {
          throw new Error('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new Error('Image size must be less than 5MB');
        }

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

        if (editingSub?.image_url && editingSub.image_url !== finalImageUrl) {
          const oldFileName = editingSub.image_url.split('/storage/v1/object/public/designs/')[1];
          if (oldFileName) {
            await supabase.storage.from('designs').remove([oldFileName]);
          }
        }
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Subcategories</h1>
          <p className="text-white/50 text-sm mt-1">Manage themes within categories</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-dark-800 border border-white/10 rounded-xl text-sm text-white outline-none focus:border-coral-500 transition-colors w-1/2 sm:w-auto"
          >
            <option value="All" className="bg-dark-800">All</option>
            {categories.map(c => (
              <option key={c.id} value={c.id} className="bg-dark-800">{c.name}</option>
            ))}
          </select>
          <button 
            onClick={() => openModal()}
            className="btn bg-coral-500 hover:bg-coral-600 text-white font-medium py-2 px-3 sm:px-4 rounded-xl shadow-sm transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={16} /> <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium z-50 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}

      <div className="bg-dark-700 rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-white/50 text-xs sm:text-sm font-medium border-b border-white/5">
                <th className="p-3 sm:p-4 pl-4 sm:pl-6 w-16 sm:w-20">Order</th>
                <th className="p-3 sm:p-4 w-14 sm:w-16">Img</th>
                <th className="p-3 sm:p-4">Name & Slug</th>
                <th className="p-3 sm:p-4 hidden md:table-cell">Category</th>
                <th className="p-3 sm:p-4 pr-4 sm:pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedSubs.map((sub, index) => (
                <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5 transition-colors text-sm">
                  <td className="p-3 sm:p-4 pl-4 sm:pl-6">
                    <div className="flex flex-col gap-0.5 items-center justify-center">
                      <button disabled={index === 0} onClick={() => handleReorder(sub.id, 'up')} className="text-white/40 hover:text-white disabled:opacity-30"><ArrowUp size={14}/></button>
                      <span className="font-mono text-xs text-white/50">{sub.sort_order}</span>
                      <button disabled={index === displayedSubs.length - 1} onClick={() => handleReorder(sub.id, 'down')} className="text-white/40 hover:text-white disabled:opacity-30"><ArrowDown size={14}/></button>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4">
                    {sub.image_url ? (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg relative overflow-hidden">
                        <WatermarkedImage src={sub.image_url} alt={sub.name} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white/5 flex items-center justify-center text-white/30">
                        <ImageIcon size={18} className="sm:w-5 sm:h-5" />
                      </div>
                    )}
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="font-bold text-white truncate max-w-[80px] sm:max-w-[150px]">{sub.name}</div>
                    <div className="text-white/40 text-xs font-mono mt-0.5 truncate max-w-[80px] sm:max-w-[150px]">/{sub.slug}</div>
                  </td>
                  <td className="p-3 sm:p-4 text-white/60 hidden md:table-cell">
                    <span className="bg-white/5 px-2.5 py-1 rounded-md text-xs font-medium border border-white/10">
                      {sub.categories?.name || 'Unknown'}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4 pr-4 sm:pr-6">
                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                      <button onClick={() => openModal(sub)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => handleDelete(sub.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {displayedSubs.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-white/30">No subcategories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-dark-700 rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-white/10">
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-base sm:text-lg font-bold text-white">{editingSub ? 'Edit Subcategory' : 'New Subcategory'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white transition-colors">&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Name</label>
                  <input type="text" required value={formData.name} onChange={handleNameChange} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white focus:border-coral-500 outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Parent Category</label>
                  <select required value={formData.category_id} onChange={(e) => setFormData({...formData, category_id: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white focus:border-coral-500 outline-none transition-colors">
                    <option value="" disabled className="bg-dark-800">Select Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id} className="bg-dark-800">{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Slug</label>
                <input type="text" required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white font-mono text-sm focus:border-coral-500 outline-none transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Description</label>
                <textarea rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 rounded-lg bg-dark-800 border border-white/10 text-white focus:border-coral-500 outline-none transition-colors resize-none"></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Thumbnail</label>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className="w-full text-sm text-white/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-coral-500 file:text-white hover:file:bg-coral-600" />
                {formData.image_url && !file && (
                  <div className="mt-2 text-xs text-green-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Image already set
                  </div>
                )}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/5 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="px-5 py-2 text-sm font-medium text-white bg-coral-500 hover:bg-coral-600 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70">
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
