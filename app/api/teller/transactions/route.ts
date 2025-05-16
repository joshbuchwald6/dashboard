import { tellerClient } from '@/lib/teller'
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const ENROLLMENTS_PATH = path.resolve(process.cwd(), 'teller/enrollments.json')

export async function GET(req: Request) {
  // Get userId from query param
  const url = new URL(req.url)
  const userId = url.searchParams.get('userId')
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
  }
  let enrollmentId = null
  if (fs.existsSync(ENROLLMENTS_PATH)) {
    const enrollments = JSON.parse(fs.readFileSync(ENROLLMENTS_PATH, 'utf-8'))
    enrollmentId = enrollments[userId]
  }
  if (!enrollmentId) {
    return NextResponse.json({ error: 'No enrollment found for user' }, { status: 404 })
  }
  // Get accountId from query param
  const accountId = url.searchParams.get('accountId')
  if (!accountId) {
    return NextResponse.json({ error: 'Missing accountId' }, { status: 400 })
  }
  try {
    const { data } = await tellerClient.get(`/enrollments/${enrollmentId}/accounts/${accountId}/transactions`)
    return NextResponse.json({ transactions: data })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 })
  }
} 