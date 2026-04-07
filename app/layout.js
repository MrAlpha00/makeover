import './globals.css';

export const metadata = {
  metadataBase: new URL('https://partyhubs.in'),
  title: {
    default: 'Party Hub — Best Party & Event Decorators in Bangalore',
    template: '%s | Party Hub Bangalore',
  },
  description: 'Party Hub is Bangalore\'s top-rated party decorator. Birthday decorations, balloon surprises, theme setups, anniversary & corporate events. Book now — same-day setup available!',
  keywords: [
    'party decorators Bangalore',
    'birthday decoration Bangalore',
    'balloon decoration Bangalore',
    'event decorators Bangalore',
    'theme decoration Bangalore',
    'anniversary decoration Bangalore',
    'baby shower decoration Bangalore',
    'corporate event decoration Bangalore',
    'Party Hub',
    'party planner Bangalore',
  ],
  openGraph: {
    title: 'Party Hub — Best Party & Event Decorators in Bangalore',
    description: 'Bangalore\'s top-rated party & event decorators. Birthday, anniversary, corporate & theme setups. Book online in minutes.',
    url: 'https://partyhubs.in',
    siteName: 'Party Hub',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Party Hub — Party Decorators Bangalore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Party Hub — Best Party Decorators in Bangalore',
    description: 'Bangalore\'s top-rated party decorator. Book your dream setup today!',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  verification: {
    google: 'ADD_YOUR_GOOGLE_SEARCH_CONSOLE_CODE_HERE',
  },
  alternates: {
    canonical: 'https://partyhubs.in',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        {/* Local Business Schema — critical for Google ranking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Party Hub',
              description: 'Top-rated party and event decorators in Bangalore.',
              url: 'https://partyhubs.in',
              telephone: '+91-6366883984',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bangalore',
                addressRegion: 'Karnataka',
                addressCountry: 'IN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 12.9716,
                longitude: 77.5946,
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
                opens: '09:00',
                closes: '21:00',
              },
              priceRange: '₹₹',
              servesCuisine: 'Event Services',
              areaServed: 'Bangalore',
              image: 'https://partyhubs.in/og-image.jpg',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '850',
              },
            }),
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
