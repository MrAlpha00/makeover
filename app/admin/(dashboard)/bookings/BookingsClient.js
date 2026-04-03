'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabaseClient';
import { Search, Download, Trash2 } from 'lucide-react';

export default function BookingsClient({ initialBookings }) {
  const supabase = createClient();
  const [bookings, setBookings] = useState(initialBookings);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStatusChange = async (id, newStatus) => {
    const backup = [...bookings];
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));

    const { error } = await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
    if (error) {
      setBookings(backup);
      alert('Failed to update status: ' + error.message);
    } else {
      showToast('Status updated');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this booking entirely?')) return;
    try {
      const { error } = await supabase.from('bookings').delete().eq('id', id);
      if (error) throw error;
      setBookings(bookings.filter(b => b.id !== id));
      showToast('Booking deleted', 'error');
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchSearch = 
      b.name.toLowerCase().includes(search.toLowerCase()) || 
      b.phone.includes(search) || 
      b.service.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const exportCSV = () => {
    if (filteredBookings.length === 0) return alert('No data to export');

    const headers = ['ID', 'Name', 'Phone', 'Service', 'Date', 'Time', 'Location', 'Message', 'Status', 'Created At'];
    
    const escapeCsv = (str) => {
      if (!str) return '""';
      return `"${String(str).replace(/"/g, '""')}"`;
    };

    const rowData = filteredBookings.map(b => [
      escapeCsv(b.id),
      escapeCsv(b.name),
      escapeCsv(b.phone),
      escapeCsv(b.service),
      escapeCsv(b.event_date ? new Date(b.event_date).toLocaleDateString() : ''),
      escapeCsv(b.event_time),
      escapeCsv(b.location),
      escapeCsv(b.message),
      escapeCsv(b.status),
      escapeCsv(new Date(b.created_at).toLocaleString())
    ]);

    const csvContent = [headers.join(','), ...rowData.map(r => r.join(','))].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `slv_bookings_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage leads and customer requests.</p>
        </div>
        <button 
          onClick={exportCSV}
          className="btn bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-xl shadow-sm border border-gray-200 transition-all flex items-center gap-2"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium z-50 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-wrap gap-4 items-center mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, phone or service..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none w-full sm:w-auto min-w-[150px]"
        >
          <option value="All">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm font-medium border-b border-gray-100">
                <th className="p-4 pl-6">Submitted</th>
                <th className="p-4">Customer</th>
                <th className="p-4 w-1/3">Service Details</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors text-sm">
                  <td className="p-4 pl-6 text-gray-500">
                    <div>{new Date(booking.created_at).toLocaleDateString()}</div>
                    <div className="text-xs">{new Date(booking.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td className="p-4 text-gray-900">
                    <div className="font-bold">{booking.name}</div>
                    <div className="text-gray-500 mt-0.5">{booking.phone}</div>
                  </td>
                  <td className="p-4 text-gray-600">
                    <div className="font-medium text-gray-900 line-clamp-1">{booking.service}</div>
                    <div className="text-xs mt-1 text-gray-500">
                      <span className="font-semibold text-gray-700">Date:</span> {booking.event_date ? new Date(booking.event_date).toLocaleDateString() : 'N/A'} {booking.event_time && `at ${booking.event_time}`} <br/>
                      <span className="font-semibold text-gray-700">Loc:</span> {booking.location || 'N/A'}
                    </div>
                  </td>
                  <td className="p-4">
                    <select 
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className={`text-xs font-bold uppercase tracking-wider rounded-md px-2 py-1.5 border-0 focus:ring-2 focus:ring-coral-400 cursor-pointer outline-none ${
                        booking.status === 'new' ? 'bg-coral-100 text-coral-700' :
                        booking.status === 'contacted' ? 'bg-amber-100 text-amber-700' :
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 pr-6">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleDelete(booking.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete Booking">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-400">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
