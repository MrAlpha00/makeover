import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-coral-500 flex items-center justify-center">
                <span className="text-white font-display font-bold text-sm">S</span>
              </div>
              <span className="font-display font-semibold text-white text-lg">
                SLV <span className="text-coral-400">Events</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-4">
              Bangalore's most-loved party & event decorators. We turn moments into memories.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-coral-500/20 flex items-center justify-center text-white/40 hover:text-coral-400 transition-all">
                <Instagram size={14} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-coral-500/20 flex items-center justify-center text-white/40 hover:text-coral-400 transition-all">
                <Facebook size={14} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 hover:bg-coral-500/20 flex items-center justify-center text-white/40 hover:text-coral-400 transition-all">
                <Youtube size={14} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Services</h4>
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
                  <Link href={href} className="text-white/40 hover:text-coral-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {[
                ['About Us', '/about'],
                ['Book Now', '/booking'],
                ['Contact', '/contact'],
                ['Privacy Policy', '/privacy'],
                ['Terms of Service', '/terms'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-white/40 hover:text-coral-400 text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium text-sm mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-white/40 text-sm">
                <MapPin size={14} className="mt-0.5 text-coral-400 flex-shrink-0" />
                Bangalore, Karnataka, India
              </li>
              <li>
                <a href="tel:+91XXXXXXXXXX" className="flex items-center gap-2.5 text-white/40 hover:text-coral-400 text-sm transition-colors">
                  <Phone size={14} className="text-coral-400 flex-shrink-0" />
                  +91-XXXX-XXXXXX
                </a>
              </li>
              <li>
                <a href="mailto:hello@slvevents.in" className="flex items-center gap-2.5 text-white/40 hover:text-coral-400 text-sm transition-colors">
                  <Mail size={14} className="text-coral-400 flex-shrink-0" />
                  hello@slvevents.in
                </a>
              </li>
            </ul>
            <div className="mt-5 p-3 rounded-xl bg-coral-500/5 border border-coral-500/10">
              <p className="text-xs text-white/40">
                <span className="text-coral-400 font-medium">Open daily</span> · 9 AM – 9 PM
              </p>
              <p className="text-xs text-white/30 mt-1">Same-day setup available</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/25 text-xs">© 2025 SLV Events. All rights reserved.</p>
          <p className="text-white/25 text-xs">Made with ♥ in Bangalore</p>
        </div>
      </div>
    </footer>
  );
}
