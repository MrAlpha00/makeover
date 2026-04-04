'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark-900/95 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-coral-500 flex items-center justify-center">
            <span className="text-white font-display font-bold text-sm">S</span>
          </div>
          <span className="font-display font-semibold text-white text-lg tracking-tight">
            SLV <span className="text-coral-400">Events</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-white/60 hover:text-white text-sm font-medium transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:+919663866778"
            className="text-white/60 hover:text-coral-400 transition-colors flex items-center gap-1.5 text-sm"
          >
            <Phone size={14} />
            Call Now
          </a>
          <Link href="/booking" className="btn-coral text-sm px-5 py-2.5">
            Book Now
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-dark-800 border-t border-white/5 px-4 py-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-white/70 hover:text-white border-b border-white/5 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="btn-coral w-full justify-center mt-4"
            onClick={() => setOpen(false)}
          >
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}
