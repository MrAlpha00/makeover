import { createServerSupabaseClient } from '@/lib/supabase';
import BookingsClient from './BookingsClient';

export const metadata = {
  title: 'Manage Bookings | Admin',
};

export default async function BookingsPage() {
  const supabase = createServerSupabaseClient();

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-6xl mx-auto">
      <BookingsClient initialBookings={bookings || []} />
    </div>
  );
}
