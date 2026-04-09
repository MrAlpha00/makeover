import { supabaseAdmin } from '@/lib/supabase-admin';

const blogSlugs = [
  'birthday-decoration-ideas-bangalore-2026',
  'balloon-decoration-price-bangalore',
  'best-party-themes-2026',
];

export default async function sitemap() {
  const baseUrl = 'https://partyhubs.in';

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/designs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/booking`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const { data: categories } = await supabaseAdmin.from('categories').select('slug, updated_at');
  const categoryPages = (categories || []).map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: new Date(cat.updated_at) || new Date(),
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  const { data: subcategories } = await supabaseAdmin.from('subcategories').select('slug, category_slug, updated_at');
  const subcategoryPages = (subcategories || []).map((sub) => ({
    url: `${baseUrl}/${sub.category_slug}/${sub.slug}`,
    lastModified: new Date(sub.updated_at) || new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const { data: designs } = await supabaseAdmin.from('designs').select('slug, category_slug, subcategory_slug, updated_at');

  const designPages = (designs || []).map((design) => ({
    url: `${baseUrl}/services/${design.slug}`,
    lastModified: new Date(design.updated_at) || new Date(),
    changeFrequency: 'weekly',
    priority: 0.75,
    images: design.images?.[0] ? [{ url: design.images[0], caption: design.title }] : [],
  }));

  return [...staticPages, ...blogPages, ...categoryPages, ...subcategoryPages, ...designPages];
}
