'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import WatermarkedImage from '@/components/WatermarkedImage';
import { ArrowRight, ChevronRight } from 'lucide-react';

export default function CategoryPageClient({ categories, currentCategory }) {
  const [activeTab, setActiveTab] = useState(currentCategory.id);
  const tabRefs = useRef({});
  
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      tabRefs.current[activeTab].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeTab]);
  
  const handleTabClick = (categoryId) => {
    setActiveTab(categoryId);
    const element = document.getElementById(`category-section-${categoryId}`);
    if (element) {
      const offset = 140;
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
            if (categoryId) setActiveTab(categoryId);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );
    
    document.querySelectorAll('[data-category-section]').forEach((el) => {
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  const currentIndex = categories.findIndex(c => c.id === currentCategory.id);
  const orderedCategories = [...categories.slice(currentIndex), ...categories.slice(0, currentIndex)];

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Sticky Category Tabs */}
      <div className="sticky top-[60px] sm:top-[72px] z-40 bg-dark-900/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {orderedCategories.map((category) => (
              <button
                key={category.id}
                ref={(el) => (tabRefs.current[category.id] = el)}
                onClick={() => handleTabClick(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                  activeTab === category.id
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

      {/* Subcategories Sections */}
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {orderedCategories.map((category) => {
            const subcategories = categories.find(c => c.id === category.id)?.subcategories || [];
            
            return (
              <section 
                key={category.id} 
                id={`category-section-${category.id}`}
                data-category-section
                data-category-id={category.id}
                className="mb-16 scroll-mt-32"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  {category.icon && (
                    <span className="text-2xl">{category.icon}</span>
                  )}
                  <h2 className="text-2xl font-display font-bold text-white">
                    {category.name} <span className="text-coral-400">Decorations</span>
                  </h2>
                  {category.id !== currentCategory.id && (
                    <Link 
                      href={`/${category.slug}`}
                      className="ml-auto text-sm text-coral-400 hover:text-coral-300 flex items-center gap-1"
                    >
                      View All <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
                
                {/* Subcategories Grid */}
                {subcategories.length === 0 ? (
                  <div className="text-center py-12 text-white/40 bg-dark-800/20 rounded-2xl border border-white/5">
                    No subcategories available
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {subcategories.map((sub) => (
                      <Link 
                        href={`/${category.slug}/${sub.slug}`} 
                        key={sub.id} 
                        className="group flex flex-col bg-dark-800/50 border border-white/5 rounded-2xl overflow-hidden hover:border-coral-500/30 transition-all hover:bg-dark-800/80"
                      >
                        {/* Image */}
                        <div className="relative h-56 w-full overflow-hidden">
                          <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                          {sub.image_url ? (
                            <WatermarkedImage 
                              src={sub.image_url} 
                              alt={sub.name} 
                              fill 
                              className="object-cover group-hover:scale-105 transition-transform duration-500" 
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-dark-800">
                              <span className="text-white/30 text-4xl">{category.icon || '📁'}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-display font-semibold text-white mb-2">{sub.name}</h3>
                          <p className="text-white/50 mb-4 flex-1 line-clamp-2">{sub.description}</p>
                          
                          <div className="flex items-center text-coral-400 font-medium group-hover:text-coral-300 transition-colors text-sm">
                            <span>View Designs</span>
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
