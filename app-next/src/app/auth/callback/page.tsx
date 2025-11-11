'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store/auth-store'
import { checkAuthStatus } from '@/lib/api/auth'

export default function AuthCallbackPage() {
  const router = useRouter()
  const setUser = useAuthStore((state) => state.setUser)

  useEffect(() => {
    const handleCallback = async () => {
      // Check if user is authenticated after OAuth redirect
      const user = await checkAuthStatus()

      if (user) {
        setUser(user)
        // Redirect to homepage or intended destination
        const returnUrl = new URLSearchParams(window.location.search).get('returnUrl') || '/'
        router.push(returnUrl)
      } else {
        // Authentication failed, redirect to home
        router.push('/')
      }
    }

    handleCallback()
  }, [router, setUser])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="mb-4 text-4xl">🔐</div>
        <h2 className="text-2xl font-bold mb-2">Completing sign in...</h2>
        <p className="text-muted-foreground">Please wait while we set up your account.</p>
      </div>
    </div>
  )
}
