'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ServiceCard from '../../components/ServiceCard';
import { Search } from 'lucide-react';

export default function ServicesClient({ initialDesigns, parentCategories }) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [search, setSearch] = useState('');

  const filtered = initialDesigns.filter((s) => {
    const sCategoryName = s.categories?.name || 'Uncategorized';
    const matchCat = activeCategory === 'All' || sCategoryName === activeCategory;
    const searchTarget = s.title + ' ' + (s.tags ? s.tags.join(' ') : '');
    const matchSearch = !search || searchTarget.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Filters */}
      <div className="sticky top-16 z-30 bg-dark-900/95 backdrop-blur-md border-y border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory('All')}
              className={`text-sm px-4 py-1.5 rounded-full border transition-all font-medium ${
                activeCategory === 'All'
                  ? 'bg-coral-500 border-coral-500 text-white'
                  : 'border-white/10 text-white/50 hover:border-coral-500/50 hover:text-white'
              }`}
            >
              All
            </button>
            {parentCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`text-sm px-4 py-1.5 rounded-full border transition-all font-medium ${
                  activeCategory === cat.name
                    ? 'bg-coral-500 border-coral-500 text-white'
                    : 'border-white/10 text-white/50 hover:border-coral-500/50 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative sm:ml-auto flex-shrink-0 w-full sm:w-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search decorations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-dark pl-9 w-full sm:w-60 py-2"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 min-h-[40vh]">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/30 text-lg">No services found. Try a different filter.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
