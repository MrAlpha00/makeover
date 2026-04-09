import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import CategoryPageClient from './CategoryPageClient';
import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';
import { notFound } from 'next/navigation';

const categorySEOData = {
  'birthday': {
    title: 'Birthday Decoration in Bangalore | Party Hub | Book Now',
    description: 'Book affordable birthday decoration in Bangalore! Balloon setups, theme parties & surprise arrangements. Same-day service available. Call Party Hub at +91-63668 83984.',
    keywords: ['birthday decoration bangalore', 'birthday party setup bangalore', 'kids birthday decoration', 'adult birthday decoration'],
    h1: 'Birthday Decorations in Bangalore',
    heroText: 'Make every birthday unforgettable with our stunning party decorations',
    areas: ['Whitefield', 'Koramangala', 'HSR Layout', 'Marathahalli', 'Indiranagar', 'JP Nagar'],
  },
  'balloon-decoration': {
    title: 'Balloon Decoration in Bangalore | Party Hub | All Events',
    description: 'Stunning balloon decorations for birthday, anniversary & party events in Bangalore. Arch, columns & bouquets. Best prices guaranteed. Book today!',
    keywords: ['balloon decoration bangalore', 'balloon arch bangalore', 'balloon bouquet', 'balloon party decoration'],
    h1: 'Balloon Decorations in Bangalore',
    heroText: 'Transform any space with our beautiful balloon arrangements',
    areas: ['Whitefield', 'Koramangala', 'BTM Layout', 'Marathahalli', 'Electronic City'],
  },
  'anniversary': {
    title: 'Anniversary Decoration in Bangalore | Party Hub | Romantic Setup',
    description: 'Romantic anniversary decoration in Bangalore. Rose petals, candlelight & themed setups. Make your special day unforgettable. Book Party Hub!',
    keywords: ['anniversary decoration bangalore', 'romantic decoration bangalore', 'anniversary setup', 'celebration decoration'],
    h1: 'Anniversary Decorations in Bangalore',
    heroText: 'Celebrate your love with romantic anniversary decorations',
    areas: ['Indiranagar', 'Koramangala', 'Whitefield', 'JP Nagar', 'Marathahalli'],
  },
  'baby-shower': {
    title: 'Baby Shower Decoration in Bangalore | Party Hub | Gender Reveal',
    description: 'Beautiful baby shower decorations in Bangalore. Pink, blue & gender reveal themes. Soft pastels & balloon setups. Book your celebration now!',
    keywords: ['baby shower decoration bangalore', 'baby reveal bangalore', 'baby celebration', 'newborn decoration'],
    h1: 'Baby Shower Decorations in Bangalore',
    heroText: 'Welcome your little one with beautiful baby shower decorations',
    areas: ['Whitefield', 'Koramangala', 'HSR Layout', 'Sarjapur', 'Bellandur'],
  },
  'theme-decoration': {
    title: 'Theme Party Decoration in Bangalore | Party Hub | Custom Themes',
    description: 'Custom theme party decorations in Bangalore. Princess, superhero, jungle & more themes. Create magical celebrations. Book Party Hub!',
    keywords: ['theme party decoration bangalore', 'themed birthday bangalore', 'custom themes', 'party themes'],
    h1: 'Theme Party Decorations in Bangalore',
    heroText: 'Bring any theme to life with our custom party decorations',
    areas: ['Koramangala', 'Whitefield', 'Marathahalli', 'JP Nagar', 'BTM Layout'],
  },
  'corporate': {
    title: 'Corporate Event Decoration in Bangalore | Party Hub | Office Events',
    description: 'Professional corporate event decoration in Bangalore. Product launches, office parties & team events. Make your business events memorable!',
    keywords: ['corporate event decoration bangalore', 'office party decoration', 'business event decoration', 'company events'],
    h1: 'Corporate Event Decorations in Bangalore',
    heroText: 'Elevate your corporate events with professional decorations',
    areas: ['MG Road', 'Brigade Road', 'Koramangala', 'Electronic City', 'Manyata Tech Park'],
  },
  'wedding': {
    title: 'Wedding Decoration in Bangalore | Party Hub | Bridal Setup',
    description: 'Stunning wedding decorations in Bangalore. Reception, engagement & bridal shower setups. Make your wedding day magical. Book Party Hub!',
    keywords: ['wedding decoration bangalore', 'bridal shower decoration', 'reception decoration', 'wedding setup'],
    h1: 'Wedding Decorations in Bangalore',
    heroText: 'Create your dream wedding with stunning decorations',
    areas: ['Majestic', 'City Center', 'Koramangala', 'Whitefield', 'Hebbal'],
  },
};

