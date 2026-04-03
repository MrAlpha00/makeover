'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../../lib/supabase';
import { Trash2, Plus, Image as ImageIcon, X, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function DesignForm({ initialData = null, categories = [], subcategories = [] }) {
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef(null);

  const isEdit = !!initialData;

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    category_id: initialData?.category_id || '',
    subcategory_id: initialData?.subcategory_id || '',
    price: initialData?.price || '',
    original_price: initialData?.original_price || '',
    short_desc: initialData?.short_desc || '',
    description: initialData?.description || '',
    inclusions: initialData?.inclusions || [],
    addons: initialData?.addons || [],
    tags: initialData?.tags || [],
    featured: initialData?.featured || false,
    rating: initialData?.rating || 4.9,
    reviews: initialData?.reviews || 20,
    images: initialData?.images || []
  });

  const [discount, setDiscount] = useState(initialData?.discount || 0);
  const [newFiles, setNewFiles] = useState([]); // File objects ready to push
  const [incInput, setIncInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState(null);

  // Auto calculate discount
  useEffect(() => {
    if (formData.original_price && formData.price) {
      if (Number(formData.original_price) > Number(formData.price)) {
        const d = Math.round(((formData.original_price - formData.price) / formData.original_price) * 100);
        setDiscount(d);
      } else {
        setDiscount(0);
      }
    } else {
      setDiscount(0);
    }
  }, [formData.original_price, formData.price]);

  const handleTitle = (e) => {
    const title = e.target.value;
    if (!isEdit) {
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, title, slug });
    } else {
      setFormData({ ...formData, title });
    }
  };

  const addInclusion = () => {
    if (!incInput.trim()) return;
    setFormData({ ...formData, inclusions: [...formData.inclusions, incInput.trim()] });
    setIncInput('');
  };

  const removeInclusion = (i) => {
    setFormData({ ...formData, inclusions: formData.inclusions.filter((_, idx) => idx !== i) });
  };

  const addAddon = () => {
    setFormData({ ...formData, addons: [...formData.addons, { id: Date.now().toString(), name: '', price: '' }] });
  };

  const updateAddon = (index, key, value) => {
    const updated = [...formData.addons];
    updated[index][key] = value;
    setFormData({ ...formData, addons: updated });
  };

  const removeAddon = (index) => {
    setFormData({ ...formData, addons: formData.addons.filter((_, idx) => idx !== index) });
  };

  const handleTagKeydown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (!tagInput.trim()) return;
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim().toLowerCase()] });
      setTagInput('');
    }
  };

  const removeTag = (i) => {
    setFormData({ ...formData, tags: formData.tags.filter((_, idx) => idx !== i) });
  };

  // Image Upload Logic
  const handleFileChange = (e) => {
    if (e.target.files) {
      setNewFiles([...newFiles, ...Array.from(e.target.files)]);
    }
  };

  const removeNewFile = (i) => {
    setNewFiles(newFiles.filter((_, idx) => idx !== i));
  };

  const removeExistingImage = (i) => {
    setFormData({ ...formData, images: formData.images.filter((_, idx) => idx !== i) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorText(null);

    try {
      // 1. Upload new files if any
      const uploadedUrls = [];
      for (const file of newFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${formData.slug}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('designs').upload(fileName, file);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('designs').getPublicUrl(fileName);
        uploadedUrls.push(publicUrl);
      }

      const finalImages = [...formData.images, ...uploadedUrls];

      // Prepare payload match Supabase schema
      const payload = {
        title: formData.title,
        slug: formData.slug,
        category_id: formData.category_id,
        subcategory_id: formData.subcategory_id,
        price: Number(formData.price),
        original_price: formData.original_price ? Number(formData.original_price) : null,
        discount: discount,
        short_desc: formData.short_desc,
        description: formData.description,
        inclusions: formData.inclusions,
        addons: formData.addons.map(a => ({ id: String(a.id), name: a.name, price: Number(a.price) })),
        tags: formData.tags,
        featured: formData.featured,
        rating: Number(formData.rating),
        reviews: Number(formData.reviews),
        images: finalImages
      };

      if (isEdit) {
        const { error } = await supabase.from('designs').update(payload).eq('id', initialData.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('designs').insert([payload]);
        if (error) throw error;
      }

      router.push('/admin/designs');
      router.refresh();
      
    } catch (err) {
      console.error(err);
      setErrorText(err.message || 'An error occurred during save.');
      setIsSubmitting(false);
    }
  };

  const filteredSubs = subcategories.filter(s => s.category_id === formData.category_id);

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/designs" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-sm border border-gray-100 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Design' : 'New Design'}</h1>
            <p className="text-gray-500 text-sm mt-1">Fill in the details below.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/designs" className="btn bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-6 rounded-xl shadow-sm border border-gray-200 transition-all flex items-center gap-2">
            Cancel
          </Link>
          <button type="submit" disabled={isSubmitting} className="btn bg-coral-500 hover:bg-coral-600 text-white font-medium py-2.5 px-6 rounded-xl shadow-sm transition-all flex items-center gap-2 disabled:opacity-70">
            {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Saving...</> : 'Save Design'}
          </button>
        </div>
      </div>

      {errorText && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 font-medium">
          {errorText}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input required type="text" value={formData.title} onChange={handleTitle} className="input-admin" placeholder="Premium Jungle Theme Decor" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input required type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} className="input-admin font-mono text-sm bg-gray-50" />
                <p className="text-xs text-gray-400 mt-1">Unique URL identifier. e.g. /services/premium-jungle</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select required value={formData.category_id} onChange={(e) => setFormData({...formData, category_id: e.target.value, subcategory_id: ''})} className="input-admin">
                    <option value="" disabled>Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory *</label>
                  <select required value={formData.subcategory_id} onChange={(e) => setFormData({...formData, subcategory_id: e.target.value})} className="input-admin" disabled={!formData.category_id}>
                    <option value="" disabled>Select Subcategory</option>
                    {filteredSubs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Short Description</label>
                  <span className={`text-xs ${formData.short_desc.length > 120 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>{formData.short_desc.length}/120</span>
                </div>
                <input type="text" maxLength={120} value={formData.short_desc} onChange={(e) => setFormData({...formData, short_desc: e.target.value})} className="input-admin" placeholder="Used in grid cards. E.g. A vibrant jungle theme with customized backdrop." />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
                <textarea rows={5} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="input-admin resize-y" placeholder="Full details visible on the service detail page..."></textarea>
              </div>
            </div>
          </div>

          {/* Pricing Config */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Pricing Details</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price (₹) *</label>
                <input required type="number" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="input-admin font-bold text-coral-500" placeholder="5000" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Original Price (₹)</label>
                  {discount > 0 && <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded">{discount}% OFF</span>}
                </div>
                <input type="number" value={formData.original_price} onChange={(e) => setFormData({...formData, original_price: e.target.value})} className="input-admin" placeholder="6500" />
              </div>
            </div>
          </div>

          {/* Galleries */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-3">Image Gallery</h2>
            
            <div 
              className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
              <div className="w-12 h-12 rounded-full bg-coral-50 text-coral-500 flex items-center justify-center mx-auto mb-3">
                <ImageIcon size={24} />
              </div>
              <p className="font-medium text-gray-900">Click or drag images to upload</p>
              <p className="text-sm text-gray-400 mt-1">JPEG, PNG, WEBP up to 5MB</p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {/* Existing Images */}
              {formData.images.map((url, i) => (
                <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-gray-200 group">
                  <Image src={url} alt={`img-${i}`} fill className="object-cover" />
                  <button type="button" onClick={() => removeExistingImage(i)} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <X size={12} />
                  </button>
                  {i === 0 && <span className="absolute bottom-2 left-2 bg-gray-900/80 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded backdrop-blur">Cover</span>}
                </div>
              ))}
              
              {/* New/Pending Uploads */}
              {newFiles.map((f, i) => {
                const objectUrl = URL.createObjectURL(f);
                return (
                  <div key={`new-${i}`} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-coral-200 ring-2 ring-coral-500/20 group">
                    <Image src={objectUrl} alt={`new-img-${i}`} fill className="object-cover" />
                    <button type="button" onClick={() => removeNewFile(i)} className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                      <X size={12} />
                    </button>
                    <span className="absolute bottom-2 left-2 bg-coral-500 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow">Pending</span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">

          {/* Inclusions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Inclusions</h2>
            <div className="flex gap-2 mb-4">
              <input type="text" value={incInput} onChange={(e) => setIncInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addInclusion())} className="input-admin text-sm flex-1" placeholder="Add an item..." />
              <button type="button" onClick={addInclusion} className="w-10 h-10 shrink-0 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors">
                <Plus size={18} />
              </button>
            </div>
            <ul className="space-y-2">
              {formData.inclusions.map((inc, i) => (
                <li key={i} className="flex items-center justify-between text-sm bg-gray-50 border border-gray-100 rounded-lg p-2.5">
                  <span className="text-gray-700">{inc}</span>
                  <button type="button" onClick={() => removeInclusion(i)} className="text-gray-400 hover:text-red-500">
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Add-ons */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Add-ons</h2>
            
            <div className="space-y-3 mb-4">
              {formData.addons.map((addon, index) => (
                <div key={addon.id || index} className="flex items-center gap-2 bg-gray-50 p-2 border border-gray-100 rounded-lg">
                  <input type="text" value={addon.name} onChange={(e) => updateAddon(index, 'name', e.target.value)} className="w-full bg-transparent border-0 outline-none text-sm px-1 placeholder-gray-400" placeholder="Add Name" />
                  <input type="number" value={addon.price} onChange={(e) => updateAddon(index, 'price', e.target.value)} className="w-20 shrink-0 bg-white border border-gray-200 rounded px-2 py-1 text-sm outline-none font-medium text-coral-500 placeholder-gray-300" placeholder="₹ Price" />
                  <button type="button" onClick={() => removeAddon(index)} className="p-1 text-gray-400 hover:text-red-500 shrink-0">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <button type="button" onClick={addAddon} className="w-full py-2 border border-dashed border-gray-300 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
              <Plus size={16} /> Add Add-on
            </button>
          </div>

          {/* Meta & Tags */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Metadata</h2>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium text-gray-700">Featured Design</span>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${formData.featured ? 'bg-coral-500' : 'bg-gray-200'}`} onClick={() => setFormData({...formData, featured: !formData.featured})}>
                    <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-transform ${formData.featured ? 'translate-x-6' : 'translate-x-1'}`}></div>
                  </div>
                </label>
                <p className="text-xs text-gray-400 mt-1">Shows on the home page.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input type="number" step="0.1" max="5" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} className="input-admin" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reviews</label>
                  <input type="number" value={formData.reviews} onChange={(e) => setFormData({...formData, reviews: e.target.value})} className="input-admin" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Tags</label>
                <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={handleTagKeydown} className="input-admin mb-2" placeholder="Press Enter to add tag..." />
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md border border-gray-200">
                      #{tag}
                      <button type="button" onClick={() => removeTag(i)} className="text-gray-400 hover:text-red-500 ml-1"><X size={10} /></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
{/* Added style globally for inputs if absent  */}
<style jsx global>{`
  .input-admin {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    background-color: #fff;
    font-size: 0.875rem;
    outline: none;
    transition: all 0.2s;
  }
  .input-admin:focus {
    border-color: #f95738;
    box-shadow: 0 0 0 1px #f95738;
  }
`}</style>
    </form>
  );
}
