import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer 
      className="border-t pt-16 pb-8"
      style={{ 
        background: 'var(--bg-secondary)',
        borderColor: 'var(--border-secondary)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div 
                className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white"
              >
                <Image src="/logo.png" alt="Party Hub" width={40} height={40} className="object-contain" />
              </div>
              <span className="font-display font-semibold text-lg" style={{ color: 'var(--text-primary)' }}>
                Party <span style={{ color: 'var(--coral)' }}>Hub</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
              Bangalore's most-loved party & event decorators. We turn moments into memories.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:text-coral-400"
                style={{ 
                  background: 'var(--border-secondary)',
                  color: 'var(--text-muted)',
                }}
              >
                <Instagram size={14} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:text-coral-400"
                style={{ 
                  background: 'var(--border-secondary)',
                  color: 'var(--text-muted)',
                }}
              >
                <Facebook size={14} />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:text-coral-400"
                style={{ 
                  background: 'var(--border-secondary)',
                  color: 'var(--text-muted)',
                }}
              >
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-medium mb-4" style={{ color: 'var(--text-primary)' }}>Services</h4>
            <ul className="space-y-2.5">
              {[
                ['Birthday Decoration', '/services?cat=Birthday'],
                ['Theme Decoration', '/services?cat=Theme+Decoration'],
                ['Anniversary Setup', '/services?cat=Anniversary'],
                ['Baby Shower', '/services?cat=Occasions'],
                ['Corporate Events', '/services?cat=Corporate'],
                ['Balloon Decoration', '/services'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm transition-colors hover:text-coral-400" style={{ color: 'var(--text-muted)' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-medium mb-4" style={{ color: 'var(--text-primary)' }}>Company</h4>
            <ul className="space-y-2.5">
              {[
                ['About Us', '/about'],
                ['Book Now', '/booking'],
                ['Contact Us', '/contact'],
                ['Blog & Tips', '/blog'],
                ['Privacy Policy', '/privacy'],
                ['Terms of Service', '/terms'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm transition-colors hover:text-coral-400" style={{ color: 'var(--text-muted)' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium mb-4" style={{ color: 'var(--text-primary)' }}>Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm" style={{ color: 'var(--text-muted)' }}>
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--coral)' }} />
                Bangalore, Karnataka, India
              </li>
              <li>
                <a 
                  href="tel:+916366883984" 
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-coral-400"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Phone size={14} className="flex-shrink-0" style={{ color: 'var(--coral)' }} />
                  +91-63668 83984
                </a>
              </li>
              <li>
                <a 
                  href="tel:+919986314095" 
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-coral-400"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Phone size={14} className="flex-shrink-0" style={{ color: 'var(--coral)' }} />
                  +91-99863 14095
                </a>
              </li>
              <li>
                <a 
                  href="tel:+917204937616" 
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-coral-400"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Phone size={14} className="flex-shrink-0" style={{ color: 'var(--coral)' }} />
                  +91-72049 37616
                </a>
              </li>
              <li>
                <a 
                  href="mailto:booking@partyhubs.in" 
                  className="flex items-center gap-2.5 text-sm transition-colors hover:text-coral-400"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <Mail size={14} className="flex-shrink-0" style={{ color: 'var(--coral)' }} />
                  booking@partyhubs.in
                </a>
              </li>
            </ul>
            <div 
              className="mt-5 p-3 rounded-xl"
              style={{ 
                background: 'var(--coral-10)',
                border: '1px solid var(--coral-20)',
              }}
            >
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--coral)', fontWeight: 500 }}>Open daily</span> · 9 AM – 9 PM
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>Same-day setup available</p>
            </div>
          </div>
        </div>

        <div 
          className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3"
          style={{ borderColor: 'var(--border-secondary)' }}
        >
          <p className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>© 2025 Party Hub. All rights reserved.</p>
          <p className="text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>Made with ♥ in Bangalore</p>
        </div>
      </div>
    </footer>
  );
}
