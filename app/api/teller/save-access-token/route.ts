import { NextResponse } from 'next/server'

let userAccessToken: string | null = null // In-memory for demo

export async function POST(req: Request) {
  const { accessToken } = await req.json()
  userAccessToken = accessToken
  return NextResponse.json({ ok: true })
}

export function getAccessToken() {
  return userAccessToken
} 