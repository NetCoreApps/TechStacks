'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/lib/store/auth-store'
import { client } from './client'
import { GetUserInfo, Authenticate } from '@/lib/dtos'

export async function checkAuthStatus() {
  try {
    // Try to get current user info from session
    const request = new GetUserInfo({ userName: 'me' })
    const response = await client.get(request)

    if (response.userName) {
      return {
        userId: String(response.id),
        userName: response.userName,
        displayName: response.userName,
        avatarUrl: response.avatarUrl,
      }
    }
    return null
  } catch (error) {
    return null
  }
}

export async function signOut() {
  try {
    // Call ServiceStack logout endpoint
    await client.post(new Authenticate({ provider: 'logout' }))
    return true
  } catch (error) {
    return false
  }
}

export function useAuth() {
  const { user, isAuthenticated, setUser, logout } = useAuthStore()

  useEffect(() => {
    // Check auth status on mount
    const checkAuth = async () => {
      const userData = await checkAuthStatus()
      setUser(userData)
    }

    if (!user) {
      checkAuth()
    }
  }, [user, setUser])

  const handleSignOut = async () => {
    await signOut()
    logout()
  }

  const signInWithGitHub = () => {
    // Redirect to ServiceStack GitHub OAuth
    window.location.href = '/auth/github'
  }

  return {
    user,
    isAuthenticated,
    signInWithGitHub,
    signOut: handleSignOut,
  }
}
