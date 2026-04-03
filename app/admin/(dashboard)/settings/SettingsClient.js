'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, Save, Phone, MapPin, Clock, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsClient({ initialSettings }) {

  const router = useRouter();
  
  const [formData, setFormData] = useState({
    id: initialSettings?.id || null,
    whatsapp_number: initialSettings?.whatsapp_number || '+910000000000',
    contact_phone: initialSettings?.contact_phone || '+910000000000',
    address: initialSettings?.address || 'Bengaluru, Karnataka',
    working_hours: initialSettings?.working_hours || 'Mon - Sun, 9AM to 9PM',
    instagram_url: initialSettings?.instagram_url || 'https://instagram.com/',
    facebook_url: initialSettings?.facebook_url || 'https://facebook.com/'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.id) {
        const { error } = await supabase
          .from('settings')
          .update(formData)
          .eq('id', formData.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('settings')
          .insert([formData])
          .select()
          .single();
        if (error) throw error;
        setFormData({ ...formData, id: data.id });
      }

      showToast('Settings saved successfully');
      router.refresh(); // Refresh to affect server fetchers 
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Settings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage global business contact information.</p>
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="btn bg-coral-500 hover:bg-coral-600 text-white font-medium py-2 px-6 rounded-xl shadow-sm transition-all flex items-center gap-2 disabled:opacity-70"
        >
          {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Saving...</> : <><Save size={16} /> Save Changes</>}
        </button>
      </div>

      {toast && (
        <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium z-50 ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}>
          {toast.message}
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-8">
        
        {/* Contact Info */}
        <section>
          <div className="flex items-center gap-2 text-gray-900 font-bold mb-4 border-b border-gray-100 pb-2">
            <Phone size={18} className="text-coral-500" /> WhatsApp & Calling
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
              <input type="text" required value={formData.whatsapp_number} onChange={(e) => setFormData({...formData, whatsapp_number: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none" placeholder="+919876543210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Contact Phone</label>
              <input type="text" required value={formData.contact_phone} onChange={(e) => setFormData({...formData, contact_phone: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none" placeholder="+919876543210" />
            </div>
          </div>
        </section>

        {/* Location & Time */}
        <section>
          <div className="flex items-center gap-2 text-gray-900 font-bold mb-4 border-b border-gray-100 pb-2">
            <MapPin size={18} className="text-coral-500" /> Location Details
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">Address</label>
              <input type="text" required value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none" placeholder="123 Main St, Bengaluru" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1"><Clock size={14}/> Working Hours</label>
              <input type="text" required value={formData.working_hours} onChange={(e) => setFormData({...formData, working_hours: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none" placeholder="Mon-Sun 9AM - 9PM" />
            </div>
          </div>
        </section>

        {/* Social */}
        <section>
          <div className="flex items-center gap-2 text-gray-900 font-bold mb-4 border-b border-gray-100 pb-2">
            <Share2 size={18} className="text-coral-500" /> Social Links
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input type="url" value={formData.instagram_url} onChange={(e) => setFormData({...formData, instagram_url: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input type="url" value={formData.facebook_url} onChange={(e) => setFormData({...formData, facebook_url: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-coral-400 focus:ring-1 focus:ring-coral-400 outline-none" placeholder="https://facebook.com/..." />
            </div>
          </div>
        </section>

      </div>
    </form>
  );
}
