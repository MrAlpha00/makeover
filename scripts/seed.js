const { createClient } = require('@supabase/supabase-js');
const categoriesData = require('../data/categories.js');
const servicesData = require('../data/services.js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Did you run with --env-file=.env.local ?\nMake sure SUPABASE_SERVICE_KEY is defined in .env.local.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function seed() {
  console.log('🌱 Starting Database Seed...');

  // Clear existing data for a clean seed
  console.log('Clearing existing data (for clean seed)...');
  await supabase.from('designs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('subcategories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  const categoryMap = {}; // slug -> uuid
  const subcategoryMap = {}; // categorySlug_subcategorySlug -> uuid

  // 1. Categories and Subcategories
  for (const cat of categoriesData) {
    const { data: cData, error: cErr } = await supabase
      .from('categories')
      .insert({
        name: cat.name,
        slug: cat.slug,
        icon: cat.icon,
        image_url: cat.image,
        description: cat.description
      })
      .select('id')
      .single();

    if (cErr) {
      console.error(`Error inserting category ${cat.slug}:`, cErr);
      continue;
    }
    categoryMap[cat.slug] = cData.id;
    console.log(`✅ Inserted Category: ${cat.name}`);

    if (cat.subcategories && cat.subcategories.length > 0) {
      for (const sub of cat.subcategories) {
        const { data: sData, error: sErr } = await supabase
          .from('subcategories')
          .insert({
            category_id: cData.id,
            name: sub.name,
            slug: sub.slug,
            image_url: sub.image,
            description: sub.description
          })
          .select('id')
          .single();

        if (sErr) {
          console.error(`Error inserting subcategory ${sub.slug}:`, sErr);
          continue;
        }
        subcategoryMap[`${cat.slug}_${sub.slug}`] = sData.id;
        console.log(`   └─ Inserted Subcategory: ${sub.name}`);
      }
    }
  }

  // 2. Designs (Services)
  console.log('\nInserting designs...');
  for (const service of servicesData) {
    const cId = categoryMap[service.categorySlug] || null;
    const sId = subcategoryMap[`${service.categorySlug}_${service.subcategorySlug}`] || null;

    if (!cId) {
      console.log(`⚠️ Warning: Category ${service.categorySlug} not found for service ${service.slug}. Skipping.`);
      continue;
    }

    const { error: dErr } = await supabase
      .from('designs')
      .insert({
        category_id: cId,
        subcategory_id: sId,
        title: service.title,
        slug: service.slug,
        short_desc: service.shortDesc,
        description: service.description,
        price: service.price,
        original_price: service.originalPrice || null,
        discount: service.discount || 0,
        images: service.gallery || (service.image ? [service.image] : []),
        inclusions: service.inclusions || [],
        addons: service.addOns || [],
        tags: service.tags || [],
        rating: service.rating || 4.9,
        reviews: service.reviews || 0,
        featured: service.featured || false
      });

    if (dErr) {
      console.error(`Error inserting design ${service.slug}:`, dErr);
    } else {
      console.log(`✅ Inserted Design: ${service.title}`);
    }
  }

  console.log('\n🎉 Seed complete!');
}

seed().catch(console.error);
