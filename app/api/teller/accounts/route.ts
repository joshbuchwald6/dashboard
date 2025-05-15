import { NextResponse } from 'next/server'
import { tellerClient } from '@/lib/teller'
import { getAccessToken } from '../save-access-token/route'

export async function GET() {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return NextResponse.json({ error: 'No access token' }, { status: 401 })
    }
    // Use the access token for auth
    const { data } = await tellerClient.get('/accounts', {
      auth: { username: accessToken, password: '' }
    })
    return NextResponse.json({ accounts: data })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 })
  }
} 