export async function generateMetadata({ params }) {
  const supabase = createServerSupabaseClient();
  const { data: category } = await supabase.from('categories').select('name, description, slug').eq('slug', params.category).single();
  
  if (!category) return { title: 'Not Found | Party Hub' };
  
  const seoData = categorySEOData[params.category] || {};
  
  return {
    title: seoData.title || `${category.name} Decorations in Bangalore | Party Hub`,
    description: seoData.description || category.description,
    keywords: seoData.keywords || [],
    openGraph: {
      title: seoData.title || `${category.name} Decorations | Party Hub`,
      description: seoData.description || category.description,
      type: 'website',
      locale: 'en_IN',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    },
    alternates: {
      canonical: `https://partyhubs.in/${params.category}`,
    },
  };
}

export default async function CategoryPage({ params }) {
  const supabase = createServerSupabaseClient();
  
  const { data: currentCategory, error: catError } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', params.category)
    .single();

  if (catError || !currentCategory) {
    notFound();
  }

  const { data: allCategories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  const { data: allSubcategories } = await supabase
    .from('subcategories')
    .select('*')
    .order('sort_order', { ascending: true });

  const categoriesWithSubcategories = allCategories.map(cat => ({
    ...cat,
    subcategories: allSubcategories.filter(sub => sub.category_id === cat.id)
  }));

  const seoData = categorySEOData[params.category] || {};
  const areasText = seoData.areas?.join(', ') || 'Bangalore';

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <WhatsAppButton />
      
      {/* SEO Content Section */}
      <section className="pt-32 pb-4 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-coral-500/5 blur-[100px] rounded-full w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {currentCategory.icon && (
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-dark-800 border border-white/10 text-3xl mb-6">
              {currentCategory.icon}
            </div>
          )}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            {seoData.h1 || `${currentCategory.name} Decorations`}
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            {seoData.heroText || currentCategory.description}
          </p>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-dark-800/50 border border-white/5 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-display font-semibold text-white mb-4">
              Best {currentCategory.name} Decorations in Bangalore
            </h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Looking for <strong className="text-coral-400">party decorations in Bangalore</strong>? Party Hub offers the best {currentCategory.name.toLowerCase()} decoration services across all areas including {areasText}. 
              Whether you need balloon arches, themed setups, or custom decorations, our expert team delivers stunning results that make your celebration unforgettable.
            </p>
            <p className="text-white/60 leading-relaxed mb-4">
              We provide <strong className="text-coral-400">same-day {currentCategory.name.toLowerCase()} decoration services</strong> in Bangalore, ensuring you never miss a special moment. 
              Our decorations are perfect for home celebrations, party halls, restaurants, and outdoor venues across {areasText}.
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="text-sm px-3 py-1 rounded-full bg-coral-500/10 text-coral-400 border border-coral-500/20">
                Same-Day Service
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-coral-500/10 text-coral-400 border border-coral-500/20">
                Affordable Prices
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-coral-500/10 text-coral-400 border border-coral-500/20">
                Expert Decorators
              </span>
              <span className="text-sm px-3 py-1 rounded-full bg-coral-500/10 text-coral-400 border border-coral-500/20">
                Custom Themes
              </span>
            </div>
          </div>
        </div>
      </section>

      <CategoryPageClient 
        categories={categoriesWithSubcategories} 
        currentCategory={currentCategory} 
      />

      <Footer />
    </div>
  );
}
