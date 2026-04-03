import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function GET() {
  try {
    const { data: settings, error } = await supabaseAdmin
      .from('settings')
      .select('*')
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows found"
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Default fallback values if no settings are in DB yet
    const defaults = {
      whatsapp_number: '+919876543210',
      contact_phone: '+919876543210',
      address: 'Bengaluru, Karnataka',
      working_hours: 'Mon - Sun, 9AM to 9PM',
      instagram_url: 'https://instagram.com/',
      facebook_url: 'https://facebook.com/'
    };

    return NextResponse.json({ ...defaults, ...(settings || {}) });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}
