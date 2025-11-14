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
// Note: We don't automatically redirect on auth required to avoid infinite loops
// Components should handle authentication state and show login UI when needed
client.onAuthenticationRequired = async () => {
  // Don't automatically redirect - let the UI handle it
  console.warn('Authentication required - user should log in');
};

// Export for convenience
export default client;
