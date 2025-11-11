import { JsonServiceClient } from '@servicestack/client'
import { cookies } from 'next/headers'

const serverClient = new JsonServiceClient(process.env.API_URL || 'http://localhost:5000')

// Add auth from cookies
serverClient.requestFilter = async (req) => {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('ss-tok')
  if (authCookie && req.headers && typeof (req.headers as any).set === 'function') {
    ;(req.headers as any).set('Cookie', `ss-tok=${authCookie.value}`)
  }
}

export { serverClient }
