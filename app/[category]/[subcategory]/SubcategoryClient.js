'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ChevronRight, ChevronDown } from 'lucide-react';

export default function SubcategoryClient({ category, subcategory, designs }) {
  const [sortOrder, setSortOrder] = useState('popular');
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const sortedAndFilteredServices = useMemo(() => {
    let filtered = [...designs];
    
    return filtered.sort((a, b) => {
      if (sortOrder === 'price-low') {
        return a.price - b.price;
      } else if (sortOrder === 'price-high') {
        return b.price - a.price;
      } else if (sortOrder === 'newest') {
        // Sort by created_at descending if available, else id
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      } else {
        // popular
        return (b.rating || 0) - (a.rating || 0);
      }
    });
  }, [designs, sortOrder]);

  const sortOptions = [
    { id: 'popular', label: 'Popular' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest' }
  ];

  const currentSortLabel = sortOptions.find(o => o.id === sortOrder)?.label;

  return (
    <>
      {/* Sticky Top Bar (Breadcrumbs & Sort) */}
      <div className="sticky top-[60px] sm:top-[72px] z-30 bg-dark-900/95 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center text-sm font-medium text-white/50 space-x-2">
            <Link href="/" className="hover:text-coral-400 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/${category.slug}`} className="hover:text-coral-400 transition-colors">{category.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/90">{subcategory.name}</span>
          </div>
          
          {/* Controls */}
          <div className="flex flex-row items-center justify-between w-full sm:w-auto gap-4">
            <span className="text-white/40 text-sm">{sortedAndFilteredServices.length} {sortedAndFilteredServices.length === 1 ? 'design' : 'designs'}</span>
            
            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 text-sm bg-dark-800 border border-white/10 text-white px-4 py-2 rounded-full hover:border-coral-500/50 transition-colors relative z-40"
              >
                <span>{currentSortLabel}</span>
                <ChevronDown className="w-4 h-4 text-white/50" />
              </button>
              
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-dark-800 border border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                  {sortOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSortOrder(option.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-dark-700 ${sortOrder === option.id ? 'text-coral-400 font-medium' : 'text-white/70'}`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <section className="py-8 px-4 sm:px-6 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {sortedAndFilteredServices.length === 0 ? (
            <div className="text-center py-20 bg-dark-800/20 rounded-3xl border border-white/5">
              <p className="text-white/40 text-lg">No designs found for this subcategory yet.</p>
              <Link href={`/${category.slug}`} className="mt-4 inline-block text-coral-400 hover:text-coral-300">
                &larr; View other subcategories
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedAndFilteredServices.map((service) => {
                const coverImage = service.images?.[0] || '/assets/placeholder.jpg';
                const originalPrice = service.original_price || service.originalPrice;
                return (
                <Link 
                  href={`/services/${service.slug}`} 
                  key={service.id} 
                  className="group flex flex-col bg-dark-800/40 border border-white/5 rounded-2xl overflow-hidden hover:border-coral-500/30 hover:bg-dark-800/80 transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                    
                    {service.discount > 0 && (
                      <div className="absolute top-3 left-3 z-20 bg-coral-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {service.discount}% OFF
                      </div>
                    )}
                    
                    <img 
                      src={coverImage} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="text-lg font-display font-semibold text-white leading-tight line-clamp-1">{service.title}</h3>
                      {service.rating && (
                        <div className="flex items-center gap-1 bg-dark-900/50 px-1.5 py-0.5 rounded-md text-xs font-medium border border-white/5 shrink-0">
                          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                          <span className="text-white/90">{service.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-white/50 text-sm mb-4 line-clamp-1 flex-1">{service.short_desc || service.shortDesc}</p>
                    
                    <div className="flex items-end justify-between mt-auto">
                      <div>
                        {originalPrice > service.price && (
                          <div className="text-white/40 text-xs line-through mb-0.5">
                            ₹{originalPrice.toLocaleString()}
                          </div>
                        )}
                        <div className="text-coral-400 font-bold text-xl">
                          ₹{service.price.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="bg-white/5 group-hover:bg-coral-500/10 text-white group-hover:text-coral-400 text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/5 group-hover:border-coral-500/30">
                        Book Now
                      </div>
                    </div>
                  </div>
                </Link>
              )})}
            </div>
          )}
        </div>
      </section>

      {/* Click outside overlay for dropdown */}
      {isSortOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setIsSortOpen(false)}
        />
      )}
    </>
  );
}
