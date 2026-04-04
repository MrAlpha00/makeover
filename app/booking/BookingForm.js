'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Loader2 } from 'lucide-react';

const occasions = ['Birthday', 'Anniversary', 'Baby Shower', 'Corporate Event', 'Wedding', 'Other'];

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
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

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
      <div className="text-center py-20">
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={28} className="text-green-400" />
        </div>
        <h2 className="font-display text-3xl text-white font-bold mb-3">Booking received!</h2>
        <p className="text-white/50 text-lg mb-6 max-w-md mx-auto">
          Thank you, {form.name}! We'll call you within 2 hours to confirm your booking.
        </p>
        <a
          href={`https://wa.me/9663866778?text=Hi%20SLV%20Events!%20I%20just%20filled%20the%20booking%20form%20for%20${encodeURIComponent(form.service || 'your services')}.%20Looking%20forward%20to%20hearing%20from%20you!`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-coral"
        >
          Also WhatsApp us for faster response
        </a>
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
