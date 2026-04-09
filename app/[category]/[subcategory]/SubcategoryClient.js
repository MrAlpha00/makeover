'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import WatermarkedImage from '@/components/WatermarkedImage';
import { Star, ChevronRight, ChevronDown, ArrowRight } from 'lucide-react';

export default function SubcategoryClient({ categories, currentCategory, currentSubcategory }) {
  const [activeCategory, setActiveCategory] = useState(currentCategory.id);
  const [sortOrder, setSortOrder] = useState('popular');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const tabRefs = useRef({});
  const sectionRefs = useRef({});

  useEffect(() => {
    if (tabRefs.current[activeCategory]) {
      tabRefs.current[activeCategory].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeCategory]);

  const handleCategoryTabClick = (categoryId) => {
    setActiveCategory(categoryId);
    const element = document.getElementById(`category-section-${categoryId}`);
    if (element) {
      const offset = 160;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const categoryId = entry.target.dataset.categoryId;
            if (categoryId) setActiveCategory(categoryId);
          }
        });
      },
      { rootMargin: '-30% 0px -50% 0px', threshold: 0 }
    );
    
    document.querySelectorAll('[data-category-section]').forEach((el) => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const sortDesigns = (designs) => {
    return [...designs].sort((a, b) => {
      if (sortOrder === 'price-low') {
        return a.price - b.price;
      } else if (sortOrder === 'price-high') {
        return b.price - a.price;
      } else if (sortOrder === 'newest') {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      } else {
        return (b.rating || 0) - (a.rating || 0);
      }
    });
  };

  const sortOptions = [
    { id: 'popular', label: 'Popular' },
    { id: 'price-low', label: 'Price: Low to High' },
    { id: 'price-high', label: 'Price: High to Low' },
    { id: 'newest', label: 'Newest' }
  ];

  const currentSortLabel = sortOptions.find(o => o.id === sortOrder)?.label;

  const totalDesigns = useMemo(() => {
    return categories.reduce((total, cat) => {
      return total + cat.subcategories.reduce((subTotal, sub) => subTotal + sub.designs.length, 0);
    }, 0);
  }, [categories]);

  const renderDesignCard = (design, subSlug, catSlug) => {
    const originalPrice = design.original_price || design.originalPrice;
    return (
      <Link 
        href={`/services/${design.slug}`} 
        key={design.id} 
        className="group flex flex-col bg-dark-800/40 border border-white/5 rounded-2xl overflow-hidden hover:border-coral-500/30 hover:bg-dark-800/80 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:z-10 transition-all duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
          
          {design.discount > 0 && (
            <div className="absolute top-3 left-3 z-20 bg-coral-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {design.discount}% OFF
            </div>
          )}
          
          {design.images?.[0] ? (
            <WatermarkedImage 
              src={design.images[0]} 
              alt={design.title} 
              fill 
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-dark-800">
              <span className="text-white/30 text-4xl">🎨</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="text-lg font-display font-semibold text-white leading-tight line-clamp-1">{design.title}</h3>
            {design.rating && (
              <div className="flex items-center gap-1 bg-dark-900/50 px-1.5 py-0.5 rounded-md text-xs font-medium border border-white/5 shrink-0">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-white/90">{design.rating}</span>
              </div>
            )}
          </div>
          
          <p className="text-white/50 text-sm mb-4 line-clamp-1 flex-1">{design.short_desc || design.shortDesc}</p>
          
          <div className="flex items-end justify-between mt-auto">
            <div>
              {originalPrice > design.price && (
                <div className="text-white/40 text-xs line-through mb-0.5">
                  ₹{originalPrice.toLocaleString()}
                </div>
              )}
              <div className="text-coral-400 font-bold text-xl">
                ₹{design.price.toLocaleString()}
              </div>
            </div>
            
            <div className="bg-white/5 group-hover:bg-coral-500/10 text-white group-hover:text-coral-400 text-sm font-medium px-4 py-2 rounded-lg transition-colors border border-white/5 group-hover:border-coral-500/30">
              Book Now
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Sticky Top Bar (Breadcrumbs & Sort) */}
      <div className="sticky top-[60px] sm:top-[72px] z-30 bg-dark-900/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
          
          {/* Breadcrumb */}
          <div className="flex items-center text-sm font-medium text-white/50 space-x-2">
            <Link href="/" className="hover:text-coral-400 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href={`/${currentCategory.slug}`} className="hover:text-coral-400 transition-colors">{currentCategory.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/90">{currentSubcategory.name}</span>
          </div>
          
          {/* Controls */}
          <div className="flex flex-row items-center justify-between w-full sm:w-auto gap-4">
            <span className="text-white/40 text-sm">{totalDesigns} designs</span>
            
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

        {/* Category Tabs */}
        <div className="px-4 pb-3 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                ref={(el) => (tabRefs.current[category.id] = el)}
                onClick={() => handleCategoryTabClick(category.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap transition-all text-xs font-medium ${
                  activeCategory === category.id
                    ? 'bg-coral-500 text-white'
                    : 'bg-dark-800 text-white/60 hover:text-white hover:bg-dark-700 border border-white/5'
                }`}
              >
                {category.icon && <span>{category.icon}</span>}
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="py-8 px-4 sm:px-6 min-h-[50vh]">
        <div className="max-w-7xl mx-auto">
          {categories.map((category) => (
            <section
              key={category.id}
              id={`category-section-${category.id}`}
              data-category-section
              data-category-id={category.id}
              className="mb-12 scroll-mt-40"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                {category.icon && <span className="text-2xl">{category.icon}</span>}
                <h2 className="text-2xl font-display font-bold text-white">
                  {category.name}
                </h2>
                {category.id !== currentCategory.id && (
                  <Link 
                    href={`/${category.slug}`}
                    className="ml-auto text-sm text-coral-400 hover:text-coral-300 flex items-center gap-1"
                  >
                    View Category <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>

              {/* Subcategories in this category */}
              {category.subcategories.map((subcategory) => {
                const sortedDesigns = sortDesigns(subcategory.designs);
                const isCurrentSubcategory = subcategory.id === currentSubcategory.id;
                
                return (
                  <div key={subcategory.id} className="mb-10">
                    {/* Subcategory Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className={`text-lg font-display font-semibold ${isCurrentSubcategory ? 'text-coral-400' : 'text-white/80'}`}>
                        {subcategory.name}
                      </h3>
                      <span className="text-white/30 text-sm">({subcategory.designs.length} designs)</span>
                      {!isCurrentSubcategory && (
                        <Link 
                          href={`/${category.slug}/${subcategory.slug}`}
                          className="ml-auto text-xs text-coral-400 hover:text-coral-300 flex items-center gap-1"
                        >
                          View All <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>

                    {/* Designs Grid */}
                    {sortedDesigns.length === 0 ? (
                      <div className="text-center py-8 text-white/30 bg-dark-800/20 rounded-xl border border-white/5">
                        No designs in this subcategory yet
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {sortedDesigns.map((design) => renderDesignCard(design, subcategory.slug, category.slug))}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          ))}
        </div>
      </div>

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
