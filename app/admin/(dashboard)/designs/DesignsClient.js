'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabaseClient';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, Star } from 'lucide-react';
import Image from 'next/image';

export default function DesignsClient({ initialDesigns, categories, subcategories }) {
  const supabase = createClient();
  const [designs, setDesigns] = useState(initialDesigns);
  const [toast, setToast] = useState(null);

  const [filterCat, setFilterCat] = useState('All');
  const [filterSub, setFilterSub] = useState('All');
  const [filterFeatured, setFilterFeatured] = useState('All');
  const [search, setSearch] = useState('');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you certain you want to delete this design?')) return;
    try {
      const { error } = await supabase.from('designs').delete().eq('id', id);
      if (error) throw error;
      setDesigns(designs.filter(d => d.id !== id));
      showToast('Design deleted', 'error');
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredDesigns = useMemo(() => {
    return designs.filter(d => {
      const matchCat = filterCat === 'All' || d.category_id === filterCat;
      const matchSub = filterSub === 'All' || d.subcategory_id === filterSub;
      const matchFeatured = filterFeatured === 'All' ? true : (filterFeatured === 'Yes' ? d.featured : !d.featured);
      const matchSearch = d.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSub && matchFeatured && matchSearch;
    });
  }, [designs, filterCat, filterSub, filterFeatured, search]);

  const availableSubs = subcategories.filter(s => filterCat === 'All' || s.category_id === filterCat);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Designs</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all available Event services</p>
        </div>
        <Link 
          href="/admin/designs/new"
          className="btn bg-coral-500 hover:bg-coral-600 text-white font-medium py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2"
        >
          <Plus size={16} /> Add New Design
        </Link>
      </div>

      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium z-50 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search titles..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none"
          />
        </div>
        <select 
          value={filterCat}
          onChange={(e) => { setFilterCat(e.target.value); setFilterSub('All'); }}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none w-full sm:w-auto"
        >
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select 
          value={filterSub}
          onChange={(e) => setFilterSub(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none w-full sm:w-auto"
        >
          <option value="All">All Subcategories</option>
          {availableSubs.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
        </select>
        <select 
          value={filterFeatured}
          onChange={(e) => setFilterFeatured(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none w-full sm:w-auto"
        >
          <option value="All">Featured: All</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm font-medium border-b border-gray-100">
                <th className="p-4 pl-6 w-24">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Pricing</th>
                <th className="p-4">Placement</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDesigns.map((design) => {
                const coverImage = design.images?.[0] || design.image_url;
                return (
                <tr key={design.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors text-sm">
                  <td className="p-4 pl-6">
                    {coverImage ? (
                      <div className="w-16 h-12 rounded-lg relative overflow-hidden bg-gray-100 border border-gray-200 shadow-sm">
                        <Image src={coverImage} alt={design.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200">
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-gray-900">
                    <div className="font-bold flex items-center gap-2">
                      {design.title}
                      {design.featured && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                    </div>
                    <div className="text-gray-400 text-xs mt-1 truncate max-w-[250px]">{design.slug}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-coral-500">₹{design.price.toLocaleString()}</div>
                    {design.original_price && design.original_price > design.price && (
                      <div className="text-gray-400 text-xs line-through flex items-center gap-2">
                        ₹{design.original_price.toLocaleString()}
                        {design.discount > 0 && <span className="bg-green-100 text-green-700 font-bold px-1.5 rounded">{design.discount}%</span>}
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md inline-flex w-fit">
                        {design.categories?.name || 'No Category'}
                      </span>
                      <span className="text-xs text-gray-400 pl-1">
                        ↳ {design.subcategories?.name || 'No Subcategory'}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/designs/${design.id}/edit`} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors">
                        <Edit2 size={15} />
                      </Link>
                      <button onClick={() => handleDelete(design.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              )})}
              {filteredDesigns.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">No designs match your filters.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
