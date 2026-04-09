import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Party Hub — Party Decorators Bangalore',
  description: 'Contact Party Hub for party decoration bookings in Bangalore. Call, WhatsApp, or fill in the form. We respond within 2 hours.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <div className="text-center mb-12">
          <span className="badge mb-4">Get in touch</span>
          <h1 className="font-display text-4xl font-bold text-white mb-3">We'd love to <span className="italic text-coral-400">hear from you</span></h1>
          <p className="text-white/40">Questions? Custom requests? Just want to say hi? We're here.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact info */}
          <div className="space-y-5">
            {[
              { icon: <Phone size={18} />, title: 'Call us', info: '+91-63668 83984', sub: 'Mon–Sun, 9 AM to 9 PM', href: 'tel:+916366883984' },
              { icon: <Phone size={18} />, title: 'Alt. Number', info: '+91-99863 14095', sub: 'Mon–Sun, 9 AM to 9 PM', href: 'tel:+919986314095' },
              { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>, title: 'WhatsApp', info: 'Chat with us instantly', sub: 'Fastest response', href: 'https://wa.me/6366883984' },
              { icon: <Mail size={18} />, title: 'Booking Email', info: 'booking@partyhubs.in', sub: 'For bookings & inquiries', href: 'mailto:booking@partyhubs.in' },
              { icon: <MapPin size={18} />, title: 'Location', info: 'Bangalore, Karnataka', sub: 'Serving all areas of Bangalore', href: null },
            ].map((item) => (
              <div key={item.title} className="card-dark p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-coral-500/10 border border-coral-500/20 flex items-center justify-center text-coral-400 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-0.5">{item.title}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white font-semibold hover:text-coral-400 transition-colors">{item.info}</a>
                  ) : (
                    <p className="text-white font-semibold">{item.info}</p>
                  )}
                  <p className="text-white/30 text-xs mt-0.5">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Hours + CTA */}
          <div className="space-y-5">
            <div className="card-dark p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-coral-400" />
                <h3 className="text-white font-semibold">Business hours</h3>
              </div>
              {[
                ['Monday – Friday', '9:00 AM – 9:00 PM'],
                ['Saturday', '9:00 AM – 9:00 PM'],
                ['Sunday', '10:00 AM – 8:00 PM'],
              ].map(([day, time]) => (
                <div key={day} className="flex justify-between py-2.5 border-b border-white/5 last:border-0">
                  <span className="text-white/50 text-sm">{day}</span>
                  <span className="text-white text-sm font-medium">{time}</span>
                </div>
              ))}
            </div>

            <div className="card-dark p-6 bg-coral-500/5 border-coral-500/20">
              <p className="text-white font-semibold mb-2">Need a quick quote?</p>
              <p className="text-white/50 text-sm mb-4">
                Send us your event details on WhatsApp and we'll get back with a quote in under 30 minutes.
              </p>
              <a
                href="https://wa.me/6366883984?text=Hi%20Party%20Hub!%20I%20need%20a%20quick%20quote%20for%20my%20event."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-coral w-full justify-center"
              >
                WhatsApp for a quick quote
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
