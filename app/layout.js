import './globals.css';

const baseUrl = 'https://partyhubs.in';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Party Hub — Best Party & Event Decorators in Bangalore | Book Now',
    template: '%s | Party Hub Bangalore',
  },
  description: 'Party Hub is Bangalore\'s #1 party decorator. Birthday decorations, balloon setups, theme parties, anniversary & corporate events. Same-day booking available! Call +91-63668 83984',
  keywords: [
    'party decorators Bangalore',
    'birthday decoration Bangalore',
    'balloon decoration Bangalore',
    'event decorators Bangalore',
    'theme decoration Bangalore',
    'anniversary decoration Bangalore',
    'baby shower decoration Bangalore',
    'corporate event decoration Bangalore',
    'party planner Bangalore',
    'party decoration near me',
    'birthday party decoration Bangalore',
    'balloon party decoration Bangalore',
    'theme party setup Bangalore',
    'kids birthday decoration Bangalore',
    'adult birthday party decoration Bangalore',
  ],
  authors: [{ name: 'Party Hub' }],
  creator: 'Party Hub',
  publisher: 'Party Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: baseUrl,
    siteName: 'Party Hub',
    title: 'Party Hub — Best Party & Event Decorators in Bangalore',
    description: 'Bangalore\'s top-rated party decorators. Birthday, balloon, theme & anniversary decorations. Same-day booking available!',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Party Hub - Party Decorations in Bangalore',
      },
    ],
    siteMetadata: {
      type: 'website',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Party Hub — Party Decorators Bangalore',
    description: 'Best party decorations in Bangalore. Birthday, balloon, theme & more!',
    images: ['/og-image.jpg'],
    creator: '@partyhubbangalore',
  },
  robots: {
    index: true,
    follow: true,
    followAllAngled: true,
    indexIfEmbedded: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION_CODE',
  },
  alternates: {
    canonical: baseUrl,
    languages: {
      'en-IN': baseUrl,
    },
  },
  category: 'Event Planning',
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#business`,
      name: 'Party Hub',
      description: 'Bangalore\'s premier party and event decoration service. Specializing in birthday parties, balloon decorations, theme setups, anniversary celebrations, and corporate events.',
      url: baseUrl,
      telephone: '+916366883984',
      priceRange: '₹₹',
      image: {
        '@type': 'ImageObject',
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
        width: 512,
        height: 512,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Bangalore',
        addressLocality: 'Bangalore',
        addressRegion: 'Karnataka',
        postalCode: '560001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 12.9716,
        longitude: 77.5946,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '21:00',
        },
      ],
      sameAs: [
        'https://www.instagram.com/slvevents',
        'https://www.facebook.com/slvevents',
      ],
      areaServed: {
        '@type': 'City',
        name: 'Bangalore',
      },
      serviceType: ['Party Decorations', 'Birthday Decorations', 'Balloon Decorations', 'Theme Parties', 'Anniversary Decorations', 'Corporate Events'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Party Decoration Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Birthday Party Decoration',
              description: 'Custom birthday party decorations in Bangalore',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Balloon Decoration',
              description: 'Balloon arch, columns, and balloon bouquet decorations',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Theme Party Decoration',
              description: 'Customized theme party setups',
            },
          },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '850',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'Party Hub',
      publisher: { '@id': `${baseUrl}/#business` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/services?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${baseUrl}/#webpage`,
      url: baseUrl,
      name: 'Party Hub - Party Decorators in Bangalore',
      isPartOf: { '@id': `${baseUrl}/#website` },
      about: { '@id': `${baseUrl}/#business` },
      description: 'Book the best party decorators in Bangalore. Birthday, balloon, theme, and anniversary decorations with same-day availability.',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: baseUrl,
          },
        ],
      },
    },
  ],
};

const faqData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does birthday decoration cost in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Birthday decoration costs in Bangalore start from ₹2,500 for basic balloon decorations and go up to ₹25,000+ for premium theme setups. Party Hub offers transparent pricing with customized packages for every budget.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide same-day birthday decoration in Bangalore?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Party Hub offers same-day birthday decoration services in Bangalore. We can set up decorations within 2-4 hours of booking, subject to availability. Call us at +91-63668 83984 for urgent bookings.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas in Bangalore do you serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Party Hub serves all areas of Bangalore including Whitefield, Koramangala, HSR Layout, Marathahalli, Indiranagar, JP Nagar, BTM Layout, and all other localities. Delivery charges may vary based on location.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I customize the birthday party decoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely! We offer fully customizable party decorations. You can choose themes, colors, balloon styles, and add-ons like photo backdrops, themed props, and special effects. Contact us to discuss your requirements.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in the birthday decoration package?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our birthday decoration packages typically include entrance decoration, centerpiece/table setup, balloon arch or bouquet, themed backdrop, and basic props. Premium packages include additional elements like LED lights, flower arrangements, and custom signage.',
      },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <meta name="geo.region" content="IN-KA" />
        <meta name="geo.placename" content="Bangalore" />
        <meta name="geo.position" content="12.9716;77.5946" />
        <meta name="ICBM" content="12.9716, 77.5946" />
        
        <meta name="twitter:app:country" content="IN" />
        <meta name="twitter:app:name:googleplay" content="Party Hub" />
        
        <link rel="alternate" type="application/rss+xml" title="Party Hub Blog" href={`${baseUrl}/rss.xml`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqData),
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
