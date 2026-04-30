import Link from 'next/link';
import Image from 'next/image';
import WatermarkedImage from '../components/WatermarkedImage';
import { ArrowRight, Star, CheckCircle, Phone, Sparkles, Clock, Shield, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollRow from '../components/ScrollRow';
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
    location: 'Whitefield, Bangalore',
    text: "Party Hub transformed our living room overnight. The balloon setup was breathtaking and my daughter was in tears of joy. 10/10 would book again!",
    rating: 5,
    avatar: 'P',
  },
  {
    name: 'Rahul M.',
    occasion: 'Anniversary Setup',
    location: 'Koramangala, Bangalore',
    text: "Booked the rose room decoration for our 5th anniversary. The team arrived on time, worked quietly, and left the room looking like a dream. My wife loved it.",
    rating: 5,
    avatar: 'R',
  },
  {
    name: 'Ananya K.',
    occasion: 'Jungle Theme — 1st Birthday',
    location: 'HSR Layout, Bangalore',
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

const areas = [
  'Whitefield', 'Koramangala', 'HSR Layout', 'Marathahalli', 
  'Indiranagar', 'JP Nagar', 'BTM Layout', 'Electronic City'
];

export const metadata = {
  title: 'Party Hub | Best Party Decorators in Bangalore | Book Now',
  description: '#1 party decorators in Bangalore. Birthday decoration, balloon setups, theme parties & anniversary celebrations. Same-day booking available. Call +91-63668 83984!',
};

export default async function HomePage() {
  const supabase = createServerSupabaseClient();
  
  const { data: featured } = await supabase
    .from('designs')
    .select('*, categories(name)')
    .eq('featured', true)
    .limit(12);

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
        <div className="orb w-96 h-96 bg-coral-500 top-20 -left-32 opacity-50 sm:opacity-15 hidden md:block" />
        <div className="orb w-72 h-72 bg-coral-600 bottom-20 right-10 opacity-50 sm:opacity-15 hidden md:block" />

        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left */}
            <div>
              <div className="badge mb-5 animate-fade-up stagger-1 inline-flex items-center gap-2">
                <span>🎉</span> Bangalore's #1 Party Decorators
              </div>

              <h1 className="font-display text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-fade-up stagger-2 text-white">
                Create the{' '}
                <span className="text-coral-400 italic">perfect</span>{' '}
                celebration
              </h1>

              <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg animate-fade-up stagger-3 text-white/70">
                From <strong className="text-white">birthday decorations in Bangalore</strong> to stunning balloon setups — Party Hub turns every occasion into a memory worth keeping.
              </p>

              <div className="flex flex-col xs:flex-row flex-wrap gap-3 animate-fade-up stagger-4">
                <Link href="/booking" className="btn-coral text-base px-6 sm:px-7 py-3.5 text-center">
                  Book Now <ArrowRight size={16} className="inline ml-1" />
                </Link>
                <Link href="/designs" className="btn-outline text-base px-6 sm:px-7 py-3.5 text-center">
                  Explore Designs
                </Link>
                <a href="tel:+916366883984" className="btn-outline text-base px-6 sm:px-7 py-3.5 text-center">
                  <Phone size={15} className="inline mr-1" /> Call
                </a>
              </div>

              <div className="flex items-center gap-4 mt-8 animate-fade-up stagger-4">
                <div className="flex -space-x-2">
                  {['P', 'R', 'A', 'M'].map((l, i) => (
                    <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-coral-500/20 border-2 border-dark-900 text-coral-400">
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
                  <p className="text-xs mt-0.5 text-white/40">850+ happy families</p>
                </div>
              </div>
            </div>

            {/* Right — hero image collage */}
            <div className="relative h-[400px] lg:h-[500px] hidden sm:block animate-fade-in stagger-2">
              <div className="absolute top-0 right-0 w-64 lg:w-72 h-[280px] lg:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80"
                  alt="Birthday balloon decoration in Bangalore - Party Hub"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 w-52 lg:w-60 h-[220px] lg:h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&q=80"
                  alt="Anniversary rose decoration in Bangalore - Party Hub"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-4 w-40 lg:w-44 animate-float shadow-2xl bg-dark-800 border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-green-500/20">
                    <CheckCircle size={12} className="text-green-400" />
                  </div>
                  <span className="text-xs font-medium text-white">Just Booked!</span>
                </div>
                <p className="text-xs text-white/40">Balloon Surprise · Bangalore</p>
                <p className="text-sm font-semibold mt-1 text-coral-400">₹1,499</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="border-y border-white/5 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center animate-fade-in-up">
              <div className="font-display text-2xl sm:text-3xl font-bold text-coral-400">{s.value}</div>
              <div className="text-xs sm:text-sm mt-1 text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-2">Browse by occasion</p>
          <h2 className="section-title">Explore our <span className="italic">categories</span></h2>
          <p className="text-white/50 mt-2">Party decorations for every occasion in Bangalore</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/${cat.slug}`}
              className="group relative overflow-hidden rounded-2xl h-[140px] sm:h-[180px] block transition-all border border-white/5"
            >
              <div className="absolute inset-0 transition-colors z-10 group-hover:opacity-80 bg-black/50" />
              <WatermarkedImage 
                src={cat.image_url || cat.image} 
                alt={`${cat.name} decoration in Bangalore`}
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 z-20 bg-gradient-to-t from-black/80 to-transparent">
                <p className="font-bold text-sm sm:text-lg leading-tight group-hover:text-coral-400 transition-colors text-white">
                  {cat.name}
                </p>
                <p className="text-xs mt-1 line-clamp-1 hidden sm:block text-white/70">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Internal Links Section */}
        <div className="mt-8 bg-dark-800/50 rounded-2xl p-6 border border-white/5">
          <p className="text-sm text-white/50 mb-3">Quick links:</p>
          <div className="flex flex-wrap gap-2">
            <Link href="/birthday" className="text-sm px-3 py-1.5 rounded-full bg-dark-700 text-white/70 hover:text-coral-400 hover:bg-coral-500/10 transition-colors">
              Birthday Decoration Bangalore
            </Link>
            <Link href="/balloon-decoration" className="text-sm px-3 py-1.5 rounded-full bg-dark-700 text-white/70 hover:text-coral-400 hover:bg-coral-500/10 transition-colors">
              Balloon Decoration Bangalore
            </Link>
            <Link href="/anniversary" className="text-sm px-3 py-1.5 rounded-full bg-dark-700 text-white/70 hover:text-coral-400 hover:bg-coral-500/10 transition-colors">
              Anniversary Decoration Bangalore
            </Link>
            <Link href="/baby-shower" className="text-sm px-3 py-1.5 rounded-full bg-dark-700 text-white/70 hover:text-coral-400 hover:bg-coral-500/10 transition-colors">
              Baby Shower Decoration Bangalore
            </Link>
            <Link href="/contact" className="text-sm px-3 py-1.5 rounded-full bg-dark-700 text-white/70 hover:text-coral-400 hover:bg-coral-500/10 transition-colors">
              Event Decorators Bangalore
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED SERVICES ── */}
      <section className="bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 sm:mb-10 gap-4">
            <div>
              <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-2">Most popular</p>
              <h2 className="section-title">Featured <span className="italic">services</span></h2>
            </div>
            <Link href="/services" className="btn-outline hidden sm:inline-flex">
              View all <ArrowRight size={14} />
            </Link>
          </div>

          {/* 3 Scrollable Rows */}
          <div className="space-y-6">
            {[0, 1, 2].map((rowIndex) => (
              <ScrollRow key={rowIndex} services={featured} rowIndex={rowIndex} />
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link href="/services" className="btn-outline">View all services <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-2">Why Party Hub</p>
            <h2 className="section-title mb-4">We go the <span className="italic text-coral-400">extra mile</span></h2>
            <p className="section-sub mb-8 sm:mb-10">
              We've decorated over 5,000 events in Bangalore. Every booking comes with our promise of quality, punctuality, and a setup that makes you go "wow."
            </p>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {whyUs.map((item) => (
                <div key={item.title} className="flex gap-3 p-3 rounded-xl bg-dark-800">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-coral-500/10 border border-coral-500/20">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white">{item.title}</p>
                    <p className="text-sm mt-0.5 leading-relaxed hidden sm:block text-white/40">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-64 sm:h-80 md:h-full min-h-[300px] md:min-h-[400px] rounded-2xl overflow-hidden order-1 md:order-2 border border-white/5">
            <Image
              src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80"
              alt="Party Hub team setting up birthday decoration in Bangalore"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-xl p-4 bg-dark-800/80 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg bg-coral-500">🏆</div>
                <div>
                  <p className="font-semibold text-sm text-white">Bangalore's Most Trusted</p>
                  <p className="text-xs text-white/40">4.9★ on Google · 850+ reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AREAS WE SERVE ── */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-dark-800/50 rounded-2xl p-8 border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <MapPin size={24} className="text-coral-400" />
            <div>
              <h2 className="text-xl font-display font-semibold text-white">Areas We Serve in Bangalore</h2>
              <p className="text-white/50 text-sm">Same-day decoration service available across all areas</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {areas.map((area) => (
              <span key={area} className="px-4 py-2 rounded-full bg-dark-700 text-white/70 border border-white/5 text-sm">
                {area}
              </span>
            ))}
            <span className="px-4 py-2 rounded-full bg-coral-500/10 text-coral-400 border border-coral-500/20 text-sm font-medium">
              + More Areas
            </span>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center mb-8 sm:mb-12">
            <p className="text-coral-400 text-sm font-medium tracking-wider uppercase mb-2">What clients say</p>
            <h2 className="section-title">Real stories, <span className="italic">real smiles</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="card p-5 sm:p-6 hover:border-coral-500/30 transition-all">
                <div className="flex items-center gap-1 mb-3 sm:mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={13} fill="#f95738" stroke="none" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4 sm:mb-5 line-clamp-4 text-white/70">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm bg-coral-500/20 text-coral-400">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.occasion} · {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-10 md:p-16 text-center bg-coral-500">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 50%, #fff 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }} />
          <div className="relative z-10">
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
              Ready to create magic?
            </h2>
            <p className="text-white/80 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-lg mx-auto">
              Book your <strong>party decoration in Bangalore</strong> today. Same-day service available!
            </p>
            <div className="flex flex-col xs:flex-row flex-wrap justify-center gap-3">
              <Link href="/booking" className="font-semibold px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-colors inline-flex items-center justify-center gap-2 text-sm sm:text-base bg-white text-coral-600">
                Book Now <ArrowRight size={16} />
              </Link>
              <a href="https://wa.me/6366883984?text=Hi%20Party%20Hub!%20I%20want%20to%20book%20a%20decoration." className="font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-full inline-flex items-center justify-center gap-2 text-sm sm:text-base bg-white/20 text-white">
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
