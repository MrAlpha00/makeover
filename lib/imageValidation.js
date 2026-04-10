'use client';

import imageCompression from 'browser-image-compression';
import { supabase } from './supabaseClient';

const VALID_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export const IMAGE_LIMITS = {
  DESIGN: 200 * 1024,
  CATEGORY: 600 * 1024,
};

export function validateImage(file, maxSizeBytes) {
  if (!file) {
    throw new Error('No file selected');
  }

  if (!VALID_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPEG, PNG, GIF, or WebP images only.');
  }

  if (file.size > maxSizeBytes) {
    const maxKB = Math.round(maxSizeBytes / 1024);
    throw new Error(`Image exceeds ${maxKB}KB limit. Please choose a smaller image.`);
  }

  return true;
}

export async function compressImageForUpload(file, maxSizeBytes) {
  const maxSizeKB = Math.round(maxSizeBytes / 1024);
  const targetMB = Math.max(0.05, maxSizeKB / 1024 * 0.85);

  try {
    const options = {
      maxSizeMB: targetMB,
      useWebWorker: true,
      maxWidthOrHeight: 1500,
      fileType: file.type,
    };

    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Image compression failed:', error);
    throw new Error('Failed to process image. Please try a different image.');
  }
}

export async function uploadImage(file, folder, customFileName = null) {
  const fileExt = file.name.split('.').pop() || 'jpg';
  const fileName = customFileName || `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const fullPath = `${folder}/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('designs')
    .upload(fullPath, file);

  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }

  const { data: { publicUrl } } = supabase.storage.from('designs').getPublicUrl(fullPath);
  return publicUrl;
}

export async function deleteImage(imageUrl) {
  if (!imageUrl) return;

  try {
    const fileName = imageUrl.split('/storage/v1/object/public/designs/')[1];
    if (fileName) {
      await supabase.storage.from('designs').remove([fileName]);
    }
  } catch (error) {
    console.error('Failed to delete old image:', error);
  }
}
