import Link from 'next/link';
import Image from 'next/image';
import { Star, ArrowRight } from 'lucide-react';

export default function ServiceCard({ service, index = 0 }) {
  const delays = ['stagger-1', 'stagger-2', 'stagger-3', 'stagger-4'];
  const delay = delays[index % 4];

  return (
    <Link
      href={`/services/${service.slug}`}
      className={`card-dark group block animate-fade-up ${delay}`}
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Discount badge */}
        {service.discount > 0 && (
          <div className="absolute top-3 left-3 bg-coral-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {service.discount}% OFF
          </div>
        )}
        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-dark-900/70 backdrop-blur-sm text-white/80 text-xs px-2.5 py-1 rounded-full border border-white/10">
          {service.category}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-white font-semibold text-lg leading-tight mb-1 group-hover:text-coral-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-white/40 text-sm leading-relaxed mb-3 line-clamp-2">
          {service.shortDesc}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <Star size={12} fill="#f95738" stroke="none" />
          <span className="text-white/70 text-xs font-medium">{service.rating}</span>
          <span className="text-white/30 text-xs">({service.reviews} reviews)</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-coral-400 font-semibold text-lg">₹{service.price.toLocaleString('en-IN')}</span>
            {service.originalPrice && (
              <span className="text-white/25 text-sm line-through ml-2">₹{service.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <span className="w-8 h-8 rounded-full bg-coral-500/10 border border-coral-500/20 flex items-center justify-center text-coral-400 group-hover:bg-coral-500 group-hover:text-white transition-all">
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
