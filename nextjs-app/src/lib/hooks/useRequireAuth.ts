'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/stores/useAppStore';

export function useRequireAuth(redirectTo?: string) {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated());

  useEffect(() => {
    if (!isAuthenticated && redirectTo) {
      // Only redirect if explicitly specified to avoid infinite loops
      router.push(redirectTo);
    }
  }, [isAuthenticated, router, redirectTo]);

  return isAuthenticated;
}
