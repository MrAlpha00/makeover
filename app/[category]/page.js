import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import categories from '../../data/categories';
import { ArrowRight } from 'lucide-react';

export default function CategoryPage({ params }) {
  const categorySlug = params.category;
  const category = categories.find(c => c.slug === categorySlug);

  if (!category) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">404</h1>
          <p className="text-white/50 text-xl mb-8">Category not found</p>
          <Link href="/services" className="bg-coral-500 hover:bg-coral-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
            View All Services
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-coral-500/5 blur-[100px] rounded-full w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-800 border border-white/10 text-3xl mb-6">
            {category.icon}
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            {category.name} <span className="italic text-coral-400">Decorations</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            {category.description}
          </p>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="py-12 px-4 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.subcategories.map((sub) => (
              <Link href={`/${category.slug}/${sub.slug}`} key={sub.id} className="group flex flex-col bg-dark-800/50 border border-white/5 rounded-2xl overflow-hidden hover:border-coral-500/30 transition-all hover:bg-dark-800/80">
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-dark-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <img src={sub.image} alt={sub.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-display font-semibold text-white mb-2">{sub.name}</h3>
                  <p className="text-white/50 mb-6 flex-1">{sub.description}</p>
                  
                  <div className="flex items-center text-coral-400 font-medium group-hover:text-coral-300 transition-colors">
                    <span>View Designs</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
