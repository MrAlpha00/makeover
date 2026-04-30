import Link from 'next/link';
import WatermarkedImage from '@/components/WatermarkedImage';
import { Star, ArrowRight } from 'lucide-react';

export default function ServiceCard({ service, index = 0 }) {
  const delays = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4'];
  const delay = delays[index % 4];
  const hasImage = service.images?.[0] || service.image;

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`card group block animate-fade-up ${delay} hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:z-10 transition-all duration-300`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {hasImage ? (
          <WatermarkedImage
            src={service.images?.[0] || service.image}
            alt={service.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'var(--bg-tertiary)' }}>
            <span className="text-5xl opacity-20">🎨</span>
          </div>
        )}
        {/* Discount badge */}
        {service.discount > 0 && (
          <div 
            className="absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ background: 'var(--coral)' }}
          >
            {service.discount}% OFF
          </div>
        )}
        {/* Category badge */}
        <div 
          className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-full backdrop-blur-sm border"
          style={{ 
            background: 'rgba(0,0,0,0.5)',
            color: 'rgba(255,255,255,0.8)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          {service.categories?.name || service.category}
        </div>
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 50%, transparent 100%)',
            opacity: 0.6,
          }} 
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 
          className="font-display font-semibold text-lg leading-tight mb-1 group-hover:text-coral-400 transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          {service.title}
        </h3>
        <p 
          className="text-sm leading-relaxed mb-3 line-clamp-2"
          style={{ color: 'var(--text-muted)' }}
        >
          {service.short_desc || service.shortDesc}
        </p>

        {/* Rating */}
        {service.rating && (
        <div className="flex items-center gap-1.5 mb-3">
          <Star size={12} fill="#f95738" stroke="none" />
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{service.rating}</span>
          {service.reviews && (
          <span className="text-sm" style={{ color: 'var(--text-muted)' }}>({service.reviews} reviews)</span>
          )}
        </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            {service.price ? (
              <>
                <span className="text-lg font-semibold" style={{ color: 'var(--coral)' }}>₹{Number(service.price).toLocaleString('en-IN')}</span>
                {(service.original_price || service.originalPrice) && (
                  <span className="text-sm line-through ml-2" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>₹{Number(service.original_price || service.originalPrice).toLocaleString('en-IN')}</span>
                )}
              </>
            ) : (
              <span className="text-sm" style={{ color: 'var(--text-muted)' }}>Contact for price</span>
            )}
          </div>
          <span 
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all group-hover:scale-110"
            style={{ 
              background: 'var(--coral-10)',
              border: '1px solid var(--coral-20)',
              color: 'var(--coral)',
            }}
          >
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
