require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const watermarkPath = path.join(__dirname, '../public/assets/watermark/watermark.png');
const watermarkBuffer = fs.readFileSync(watermarkPath);

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const request = protocol.get(url, { timeout: 30000 }, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadImage(response.headers.location).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download image: ${response.statusCode}`));
      }
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    });
    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function applyWatermark(imageBuffer) {
  const img = await loadImage(imageBuffer);
  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  
  const watermark = await loadImage(watermarkBuffer);
  const wmWidth = Math.round(img.width * 0.15);
  const wmHeight = Math.round(watermark.height * (wmWidth / watermark.width));
  const padding = 20;
  ctx.drawImage(watermark, padding, canvas.height - wmHeight - padding, wmWidth, wmHeight);
  
  return canvas.toBuffer('image/jpeg', { quality: 0.92 });
}

async function uploadToStorage(buffer, fileName) {
  const { data, error } = await supabase.storage
    .from('designs')
    .upload(fileName, buffer, {
      contentType: 'image/jpeg',
      upsert: true
    });
  
  if (error) throw error;
  
  const { data: urlData } = supabase.storage
    .from('designs')
    .getPublicUrl(fileName);
  
  return urlData.publicUrl;
}

async function processDesigns() {
  console.log('Fetching all designs...');
  
  const { data: designs, error } = await supabase
    .from('designs')
    .select('id, title, slug, images');
  
  if (error) {
    console.error('Error fetching designs:', error);
    process.exit(1);
  }
  
  console.log(`Found ${designs.length} designs to process`);
  
  let processedCount = 0;
  let updatedCount = 0;
  let errorCount = 0;
  
  for (const design of designs) {
    if (!design.images || design.images.length === 0) {
      console.log(`Skipping design ${design.id} - no images`);
      continue;
    }
    
    console.log(`\nProcessing design: ${design.title} (${design.id})`);
    
    const newImages = [];
    const oldImages = [...design.images];
    
    for (let i = 0; i < design.images.length; i++) {
      const imageUrl = design.images[i];
      try {
        console.log(`  Processing image ${i + 1}/${design.images.length}...`);
        
        const imageBuffer = await downloadImage(imageUrl);
        const watermarkedBuffer = await applyWatermark(imageBuffer);
        
        const ext = 'jpg';
        const newFileName = `${design.slug}/${Date.now()}-${i}-watermarked.${ext}`;
        const newUrl = await uploadToStorage(watermarkedBuffer, newFileName);
        
        newImages.push(newUrl);
        console.log(`  ✓ Image ${i + 1} watermarked and uploaded`);
        
      } catch (err) {
        console.error(`  ✗ Error processing image ${i + 1}:`, err.message);
        newImages.push(imageUrl);
      }
    }
    
    const { error: updateError } = await supabase
      .from('designs')
      .update({ images: newImages })
      .eq('id', design.id);
    
    if (updateError) {
      console.error(`  ✗ Error updating design ${design.id}:`, updateError);
      errorCount++;
    } else {
      console.log(`  ✓ Design ${design.id} updated with ${newImages.length} watermarked images`);
      updatedCount++;
    }
    
    processedCount++;
    
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n========================================');
  console.log('Re-watermarking complete!');
  console.log(`Total designs processed: ${processedCount}`);
  console.log(`Successfully updated: ${updatedCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log('========================================\n');
}

processDesigns().catch(console.error);
