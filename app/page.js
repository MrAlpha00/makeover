import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, CheckCircle, Phone, Sparkles, Clock, Shield } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ServiceCard from '../components/ServiceCard';
import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';

const stats = [
  { value: '5,000+', label: 'Events Decorated' },
  { value: '4.9★', label: 'Google Rating' },
  { value: '850+', label: 'Happy Clients' },
  { value: '24hr', label: 'Booking Turnaround' },
];

const testimonials = [
  {
    name: 'Priya S.',
    occasion: 'Birthday Decoration',
    text: "SLV Events transformed our living room overnight. The balloon setup was breathtaking and my daughter was in tears of joy. 10/10 would book again!",
    rating: 5,
    avatar: 'P',
  },
  {
    name: 'Rahul M.',
    occasion: 'Anniversary Setup',
    text: "Booked the rose room decoration for our 5th anniversary. The team arrived on time, worked quietly, and left the room looking like a dream. My wife loved it.",
    rating: 5,
    avatar: 'R',
  },
  {
    name: 'Ananya K.',
    occasion: 'Jungle Theme — 1st Birthday',
    text: "The soft jungle theme for my baby's first birthday was perfect. Every detail was thought through. Our guests kept asking where we booked from!",
    rating: 5,
    avatar: 'A',
  },
];

const whyUs = [
  {
    icon: <Clock size={20} className="text-coral-400" />,
    title: 'Same-day setup',
    desc: 'Book and get your decoration set up the same day in Bangalore.',
  },
  {
    icon: <Shield size={20} className="text-coral-400" />,
    title: 'Trusted decorators',
    desc: 'Background-verified, professional teams for every booking.',
  },
  {
    icon: <Sparkles size={20} className="text-coral-400" />,
    title: '100% customisable',
    desc: 'Pick your colours, add-ons, and themes — nothing is off-limits.',
  },
  {
    icon: <CheckCircle size={20} className="text-coral-400" />,
    title: 'No hidden charges',
    desc: 'What you see is what you pay. Transparent pricing always.',
  },
];

