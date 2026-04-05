'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { href: '/designs', label: 'Designs' },
  { href: '/services', label: 'Services' },
  { href: '/services?cat=Birthday', label: 'Birthday' },
  { href: '/services?cat=Theme+Decoration', label: 'Themes' },
  { href: '/services?cat=Anniversary', label: 'Anniversary' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'py-2 sm:py-3' 
          : 'py-4 sm:py-5'
        }
      `}
      style={{ 
        background: scrolled ? 'var(--bg-primary)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-secondary)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--coral)' }}
          >
            <span className="text-white font-display font-bold text-sm">S</span>
          </div>
          <span className="font-display font-semibold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
            SLV <span style={{ color: 'var(--coral)' }}>Events</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors hover:text-coral-400"
              style={{ color: 'var(--text-secondary)' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA + Theme Toggle */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <a
            href="tel:+919663866778"
            className="text-sm font-medium transition-colors hover:text-coral-400 flex items-center gap-1.5"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Phone size={14} />
            Call Now
          </a>
          <Link href="/booking" className="btn-coral text-sm px-5 py-2.5">
            Book Now
          </Link>
        </div>

        {/* Mobile: Theme Toggle + Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            style={{ 
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-primary)',
            }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X size={20} style={{ color: 'var(--text-primary)' }} />
            ) : (
              <Menu size={20} style={{ color: 'var(--text-primary)' }} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div 
          className="lg:hidden px-4 py-4 border-t"
          style={{ 
            background: 'var(--bg-secondary)',
            borderColor: 'var(--border-primary)',
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-sm font-medium border-b transition-colors"
              style={{ 
                color: 'var(--text-secondary)',
                borderColor: 'var(--border-secondary)',
              }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <a
              href="tel:+919663866778"
              className="btn-outline w-full justify-center py-3"
              style={{ borderColor: 'var(--border-primary)' }}
            >
              <Phone size={15} /> Call Now
            </a>
            <Link
              href="/booking"
              className="btn-coral w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
