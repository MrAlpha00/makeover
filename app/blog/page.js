import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const blogPosts = [
  {
    slug: 'birthday-decoration-ideas-bangalore-2026',
    title: 'Top 15 Birthday Decoration Ideas in Bangalore for 2026',
    excerpt: 'Discover the most trending birthday decoration ideas in Bangalore. From balloon arches to themed setups, make your celebration unforgettable with these expert tips.',
    category: 'Birthday Decoration',
    readTime: '8 min read',
    date: 'January 15, 2026',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    featured: true,
  },
  {
    slug: 'balloon-decoration-price-bangalore',
    title: 'Balloon Decoration Price Guide in Bangalore 2026',
    excerpt: 'Complete guide to balloon decoration prices in Bangalore. Learn what affects the cost and how to get the best deals for your party.',
    category: 'Balloon Decoration',
    readTime: '6 min read',
    date: 'January 10, 2026',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&q=80',
    featured: true,
  },
  {
    slug: 'best-party-themes-2026',
    title: 'Best Party Themes for 2026: Trending Ideas in Bangalore',
    excerpt: 'From enchanted forests to neon nights, explore the hottest party themes trending in Bangalore for 2026. Get inspired for your next celebration!',
    category: 'Theme Decoration',
    readTime: '7 min read',
    date: 'January 5, 2026',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
    featured: true,
  },
];

export const metadata = {
  title: 'Party Decoration Blog | Tips & Ideas | Party Hub Bangalore',
  description: 'Expert tips on party decoration, birthday ideas, and event planning in Bangalore. Read our blog for trending decoration ideas, price guides, and party planning tips.',
  keywords: ['party decoration blog bangalore', 'birthday decoration tips', 'party planning ideas', 'balloon decoration guide'],
  openGraph: {
    title: 'Party Decoration Blog | Party Hub Bangalore',
    description: 'Expert tips on party decoration and event planning in Bangalore.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />
      
      <section className="pt-32 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-coral-500/5 blur-[100px] rounded-full w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="badge mb-4">Our Blog</span>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Party Decoration <span className="italic text-coral-400">Tips & Ideas</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Expert advice on party decorations, trending themes, and event planning in Bangalore
          </p>
        </div>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Featured Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {blogPosts.filter(p => p.featured).map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group bg-dark-800/50 border border-white/5 rounded-2xl overflow-hidden hover:border-coral-500/30 transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
                </div>
                <div className="p-6">
                  <span className="text-xs font-medium text-coral-400 bg-coral-500/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <h2 className="text-xl font-display font-semibold text-white mt-3 mb-2 group-hover:text-coral-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-white/50 text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* More Posts */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.filter(p => !p.featured).map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group bg-dark-800/50 border border-white/5 rounded-2xl overflow-hidden hover:border-coral-500/30 transition-all"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-coral-400">{post.category}</span>
                  <h3 className="text-lg font-display font-semibold text-white mt-2 mb-2 group-hover:text-coral-400 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-xs text-white/40 gap-3">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-dark-800/50 border border-white/5 rounded-2xl p-8">
            <h2 className="text-2xl font-display font-semibold text-white mb-3">
              Need Professional Help?
            </h2>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">
              Get expert party decoration services in Bangalore. Same-day booking available!
            </p>
            <Link href="/booking" className="btn-coral">
              Book Now <ArrowRight size={16} className="inline ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
