'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export function getCleanImageUrl(url) {
  if (!url || typeof url !== 'string') return url;
  
  // Strip any watermark mentions from the url to fetch the clean variant.
  // E.g., /123-0-watermarked.jpg -> /123-0.jpg
  // Also catches partyone text if it exists.
  let cleanUrl = url.replace(/-watermarked(\.[a-zA-Z0-9]+(\?.*)?)$/i, '$1');
  cleanUrl = cleanUrl.replace(/partyone/i, '');
  return cleanUrl;
}

export default function WatermarkedImage({
  src,
  alt,
  className = '',
  fill,
  width,
  height,
  sizes,
  priority,
  ...props
}) {
  const originalSrc = src;
  const [currentSrc, setCurrentSrc] = useState(getCleanImageUrl(src));
  const [hasError, setHasError] = useState(false);

  // If the src changes from parent, reset
  useEffect(() => {
    setCurrentSrc(getCleanImageUrl(src));
    setHasError(false);
  }, [src]);

  return (
    <>
      <Image
        src={currentSrc}
        alt={alt || "Image"}
        fill={fill}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        priority={priority}
        unoptimized
        onError={() => {
          // If we fail loading the stripped clean variant, fallback to the verbatim DB URL so it doesn't 404
          if (!hasError && currentSrc !== originalSrc) {
            setHasError(true);
            setCurrentSrc(originalSrc || '/assets/placeholder.jpg');
          }
        }}
        {...props}
      />
      {/* UI Watermark layer */}
      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 pointer-events-none z-10 w-16 sm:w-20 md:w-24 opacity-40 mix-blend-plus-lighter">
        <Image
          src="/assets/watermark/watermark.png"
          alt="Watermark"
          width={150}
          height={50}
          className="w-full h-auto object-contain drop-shadow-md"
          unoptimized
        />
      </div>
    </>
  );
}
