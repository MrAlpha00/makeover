'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, FolderTree, Tag, Image, CalendarCheck, Settings, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Categories', href: '/admin/categories', icon: FolderTree },
    { name: 'Subcategories', href: '/admin/subcategories', icon: Tag },
    { name: 'Designs', href: '/admin/designs', icon: Image },
    { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const NavLink = ({ link }) => {
    const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
    return (
      <Link
        key={link.name}
        href={link.href}
        onClick={() => setIsOpen(false)}
        className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 font-medium text-sm group ${
          isActive
            ? 'bg-gradient-to-r from-coral-500 to-coral-600 text-white shadow-lg shadow-coral-500/25'
            : 'text-white/60 hover:bg-white/10 hover:text-white'
        }`}
      >
        <div className="flex items-center gap-3">
          <link.icon size={20} className={isActive ? 'text-white' : 'text-white/50 group-hover:text-white/80'} />
          <span>{link.name}</span>
        </div>
        {isActive && <ChevronRight size={16} className="text-white/60" />}
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-[#1a1a1a] text-white flex flex-col z-50
        transition-transform duration-300 ease-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <h1 className="font-display text-xl font-bold tracking-wide">
              Party <span className="italic text-coral-400">Hub</span>
            </h1>
            <p className="text-white/40 text-xs uppercase tracking-widest font-semibold">Admin Panel</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-10 h-10 rounded-xl bg-dark-800 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden lg:block px-6 pt-5 pb-4 border-b border-white/10">
          <h1 className="font-display text-2xl font-bold tracking-wide">
            SLV <span className="italic text-coral-400">Events</span>
          </h1>
          <p className="text-white/40 text-xs mt-0.5 uppercase tracking-widest font-semibold">Admin Panel</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink key={link.name} link={link} />
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}

export function MobileMenuButton({ isOpen, setIsOpen }) {
  if (isOpen) return null;
  return (
    <button
      onClick={() => setIsOpen(true)}
      className="lg:hidden fixed top-3 left-3 z-50 w-11 h-11 rounded-xl bg-dark-700/90 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-dark-600 transition-colors shadow-lg"
    >
      <Menu size={20} className="text-white" />
    </button>
  );
}
