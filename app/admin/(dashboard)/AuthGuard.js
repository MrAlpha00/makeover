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
    return <div className="min-h-screen bg-gray-50 text-gray-900" />;
  }

  return children;
}
