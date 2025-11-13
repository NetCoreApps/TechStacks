'use client';

import { useAppStore } from '@/lib/stores/useAppStore';

export function useAuth() {
  const {
    sessionInfo,
    isAuthenticated,
    isAdmin,
    setSessionInfo
  } = useAppStore();

  return {
    sessionInfo,
    isAuthenticated: isAuthenticated(),
    isAdmin: isAdmin(),
    user: sessionInfo?.userName,
    userId: sessionInfo?.userId,
    roles: sessionInfo?.roles || [],
    setSessionInfo
  };
}
