import { createClient as createServerSupabaseClient } from '@/lib/supabaseServer';
import Link from 'next/link';
import { Plus, ArrowRight, TrendingUp, FolderTree, Image as ImageIcon, CalendarCheck } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();

  // Get total designs
  const { count: totalDesigns } = await supabase
    .from('designs')
    .select('*', { count: 'exact', head: true });

  // Get total categories
  const { count: totalCategories } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true });

  // Get total bookings
  const { count: totalBookings } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true });

  // Get new bookings today
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  
  const { count: newBookingsToday } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startOfToday.toISOString());

  // Get recent 5 bookings
  const { data: recentBookings } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return <span className="bg-coral-100 text-coral-600 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">New</span>;
      case 'contacted':
        return <span className="bg-amber-100 text-amber-600 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">Contacted</span>;
      case 'confirmed':
        return <span className="bg-green-100 text-green-600 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">Confirmed</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Dashboard</h1>
          <p className="text-white/50 mt-1 text-sm sm:text-base">Overview of your business metrics.</p>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <Link href="/admin/bookings" className="flex-1 sm:flex-none btn bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-3 sm:px-4 rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2 text-sm">
            View Bookings
          </Link>
          <Link href="/admin/designs/new" className="flex-1 sm:flex-none btn bg-coral-500 hover:bg-coral-600 text-white font-medium py-2 px-3 sm:px-4 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-sm">
            <Plus size={16} />
            <span className="hidden sm:inline">Add Design</span>
            <span className="sm:hidden">Add</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="bg-dark-700 p-4 sm:p-5 rounded-xl border border-white/5 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-coral-500/10 text-coral-400 flex items-center justify-center flex-shrink-0">
            <ImageIcon size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-white/50 font-medium">Designs</p>
            <p className="text-xl sm:text-2xl font-bold text-white">{totalDesigns || 0}</p>
          </div>
        </div>
        
        <div className="bg-dark-700 p-4 sm:p-5 rounded-xl border border-white/5 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
            <FolderTree size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-white/50 font-medium">Categories</p>
            <p className="text-xl sm:text-2xl font-bold text-white">{totalCategories || 0}</p>
          </div>
        </div>

        <div className="bg-dark-700 p-4 sm:p-5 rounded-xl border border-white/5 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center flex-shrink-0">
            <CalendarCheck size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-white/50 font-medium">Bookings</p>
            <p className="text-xl sm:text-2xl font-bold text-white">{totalBookings || 0}</p>
          </div>
        </div>

        <div className="bg-dark-700 p-4 sm:p-5 rounded-xl border border-white/5 flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0">
            <TrendingUp size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm text-white/50 font-medium">Today</p>
            <p className="text-xl sm:text-2xl font-bold text-white">{newBookingsToday || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-dark-700 rounded-xl border border-white/5 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold text-white">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm font-medium text-coral-400 hover:text-coral-500 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-white/50 text-xs sm:text-sm font-medium border-b border-white/5">
                <th className="p-3 sm:p-4 pl-4 sm:pl-6">Client</th>
                <th className="p-3 sm:p-4 hidden sm:table-cell">Phone</th>
                <th className="p-3 sm:p-4">Service</th>
                <th className="p-3 sm:p-4 hidden md:table-cell">Date</th>
                <th className="p-3 sm:p-4 pr-4 sm:pr-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings && recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-white/5 hover:bg-white/5 transition-colors text-sm">
                    <td className="p-3 sm:p-4 pl-4 sm:pl-6 font-medium text-white">{booking.name}</td>
                    <td className="p-3 sm:p-4 text-white/60 hidden sm:table-cell">{booking.phone}</td>
                    <td className="p-3 sm:p-4 text-white/60 max-w-[120px] sm:max-w-[200px] truncate">{booking.service}</td>
                    <td className="p-3 sm:p-4 text-white/60 hidden md:table-cell">
                      {booking.event_date ? new Date(booking.event_date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-3 sm:p-4 pr-4 sm:pr-6">{getStatusBadge(booking.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-white/30">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