export default async function HomePage() {
  const supabase = createServerSupabaseClient();
  
  // Fetch featured designs
  const { data: featured } = await supabase
    .from('designs')
    .select('*, categories(name)')
    .eq('featured', true)
    .limit(4);

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center pt-20 sm:pt-0 overflow-hidden">
        {/* Background orbs */}
        <div className="orb w-96 h-96 bg-coral-500 top-20 -left-32 opacity-50 sm:opacity-100" />
        <div className="orb w-72 h-72 bg-coral-600 bottom-20 right-10 opacity-50 sm:opacity-100" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          {/* Mobile Hero Image */}
          <div className="sm:hidden mb-8 -mx-4 sm:mx-0">
            <div className="relative h-56 sm:h-0 overflow-hidden rounded-b-3xl">
              <Image
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"
                alt="Birthday decoration"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left */}
            <div>
              <div className="badge mb-5 animate-fade-up stagger-1 inline-flex items-center gap-2">
                <span>🎉</span> Bangalore's #1 Party Decorators
              </div>

              <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6 animate-fade-up stagger-2">
                Create the{' '}
                <span className="text-coral-400 italic">perfect</span>{' '}
                celebration
              </h1>

              <p className="text-white/50 text-base sm:text-lg leading-relaxed mb-8 max-w-lg animate-fade-up stagger-3">
                From intimate balloon surprises to grand themed setups — SLV Events turns every occasion into a memory worth keeping.
              </p>

              <div className="flex flex-col xs:flex-row flex-wrap gap-3 animate-fade-up stagger-4">
                <Link href="/booking" className="btn-coral text-base px-6 sm:px-7 py-3.5 text-center">
                  Book Now <ArrowRight size={16} className="inline ml-1" />
                </Link>
                <Link href="/designs" className="btn-outline text-base px-6 sm:px-7 py-3.5 text-center">
                  Explore Designs
                </Link>
                <a href="tel:+919663866778" className="btn-outline text-base px-6 sm:px-7 py-3.5 text-center">
                  <Phone size={15} className="inline mr-1" /> Call
                </a>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 mt-8 animate-fade-up stagger-4">
                <div className="flex -space-x-2">
                  {['P', 'R', 'A', 'M'].map((l, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-coral-500/20 border-2 border-dark-900 flex items-center justify-center text-coral-400 text-xs font-semibold"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="#f95738" stroke="none" />
                    ))}
                  </div>
                  <p className="text-white/40 text-xs mt-0.5">850+ happy families</p>
                </div>
              </div>
            </div>

            {/* Right — hero image collage */}
            <div className="relative h-[400px] lg:h-[500px] hidden sm:block animate-fade-in stagger-2">
              <div className="absolute top-0 right-0 w-64 lg:w-72 h-[280px] lg:h-80 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80"
                  alt="Birthday balloon decoration Bangalore"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 w-52 lg:w-60 h-[220px] lg:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80"
                  alt="Anniversary rose decoration Bangalore"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-800/90 backdrop-blur-md border border-white/10 rounded-xl p-4 w-40 lg:w-44 animate-float shadow-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle size={12} className="text-green-400" />
                  </div>
                  <span className="text-white text-xs font-medium">Just Booked!</span>
                </div>
                <p className="text-white/40 text-xs">Balloon Surprise · Bangalore</p>
                <p className="text-coral-400 font-semibold text-sm mt-1">₹1,499</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/5 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center animate-fade-in-up">
              <div className="font-display text-2xl sm:text-3xl font-bold text-coral-400">{s.value}</div>
              <div className="text-white/40 text-xs sm:text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-2">Browse by occasion</p>
          <h2 className="section-title">Explore our <span className="italic">categories</span></h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl h-[140px] sm:h-[180px] border border-white/5 hover:border-coral-500 transition-all block"
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-dark-900/50 group-hover:bg-dark-900/30 transition-colors z-10" />
              
              {/* Background Image */}
              <Image 
                src={cat.image_url || cat.image} 
                alt={cat.name} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              
              {/* Bottom Gradient & Text */}
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-20 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent pt-8 sm:pt-12">
                <p className="text-white font-bold text-sm sm:text-lg leading-tight group-hover:text-coral-400 transition-colors">{cat.name}</p>
                <p className="text-white/60 text-xs mt-1 line-clamp-1 hidden sm:block">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED SERVICES ── */}
      <section className="py-16 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-2">Most popular</p>
              <h2 className="section-title">Featured <span className="italic">services</span></h2>
            </div>
            <Link href="/services" className="btn-outline hidden sm:inline-flex">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured?.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/services" className="btn-outline">View all services <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-2">Why SLV Events</p>
            <h2 className="section-title mb-4">We go the <span className="italic text-coral-400">extra mile</span></h2>
            <p className="section-sub mb-10">
              We've decorated over 5,000 events in Bangalore. Every booking comes with our promise of quality, punctuality, and a setup that makes you go "wow."
            </p>
            <div className="grid sm:grid-cols-2 gap-5">
              {whyUs.map((item) => (
                <div key={item.title} className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-coral-500/10 border border-coral-500/20 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{item.title}</p>
                    <p className="text-white/40 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-80 md:h-full min-h-[400px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80"
              alt="SLV Events team decorating in Bangalore"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 bg-dark-900/70 backdrop-blur-md rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-coral-500 flex items-center justify-center text-white text-lg">🏆</div>
                <div>
                  <p className="text-white font-semibold text-sm">Bangalore's Most Trusted</p>
                  <p className="text-white/40 text-xs">4.9★ on Google · 850+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-12 sm:py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-2">What clients say</p>
            <h2 className="section-title">Real stories, <span className="italic">real smiles</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="card-dark p-5 sm:p-6 hover:border-coral-500/30 transition-all">
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={13} fill="#f95738" stroke="none" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-4 sm:mb-5 line-clamp-4">"{t.text}"</p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="w-9 h-9 rounded-full bg-coral-500/20 flex items-center justify-center text-coral-400 font-semibold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-white/30 text-xs">{t.occasion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl sm:rounded-3xl bg-coral-500 overflow-hidden p-6 sm:p-10 md:p-16 text-center">
          {/* bg pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 50%, #fff 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
          <div className="relative z-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Ready to create magic?
            </h2>
            <p className="text-white/70 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-lg mx-auto">
              Tell us your occasion and we'll handle everything.
            </p>
            <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-3">
              <Link href="/booking" className="bg-white text-coral-600 font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-coral-50 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base">
                Book Now <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/9663866778?text=Hi%20SLV%20Events!%20I%20want%20to%20book%20a%20decoration."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 border border-white/30 text-white font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl bg-coral-500 overflow-hidden p-10 md:p-16 text-center">
          {/* bg pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 50%, #fff 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
          <div className="relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to create magic?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-lg mx-auto">
              Tell us your occasion and we'll handle everything. Quick booking, professional setup, unforgettable result.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/booking" className="bg-white text-coral-600 font-semibold px-8 py-3.5 rounded-full hover:bg-coral-50 transition-colors inline-flex items-center gap-2">
                Book Now <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/9663866778?text=Hi%20SLV%20Events!%20I%20want%20to%20book%20a%20decoration."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 border border-white/30 text-white font-medium px-8 py-3.5 rounded-full hover:bg-white/20 transition-colors inline-flex items-center gap-2"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
