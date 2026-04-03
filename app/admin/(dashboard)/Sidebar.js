'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderTree, Tag, Image, CalendarCheck, Settings, LogOut } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

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

  return (
    <div className="w-64 bg-[#1a1a1a] text-white min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <h1 className="font-display text-2xl font-bold tracking-wide">
          SLV <span className="italic text-coral-400">Events</span>
        </h1>
        <p className="text-white/40 text-xs mt-1 uppercase tracking-widest font-semibold">Admin Panel</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/admin' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                isActive
                  ? 'bg-coral-500 text-white'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <link.icon size={18} className={isActive ? 'text-white' : 'text-white/50'} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex flex-row items-center gap-3 px-4 py-3 w-full text-left text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
