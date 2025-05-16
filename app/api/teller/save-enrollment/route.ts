import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const TELLER_DIR = path.resolve(process.cwd(), 'teller')
const ENROLLMENTS_PATH = path.join(TELLER_DIR, 'enrollments.json')

export async function POST(req: Request) {
  const { enrollmentId, userId } = await req.json()
  console.log('Received enrollmentId:', enrollmentId, 'userId:', userId)
  if (!enrollmentId || !userId) {
    console.error('Missing enrollmentId or userId')
    return NextResponse.json({ error: 'Missing enrollmentId or userId' }, { status: 400 })
  }
  // Ensure the teller directory exists
  if (!fs.existsSync(TELLER_DIR)) {
    fs.mkdirSync(TELLER_DIR, { recursive: true })
  }
  let enrollments = {}
  if (fs.existsSync(ENROLLMENTS_PATH)) {
    enrollments = JSON.parse(fs.readFileSync(ENROLLMENTS_PATH, 'utf-8')) as Record<string, string>
  }
  // Ensure enrollments is properly typed
  const typedEnrollments = enrollments as Record<string, string>
  // Create new object to avoid mutating the original
  const updatedEnrollments = {
    ...typedEnrollments,
    [userId]: enrollmentId
  }
  fs.writeFileSync(ENROLLMENTS_PATH, JSON.stringify(updatedEnrollments, null, 2))
  console.log('Updated enrollments:', updatedEnrollments)
  return NextResponse.json({ ok: true })
}