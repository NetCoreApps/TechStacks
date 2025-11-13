'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/stores/useAppStore';

export function useRequireAuth() {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login/github');
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
}
