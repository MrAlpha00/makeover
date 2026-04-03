'use client';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import ServiceCard from '../../components/ServiceCard';
import services from '../../data/services';
import { Search } from 'lucide-react';

const categories = ['All', 'Birthday', 'Theme Decoration', 'Anniversary', 'Occasions', 'Corporate'];

function ServicesContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('cat') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [search, setSearch] = useState('');

  const filtered = services.filter((s) => {
    const matchCat = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.tags.some((t) => t.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-2">SLV Events, Bangalore</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">
          Our <span className="italic text-coral-400">Services</span>
        </h1>
        <p className="text-white/40 text-lg">Handcrafted decorations for every occasion in Bangalore.</p>
      </section>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-dark-900/95 backdrop-blur-md border-y border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Category pills */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm px-4 py-1.5 rounded-full border transition-all font-medium ${
                  activeCategory === cat
                    ? 'bg-coral-500 border-coral-500 text-white'
                    : 'border-white/10 text-white/50 hover:border-coral-500/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative sm:ml-auto">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search decorations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-dark pl-9 w-60 py-2"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
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

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />
      <Suspense fallback={<div className="pt-40 text-center text-white/30">Loading...</div>}>
        <ServicesContent />
      </Suspense>
      <Footer />
    </div>
  );
}
