import { JsonServiceClient } from '@servicestack/client'

export const baseUrl =
  typeof window === 'undefined'
    ? process.env.API_URL || 'http://localhost:5000'
    : process.env.NEXT_PUBLIC_API_URL || ''

export const client = new JsonServiceClient(baseUrl)

// Get auth token from cookies
function getAuthToken() {
  if (typeof window === 'undefined') {
    return null
  }
  const match = document.cookie.match(/ss-tok=([^;]+)/)
  return match ? match[1] : null
}

// Add auth token to requests
client.requestFilter = (req) => {
  const token = getAuthToken()
  if (token && req.headers && typeof (req.headers as any).set === 'function') {
    ;(req.headers as any).set('Authorization', `Bearer ${token}`)
  }
}

// Handle errors globally
client.exceptionFilter = (res, error) => {
  if (error.responseStatus?.errorCode === 'Unauthorized') {
    // Redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/github'
    }
  }
  throw error
}
