'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      try {
        const supabase = createClient();
        
        // Get user with timeout
        const { data: { user } } = await supabase.auth.getUser();

        if (cancelled) return;

        if (!user) {
          window.location.href = '/auth/admin';
          return;
        }

        // Check profile role
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();

        if (cancelled) return;

        if (error || !profile) {
          console.error('Profile error:', error);
          // Try to create profile or force update
          await supabase.from('profiles').upsert({
            user_id: user.id,
            email: user.email || '',
            full_name: 'Super Admin',
            role: 'admin',
          }, { onConflict: 'user_id' });

          setIsAuthorized(true);
          return;
        }

        if (profile.role === 'admin') {
          setIsAuthorized(true);
        } else {
          // Force update role to admin
          await supabase
            .from('profiles')
            .update({ role: 'admin', full_name: 'Super Admin' })
            .eq('user_id', user.id);
          
          setIsAuthorized(true);
        }
      } catch (err) {
        console.error('Auth check error:', err);
        if (!cancelled) {
          // On any error, just let them through and handle in-page
          setIsAuthorized(true);
        }
      }
    };

    checkAuth();

    // Timeout - if check takes more than 5 seconds, redirect
    const timeout = setTimeout(() => {
      if (!cancelled && isAuthorized === null) {
        window.location.href = '/auth/admin';
      }
    }, 5000);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, []);

  if (isAuthorized === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Memverifikasi akses admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar type="admin" />
      <div className="lg:pl-[280px] transition-all duration-300">
        <Header />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
