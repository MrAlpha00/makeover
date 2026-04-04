'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, Loader2, ArrowRight, Star } from 'lucide-react';

const occasions = ['Birthday', 'Anniversary', 'Baby Shower', 'Corporate Event', 'Wedding', 'Other'];

function SuggestedDesignCard({ design }) {
  const imageUrl = design.images?.[0] || design.image;
  
  return (
    <Link
      href={`/services/${design.slug}`}
      className="group card-dark overflow-hidden block text-left"
    >
      <div className="relative h-36 overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={design.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-dark-800">
            <span className="text-white/20 text-4xl">🎨</span>
          </div>
        )}
        {design.discount > 0 && (
          <div className="absolute top-2 left-2 bg-coral-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {design.discount}% OFF
          </div>
        )}
      </div>
      <div className="p-3">
        <h4 className="font-semibold text-white text-sm line-clamp-1 group-hover:text-coral-400 transition-colors">
          {design.title}
        </h4>
        {design.rating && (
          <div className="flex items-center gap-1 mt-1">
            <Star size={10} fill="#f95738" stroke="none" />
            <span className="text-white/50 text-xs">{design.rating}</span>
          </div>
        )}
        <p className="text-coral-400 font-semibold text-sm mt-1">
          ₹{design.price?.toLocaleString('en-IN')}
        </p>
      </div>
    </Link>
  );
}

export default function BookingForm({ designs }) {
  const searchParams = useSearchParams();
  const preSelected = searchParams.get('service') || '';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: preSelected,
    occasion: '',
    date: '',
    venue: '',
    guests: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const suggestedDesigns = useMemo(() => {
    if (!designs || designs.length === 0) return [];
    const shuffled = [...designs].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }, [designs]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-12">
        <div className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500/30 flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <CheckCircle size={40} className="text-green-400" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold mb-3">
            Booking Received! 🎉
          </h2>
          <p className="text-white/50 text-lg mb-6 max-w-md mx-auto">
            Thank you, {form.name}! We've sent you a confirmation email. Our team will call you within <span className="text-coral-400 font-semibold">2 hours</span> to confirm your booking.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Link
              href="/"
              className="btn-outline px-6 py-3"
            >
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Go to Home Page
            </Link>
            <Link
              href="/designs"
              className="btn-coral px-6 py-3"
            >
              Explore More Designs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <a
            href={`https://wa.me/9663866778?text=Hi%20SLV%20Events!%20I%20just%20booked%20${encodeURIComponent(form.service || 'decoration')}.%20Looking%20forward%20to%20hearing%20from%20you!`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 transition-colors px-5 py-2.5 rounded-full text-sm font-medium"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {suggestedDesigns.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-1">You might also like</p>
                <h3 className="font-display text-2xl font-bold text-white">
                  Explore More <span className="italic text-coral-400">Designs</span>
                </h3>
              </div>
              <Link href="/designs" className="text-coral-400 text-sm font-medium hover:text-coral-300 transition-colors flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {suggestedDesigns.map((design) => (
                <SuggestedDesignCard key={design.id} design={design} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/50 text-sm mb-1.5">Your name *</label>
          <input name="name" required value={form.name} onChange={handleChange} placeholder="Priya Sharma" className="input-dark" />
        </div>
        <div>
          <label className="block text-white/50 text-sm mb-1.5">Phone number *</label>
          <input name="phone" required value={form.phone} onChange={handleChange} placeholder="+91 98XXX XXXXX" className="input-dark" type="tel" />
        </div>
      </div>
      <div>
        <label className="block text-white/50 text-sm mb-1.5">Email address</label>
        <input name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className="input-dark" type="email" />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/50 text-sm mb-1.5">Service interested in</label>
          <select name="service" value={form.service} onChange={handleChange} className="input-dark bg-dark-700">
            <option value="">Select a service</option>
            {designs?.map((s) => (
              <option key={s.id} value={s.slug}>{s.title}</option>
            ))}
            <option value="custom">Custom / Not listed</option>
          </select>
        </div>
        <div>
          <label className="block text-white/50 text-sm mb-1.5">Occasion</label>
          <select name="occasion" value={form.occasion} onChange={handleChange} className="input-dark bg-dark-700">
            <option value="">Select occasion</option>
            {occasions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-white/50 text-sm mb-1.5">Event date *</label>
          <input name="date" required value={form.date} onChange={handleChange} type="date" className="input-dark" min={new Date().toISOString().split('T')[0]} />
        </div>
        <div>
          <label className="block text-white/50 text-sm mb-1.5">No. of guests (approx.)</label>
          <input name="guests" value={form.guests} onChange={handleChange} placeholder="e.g. 30" className="input-dark" type="number" min="1" />
        </div>
      </div>
      <div>
        <label className="block text-white/50 text-sm mb-1.5">Venue / Area in Bangalore *</label>
        <input name="venue" required value={form.venue} onChange={handleChange} placeholder="e.g. Home — Koramangala, or Hotel name" className="input-dark" />
      </div>
      <div>
        <label className="block text-white/50 text-sm mb-1.5">Any special requests?</label>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your theme, colour preferences, budget, etc." className="input-dark h-28 resize-none" />
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          Something went wrong. Please try WhatsApp or call us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-coral w-full justify-center py-4 text-base disabled:opacity-60"
      >
        {status === 'loading' ? (
          <><Loader2 size={16} className="animate-spin" /> Sending...</>
        ) : (
          'Send Booking Enquiry'
        )}
      </button>
      <p className="text-white/25 text-xs text-center">
        We'll respond within 2 hours · No spam, ever
      </p>
    </form>
  );
}
