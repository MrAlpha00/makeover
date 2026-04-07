'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();

      if (!data?.session) {
        router.push('/admin/login');
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-dark-800 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-coral-500/30 border-t-coral-500 rounded-full animate-spin" />
      </div>
    );
  }

  return children;
}
