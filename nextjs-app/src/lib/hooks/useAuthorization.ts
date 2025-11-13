'use client';

import { useAppStore } from '@/lib/stores/useAppStore';

export function useAuthorization() {
  const { sessionInfo, isAdmin } = useAppStore();

  const canEditTechnology = (tech: any) => {
    if (!sessionInfo) return false;
    if (isAdmin()) return true;
    if (tech.isLocked) return false;
    return sessionInfo.userAuthId === tech.ownerId;
  };

  const canEditTechStack = (stack: any) => {
    if (!sessionInfo) return false;
    if (isAdmin()) return true;
    if (stack.isLocked) return false;
    return sessionInfo.userAuthId === stack.ownerId;
  };

  const canEditPost = (post: any) => {
    if (!sessionInfo) return false;
    if (isAdmin()) return true;
    return sessionInfo.userId === post.userId;
  };

  const isOrganizationModerator = (org: any) => {
    if (isAdmin()) return true;
    const member = org.members?.find((m: any) => m.userId === sessionInfo?.userId);
    return member?.isModerator || false;
  };

  const isOrganizationMember = (org: any) => {
    if (!sessionInfo) return false;
    return org.members?.some((m: any) => m.userId === sessionInfo.userId) || false;
  };

  return {
    canEditTechnology,
    canEditTechStack,
    canEditPost,
    isOrganizationModerator,
    isOrganizationMember,
    isAdmin
  };
}
