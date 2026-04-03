import './globals.css';

export const metadata = {
  metadataBase: new URL('https://slvevents.in'),
  title: {
    default: 'SLV Events — Best Party & Event Decorators in Bangalore',
    template: '%s | SLV Events Bangalore',
  },
  description: 'SLV Events is Bangalore\'s top-rated party decorator. Birthday decorations, balloon surprises, theme setups, anniversary & corporate events. Book now — same-day setup available!',
  keywords: [
    'party decorators Bangalore',
    'birthday decoration Bangalore',
    'balloon decoration Bangalore',
    'event decorators Bangalore',
    'theme decoration Bangalore',
    'anniversary decoration Bangalore',
    'baby shower decoration Bangalore',
    'corporate event decoration Bangalore',
    'SLV Events',
    'party planner Bangalore',
  ],
  openGraph: {
    title: 'SLV Events — Best Party & Event Decorators in Bangalore',
    description: 'Bangalore\'s top-rated party & event decorators. Birthday, anniversary, corporate & theme setups. Book online in minutes.',
    url: 'https://slvevents.in',
    siteName: 'SLV Events',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SLV Events — Party Decorators Bangalore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SLV Events — Best Party Decorators in Bangalore',
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
    canonical: 'https://slvevents.in',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Local Business Schema — critical for Google ranking */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'SLV Events',
              description: 'Top-rated party and event decorators in Bangalore.',
              url: 'https://slvevents.in',
              telephone: '+91-XXXXXXXXXX',
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
              image: 'https://slvevents.in/og-image.jpg',
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
