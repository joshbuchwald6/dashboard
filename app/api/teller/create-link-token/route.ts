import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const appId = process.env.TELLER_APP_ID
    const env = process.env.TELLER_ENV || 'development'
    return NextResponse.json({
      appId,
      env,
    })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 })
  }
} 