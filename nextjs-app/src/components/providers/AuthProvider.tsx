'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/lib/stores/useAppStore';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialize = useAppStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return <>{children}</>;
}
