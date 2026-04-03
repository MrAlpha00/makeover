import { createServerSupabaseClient } from '../../../../lib/supabase';
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Overview of your business metrics.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/bookings" className="btn bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-xl shadow-sm border border-gray-200 transition-all flex items-center gap-2">
            View All Bookings
          </Link>
          <Link href="/admin/designs/new" className="btn bg-coral-500 hover:bg-coral-600 text-white font-medium py-2 px-4 rounded-xl shadow-sm transition-all flex items-center gap-2">
            <Plus size={18} />
            Add New Design
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center">
            <ImageIcon size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Total Designs</p>
            <p className="text-3xl font-bold text-gray-900">{totalDesigns || 0}</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center">
            <FolderTree size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Total Categories</p>
            <p className="text-3xl font-bold text-gray-900">{totalCategories || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center">
            <CalendarCheck size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-gray-900">{totalBookings || 0}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-coral-50 text-coral-500 flex items-center justify-center">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">New Bookings Today</p>
            <p className="text-3xl font-bold text-gray-900">{newBookingsToday || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
          <Link href="/admin/bookings" className="text-sm font-medium text-coral-500 hover:text-coral-600 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm font-medium border-b border-gray-100">
                <th className="p-4 pl-6">Client Name</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Service</th>
                <th className="p-4">Event Date</th>
                <th className="p-4 pr-6">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings && recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors text-sm">
                    <td className="p-4 pl-6 font-medium text-gray-900">{booking.name}</td>
                    <td className="p-4 text-gray-600">{booking.phone}</td>
                    <td className="p-4 text-gray-600 max-w-[200px] truncate">{booking.service}</td>
                    <td className="p-4 text-gray-600">
                      {booking.event_date ? new Date(booking.event_date).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4 pr-6">{getStatusBadge(booking.status)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">
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
