import { createServerSupabaseClient } from '@/lib/supabase';
import SettingsClient from './SettingsClient';

export const metadata = {
  title: 'Settings | Admin',
};

export default async function SettingsPage() {
  const supabase = createServerSupabaseClient();

  const { data: settingsData } = await supabase
    .from('settings')
    .select('*')
    .limit(1)
    .single();

  return (
    <div className="max-w-4xl mx-auto">
      <SettingsClient initialSettings={settingsData || null} />
    </div>
  );
}
