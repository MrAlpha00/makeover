'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'py-2 sm:py-3 bg-dark-900/95 backdrop-blur-md border-b border-white/5' 
          : 'py-4 sm:py-5 bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-white">
            <Image src="/logo.png" alt="Party Hub" width={40} height={40} className="object-contain" />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight text-white">
            Party <span className="text-coral-400">Hub</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors hover:text-coral-400 text-white/70"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+916366883984"
            className="text-sm font-medium transition-colors hover:text-coral-400 flex items-center gap-1.5 text-white/70"
          >
            <Phone size={14} />
            Call Now
          </a>
          <Link href="/booking" className="btn-coral text-sm px-5 py-2.5">
            Book Now
          </Link>
        </div>

        {/* Mobile: Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors bg-dark-800 border border-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? (
              <X size={20} className="text-white" />
            ) : (
              <Menu size={20} className="text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden px-4 py-4 bg-dark-800 border-t border-white/5">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-sm font-medium border-b border-white/5 text-white/70"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <a
              href="tel:+916366883984"
              className="btn-outline w-full justify-center py-3 border-white/10 text-white"
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
