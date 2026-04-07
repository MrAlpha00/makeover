'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import WatermarkedImage from '@/components/WatermarkedImage';
import { Search, Star, ArrowRight } from 'lucide-react';

export default function DesignsClient({ designs, categories }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filtered = designs.filter((d) => {
    const catName = d.categories?.name || 'Uncategorized';
    const matchCat = activeCategory === 'All' || catName === activeCategory;
    const searchTarget = d.title + ' ' + (d.tags ? d.tags.join(' ') : '');
    const matchSearch = !search || searchTarget.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Filters */}
      <div className="sticky top-16 z-30 bg-dark-900/95 backdrop-blur-md border-y border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`text-sm px-4 py-1.5 rounded-full border transition-all font-medium ${
                  activeCategory === cat.name
                    ? 'bg-coral-500 border-coral-500 text-white'
                    : 'border-white/10 text-white/50 hover:border-coral-500/50 hover:text-white'
                }`}
              >
                {cat.icon && <span className="mr-1">{cat.icon}</span>}
                {cat.name}
              </button>
            ))}
          </div>
          
          {/* Search + View Toggle */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
              <input
                type="text"
                placeholder="Search designs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-dark pl-9 w-full sm:w-60 py-2"
              />
            </div>
            <div className="flex border border-white/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-coral-500 text-white' : 'text-white/50 hover:text-white'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-coral-500 text-white' : 'text-white/50 hover:text-white'}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <p className="text-white/40 text-sm">
          Showing {filtered.length} {filtered.length === 1 ? 'design' : 'designs'}
        </p>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 min-h-[40vh]">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/30 text-lg">No designs found. Try a different filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((design) => (
                <DesignCard key={design.id} design={design} />
              ))}
            </div>
          )}
        </section>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 min-h-[40vh]">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/30 text-lg">No designs found. Try a different filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((design) => (
                <DesignListCard key={design.id} design={design} />
              ))}
            </div>
          )}
        </section>
      )}
    </>
  );
}

function DesignCard({ design }) {
  const imageUrl = design.images?.[0] || design.image;
  
  return (
    <Link
      href={`/services/${design.slug}`}
      className="group card-dark overflow-hidden block hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:z-10 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={design.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-800">
            <span className="text-white/20 text-5xl">🎨</span>
          </div>
        )}
        
        {/* Discount badge */}
        {design.discount > 0 && (
          <div className="absolute top-3 left-3 bg-coral-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {design.discount}% OFF
          </div>
        )}
        
        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-dark-900/70 backdrop-blur-sm text-white/80 text-xs px-2 py-1 rounded-full border border-white/10">
          {design.categories?.name}
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Quick view */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
          <span className="flex items-center justify-center gap-2 bg-coral-500 text-white text-sm font-medium py-2.5 rounded-lg">
            View Details <ArrowRight size={14} />
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-white text-lg mb-1 line-clamp-1 group-hover:text-coral-400 transition-colors">
          {design.title}
        </h3>
        
        {design.short_desc || design.shortDesc ? (
          <p className="text-white/40 text-sm mb-3 line-clamp-2">
            {design.short_desc || design.shortDesc}
          </p>
        ) : (
          <p className="text-white/40 text-sm mb-3 line-clamp-2">
            {design.categories?.name} decoration
          </p>
        )}
        
        {/* Rating */}
        {design.rating && (
          <div className="flex items-center gap-1.5 mb-3">
            <Star size={12} fill="#f95738" stroke="none" />
            <span className="text-white/70 text-xs font-medium">{design.rating}</span>
            <span className="text-white/30 text-xs">({design.reviews} reviews)</span>
          </div>
        )}
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-coral-400 font-bold text-xl">₹{design.price?.toLocaleString('en-IN')}</span>
            {(design.original_price || design.originalPrice) && (
              <span className="text-white/30 text-sm line-through ml-2">
                ₹{(design.original_price || design.originalPrice)?.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function DesignListCard({ design }) {
  const imageUrl = design.images?.[0] || design.image;
  
  return (
    <Link
      href={`/services/${design.slug}`}
      className="group card-dark p-4 flex gap-5 items-center block hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:z-10 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative w-32 h-24 sm:w-40 sm:h-28 flex-shrink-0 overflow-hidden rounded-xl">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={design.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="160px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-800 rounded-xl">
            <span className="text-white/20 text-3xl">🎨</span>
          </div>
        )}
        
        {design.discount > 0 && (
          <div className="absolute top-2 left-2 bg-coral-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {design.discount}% OFF
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-coral-400 text-xs font-medium uppercase tracking-wider">
              {design.categories?.name}
            </span>
            <h3 className="font-semibold text-white text-lg mb-1 line-clamp-1 group-hover:text-coral-400 transition-colors">
              {design.title}
            </h3>
            
            {design.short_desc || design.shortDesc ? (
              <p className="text-white/40 text-sm line-clamp-2">
                {design.short_desc || design.shortDesc}
              </p>
            ) : (
              <p className="text-white/40 text-sm line-clamp-2">
                {design.description?.slice(0, 100)}...
              </p>
            )}
            
            {/* Rating */}
            {design.rating && (
              <div className="flex items-center gap-1.5 mt-2">
                <Star size={11} fill="#f95738" stroke="none" />
                <span className="text-white/70 text-xs font-medium">{design.rating}</span>
                <span className="text-white/30 text-xs">({design.reviews} reviews)</span>
              </div>
            )}
          </div>
          
          {/* Price */}
          <div className="text-right flex-shrink-0">
            <span className="text-coral-400 font-bold text-xl">₹{design.price?.toLocaleString('en-IN')}</span>
            {(design.original_price || design.originalPrice) && (
              <div>
                <span className="text-white/30 text-sm line-through">
                  ₹{(design.original_price || design.originalPrice)?.toLocaleString('en-IN')}
                </span>
              </div>
            )}
            <div className="mt-2 flex items-center gap-2 text-coral-400 text-sm font-medium">
              View <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
