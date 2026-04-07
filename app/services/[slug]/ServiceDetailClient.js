'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import WatermarkedImage from '@/components/WatermarkedImage';
import Link from 'next/link';
import { ArrowLeft, Star, Check, ArrowRight, Play, Pause } from 'lucide-react';
import ServiceCard from '../../../components/ServiceCard';

export default function ServiceDetailClient({ service, related, alsoBooked }) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [fadingImage, setFadingImage] = useState(null);
  const slideshowRef = useRef(null);
  const timerRef = useRef(null);
  const hasStartedSlideshow = useRef(false);

  const COVER_DELAY = 5000;
  const SLIDESHOW_INTERVAL = 2000;
  const TRANSITION_DURATION = 500;

  const gallery = service.images?.length ? service.images : (service.image ? [service.image] : []);
  const displayImages = gallery.length > 0 ? gallery : [];

  const goToImage = useCallback((index) => {
    if (index === activeImage) return;
    
    setIsTransitioning(true);
    setFadingImage(activeImage);
    
    setTimeout(() => {
      setActiveImage(index);
      setFadingImage(null);
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, [activeImage]);

  const nextImage = useCallback(() => {
    if (displayImages.length <= 1) return;
    goToImage((activeImage + 1) % displayImages.length);
  }, [activeImage, displayImages.length, goToImage]);

  const startSlideshow = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextImage, SLIDESHOW_INTERVAL);
    setIsAutoPlaying(true);
  }, [nextImage]);

  useEffect(() => {
    if (displayImages.length <= 1 || hasStartedSlideshow.current) return;

    const coverTimer = setTimeout(() => {
      hasStartedSlideshow.current = true;
      startSlideshow();
    }, COVER_DELAY);

    return () => {
      clearTimeout(coverTimer);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [displayImages.length, startSlideshow]);

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    if (hasStartedSlideshow.current && displayImages.length > 1) {
      startSlideshow();
    }
  };

  const handleManualSelect = (index) => {
    goToImage(index);
    if (hasStartedSlideshow.current) {
      setTimeout(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(nextImage, SLIDESHOW_INTERVAL);
        setIsAutoPlaying(true);
      }, SLIDESHOW_INTERVAL);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/40 text-lg mb-4">Service not found</p>
          <Link href="/services" className="btn-coral">Back to Services</Link>
        </div>
      </div>
    );
  }

  // Handle image formats properly
  const gallery = service.images?.length ? service.images : (service.image ? [service.image] : []);

  const toggleAddOn = (id) => {
    setSelectedAddOns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalPrice = service.price + (service.addons || [])
    .filter((a) => selectedAddOns[a.id])
    .reduce((acc, a) => acc + (a.price || 0), 0);

  const whatsappMsg = encodeURIComponent(
    `Hi SLV Events! I'd like to book "${service.title}" (₹${service.price.toLocaleString('en-IN')}) for my event in Bangalore. Can you confirm availability?`
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-20">
      {/* Breadcrumb */}
      <Link href="/services" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-6 sm:mb-8 transition-colors group">
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span className="hidden xs:inline">Back to Services</span>
        <span className="xs:hidden">Back</span>
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* ── LEFT: Gallery ── */}
        <div className="lg:sticky lg:top-24">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/5">
            {gallery.length > 0 ? (
              <WatermarkedImage
                src={gallery[activeImage]}
                alt={service.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-800">
                <span className="text-white/20 text-5xl sm:text-6xl">🎨</span>
              </div>
            )}
            {service.discount > 0 && (
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-coral-500 text-white text-xs sm:text-sm font-semibold px-2.5 sm:px-3 py-1 sm:py-1 rounded-full">
                {service.discount}% OFF
              </div>
            )}
          </div>
          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-3 overflow-x-auto pb-2 scrollbar-hide">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === i ? 'border-coral-500' : 'border-white/5 opacity-50 hover:opacity-100'
                  }`}
                >
                  <WatermarkedImage src={img} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Details ── */}
        <div className="mt-6 lg:mt-0">
          <span className="badge mb-2 sm:mb-3">{service.categories?.name || service.category || 'Service'}</span>
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight">
            {service.title}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill={i < Math.round(service.rating) ? '#f95738' : 'none'} stroke={i < Math.round(service.rating) ? 'none' : '#ffffff30'} />
              ))}
            </div>
            <span className="text-white font-medium text-sm">{service.rating}</span>
            <span className="text-white/30 text-sm">({service.reviews} reviews)</span>
          </div>

          <p className="text-white/60 leading-relaxed mb-5 sm:mb-6">{service.description}</p>

          {/* Price */}
          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-5 sm:mb-6 p-3 sm:p-4 rounded-xl bg-dark-800 border border-white/5">
            <span className="font-display text-3xl sm:text-4xl font-bold text-coral-400">
              ₹{totalPrice.toLocaleString('en-IN')}
            </span>
            {(service.original_price || service.originalPrice) && (
              <span className="text-white/30 line-through text-base sm:text-lg">
                ₹{(service.original_price || service.originalPrice).toLocaleString('en-IN')}
              </span>
            )}
            {selectedAddOns && Object.values(selectedAddOns).some(Boolean) && (
              <span className="text-white/40 text-xs sm:text-sm">incl. add-ons</span>
            )}
          </div>

          {/* Inclusions */}
          {service.inclusions && service.inclusions.length > 0 && (
            <div className="mb-5 sm:mb-6">
              <h3 className="font-display text-white font-semibold text-base sm:text-lg mb-3">What's included</h3>
              <ul className="space-y-2">
                {service.inclusions.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-white/60 text-sm">
                    <Check size={15} className="text-coral-400 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add-ons */}
          {service.addons && service.addons.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h3 className="font-display text-white font-semibold text-base sm:text-lg mb-3">Add-ons</h3>
              <div className="space-y-2">
                {service.addons.map((addon, index) => (
                  <button
                    key={addon.id || index}
                    onClick={() => toggleAddOn(addon.id || index)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                      selectedAddOns[addon.id || index]
                        ? 'bg-coral-500/10 border-coral-500/40 text-white'
                        : 'bg-dark-800 border-white/5 text-white/60 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                        selectedAddOns[addon.id || index] ? 'bg-coral-500 border-coral-500' : 'border-white/20'
                      }`}>
                        {selectedAddOns[addon.id || index] && <Check size={11} className="text-white" />}
                      </div>
                      <span className="text-sm font-medium">{addon.name}</span>
                    </div>
                    <span className={`text-sm font-semibold ${selectedAddOns[addon.id || index] ? 'text-coral-400' : 'text-white/40'}`}>
                      +₹{addon.price?.toLocaleString('en-IN') || addon.price}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3">
            <Link href={`/booking?service=${service.slug}`} className="btn-coral flex-1 justify-center py-4 text-base rounded-full sm:rounded-xl">
              Book Now — ₹{totalPrice.toLocaleString('en-IN')}
            </Link>
            <a
              href={`https://wa.me/9663866778?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-all px-6 py-3.5 sm:py-4 rounded-full font-medium text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </div>

      {/* ── Customers Also Booked ── */}
      {alsoBooked && alsoBooked.length > 0 && (
        <div className="mt-12 sm:mt-20 pt-12 sm:pt-16 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-6 sm:mb-8 gap-4">
            <div>
              <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-2">You might also love</p>
              <h2 className="section-title">Customers <span className="italic">also booked</span></h2>
            </div>
            <Link href="/services" className="btn-outline hidden sm:inline-flex">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {alsoBooked.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Related Services ── */}
      {related && related.length > 0 && (
        <div className="mt-10 sm:mt-16">
          <h2 className="section-title mb-6 sm:mb-8">More <span className="italic">{service.categories?.name || 'similar'}</span> setups</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {related.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
