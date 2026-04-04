'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Search, Download, Trash2, Phone, Mail, MapPin, Calendar, ChevronDown, PhoneCall, CheckCircle } from 'lucide-react';

export default function BookingsClient({ initialBookings }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedId, setExpandedId] = useState(null);

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
      (b.service && b.service.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const exportCSV = () => {
    if (filteredBookings.length === 0) return alert('No data to export');

    const headers = ['ID', 'Name', 'Phone', 'Email', 'Service', 'Date', 'Venue', 'Guests', 'Message', 'Status', 'Created At'];
    
    const escapeCsv = (str) => {
      if (!str) return '""';
      return `"${String(str).replace(/"/g, '""')}"`;
    };

    const rowData = filteredBookings.map(b => [
      escapeCsv(b.id),
      escapeCsv(b.name),
      escapeCsv(b.phone),
      escapeCsv(b.email),
      escapeCsv(b.service),
      escapeCsv(b.event_date ? new Date(b.event_date).toLocaleDateString() : ''),
      escapeCsv(b.venue),
      escapeCsv(b.guests),
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

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      new: { bg: 'bg-coral-500', text: 'text-white', label: 'New' },
      contacted: { bg: 'bg-amber-500', text: 'text-white', label: 'Contacted' },
      confirmed: { bg: 'bg-green-500', text: 'text-white', label: 'Confirmed' },
      cancelled: { bg: 'bg-gray-500', text: 'text-white', label: 'Cancelled' },
    };
    const config = statusConfig[status] || statusConfig.new;
    return (
      <span className={`${config.bg} ${config.text} text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full`}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">{filteredBookings.length} total bookings</p>
        </div>
        <button 
          onClick={exportCSV}
          className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-700 font-medium py-2.5 px-4 rounded-xl shadow-sm border border-gray-200 transition-all flex items-center justify-center gap-2 text-sm"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-4 right-4 left-4 sm:left-auto sm:w-80 px-4 py-3 rounded-xl shadow-lg text-white font-medium z-50 flex items-center gap-2 animate-slide-up ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.type !== 'error' && <CheckCircle size={18} />}
          {toast.message}
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, phone or service..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-coral-400 focus:ring-2 focus:ring-coral-100 outline-none transition-all"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-coral-400 focus:ring-2 focus:ring-coral-100 outline-none transition-all bg-white"
        >
          <option value="All">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-gray-400 shadow-sm">
            No bookings found.
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div 
              key={booking.id} 
              className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 ${expandedId === booking.id ? 'ring-2 ring-coral-400' : ''}`}
            >
              {/* Card Header */}
              <div 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-coral-100 flex items-center justify-center text-coral-600 font-bold">
                      {booking.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{booking.name}</h3>
                      <p className="text-sm text-gray-500">{new Date(booking.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={booking.status} />
                  <ChevronDown size={20} className={`text-gray-400 transition-transform ${expandedId === booking.id ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Expanded Content */}
              {expandedId === booking.id && (
                <div className="px-4 pb-4 space-y-4 border-t border-gray-100 pt-4 animate-fade-in">
                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <a 
                      href={`tel:${booking.phone}`}
                      className="flex-1 bg-coral-500 text-white py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-coral-600 transition-colors"
                    >
                      <PhoneCall size={16} /> Call
                    </a>
                    {booking.email && (
                      <a 
                        href={`mailto:${booking.email}`}
                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                      >
                        <Mail size={16} /> Email
                      </a>
                    )}
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDelete(booking.id); }}
                      className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Phone size={16} className="text-gray-400" />
                      <span className="text-gray-700">{booking.phone}</span>
                    </div>
                    {booking.email && (
                      <div className="flex items-center gap-3 text-sm">
                        <Mail size={16} className="text-gray-400" />
                        <span className="text-gray-700">{booking.email}</span>
                      </div>
                    )}
                    {booking.service && (
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-400 font-medium">Service:</span>
                        <span className="text-coral-600 font-medium">{booking.service}</span>
                      </div>
                    )}
                    {booking.event_date && (
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-gray-700">{new Date(booking.event_date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                      </div>
                    )}
                    {booking.venue && (
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="text-gray-700">{booking.venue}</span>
                      </div>
                    )}
                    {booking.guests && (
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-gray-400 font-medium">Guests:</span>
                        <span className="text-gray-700">{booking.guests}</span>
                      </div>
                    )}
                    {booking.message && (
                      <div className="bg-gray-50 p-3 rounded-xl text-sm text-gray-600">
                        <span className="text-gray-400 font-medium">Note: </span>{booking.message}
                      </div>
                    )}
                  </div>

                  {/* Status Update */}
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Update Status</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['new', 'contacted', 'confirmed', 'cancelled'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(booking.id, status)}
                          className={`py-2 px-3 rounded-lg text-xs font-medium uppercase tracking-wider transition-all ${
                            booking.status === status
                              ? status === 'new' ? 'bg-coral-500 text-white' :
                                status === 'contacted' ? 'bg-amber-500 text-white' :
                                status === 'confirmed' ? 'bg-green-500 text-white' :
                                'bg-gray-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm font-medium border-b border-gray-100">
                <th className="p-4 pl-6">Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Service</th>
                <th className="p-4">Event Details</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors text-sm">
                  <td className="p-4 pl-6">
                    <div className="font-medium text-gray-900">{new Date(booking.created_at).toLocaleDateString()}</div>
                    <div className="text-xs text-gray-500">{new Date(booking.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-coral-100 flex items-center justify-center text-coral-600 font-bold text-sm">
                        {booking.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-900">{booking.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-700">{booking.phone}</div>
                    {booking.email && <div className="text-xs text-gray-500">{booking.email}</div>}
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-coral-600">{booking.service || '-'}</span>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-600">
                      {booking.event_date && <div>{new Date(booking.event_date).toLocaleDateString()}</div>}
                      {booking.venue && <div className="text-xs text-gray-500">{booking.venue}</div>}
                    </div>
                  </td>
                  <td className="p-4">
                    <select 
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                      className={`text-xs font-bold uppercase tracking-wider rounded-lg px-3 py-2 border-0 cursor-pointer outline-none ${
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
                      <a href={`tel:${booking.phone}`} className="w-8 h-8 rounded-lg flex items-center justify-center bg-coral-100 text-coral-600 hover:bg-coral-200 transition-colors" title="Call">
                        <PhoneCall size={15} />
                      </a>
                      <button onClick={() => handleDelete(booking.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-400">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
