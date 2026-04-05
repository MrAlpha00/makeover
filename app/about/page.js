import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import Link from 'next/link';
import { ArrowRight, Award, Heart, Users, Zap } from 'lucide-react';

export const metadata = {
  title: 'About SLV Events — Party Decorators in Bangalore',
  description: 'Learn about SLV Events — Bangalore\'s most-loved party and event decoration company. 5,000+ events, 4.9★ rated, serving all of Bangalore.',
};

const values = [
  { icon: <Heart size={18} />, title: 'Made with love', desc: 'Every setup is crafted with care — we treat every event like it\'s our own.' },
  { icon: <Award size={18} />, title: 'Quality guaranteed', desc: 'Premium materials, skilled decorators, and no shortcuts.' },
  { icon: <Zap size={18} />, title: 'Fast & reliable', desc: 'On-time setup, every time. Same-day bookings available.' },
  { icon: <Users size={18} />, title: 'Bangalore\'s own', desc: 'Born in Bangalore, built for Bangaloreans. We know the city.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />

      <section className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <span className="badge mb-4">Our story</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
              Turning moments into <span className="italic text-coral-400">lifelong memories</span>
            </h1>
            <p className="text-white/50 leading-relaxed mb-4">
              SLV Events was born from a simple belief — every celebration deserves to look extraordinary, regardless of budget. Founded in Bangalore, we've grown from a small balloon decoration venture to one of the city's most trusted event decoration companies.
            </p>
            <p className="text-white/50 leading-relaxed mb-8">
              Today, our team of passionate decorators has set up over 5,000 events across Bangalore — from intimate birthday surprises to large-scale corporate functions. Every event gets our full attention, creativity, and heart.
            </p>
            <Link href="/booking" className="btn-coral">
              Book your celebration <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '5,000+', label: 'Events decorated' },
              { value: '4.9★', label: 'Google rating' },
              { value: '850+', label: 'Happy clients' },
              { value: '5 yrs', label: 'In business' },
            ].map((stat) => (
              <div key={stat.label} className="card-dark p-6 text-center">
                <div className="font-display text-3xl font-bold text-coral-400 mb-1">{stat.value}</div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="section-title mb-10 text-center">What we <span className="italic">stand for</span></h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="card-dark p-6">
                <div className="w-10 h-10 rounded-xl bg-coral-500/10 border border-coral-500/20 flex items-center justify-center text-coral-400 mb-4">
                  {v.icon}
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-dark-800 border border-white/5 rounded-3xl p-12">
          <h2 className="font-display text-3xl font-bold text-white mb-3">Ready to celebrate?</h2>
          <p className="text-white/40 mb-6">Let's create something beautiful together.</p>
          <Link href="/services" className="btn-coral">Browse our services <ArrowRight size={15} /></Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
