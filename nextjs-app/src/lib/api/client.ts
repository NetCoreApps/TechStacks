import { JsonServiceClient } from '@servicestack/client';

// Base URL configuration
const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    // Server-side: use internal URL or relative path
    return process.env.INTERNAL_API_URL || '/';
  }
  // Client-side: use relative path (served by same origin or proxied)
  return '/';
};

export const client = new JsonServiceClient(getBaseUrl());

// Configure global settings
client.onAuthenticationRequired = () => {
  // Redirect to login
  if (typeof window !== 'undefined') {
    window.location.href = '/login/github';
  }
};

// Export for convenience
export default client;
