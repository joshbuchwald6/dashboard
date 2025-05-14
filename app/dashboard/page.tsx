"use client"
import { useAuth } from '@/components/auth/AuthProvider'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/kokonutui/dashboard'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/')
    }
  }, [user, loading, router])

  if (!user) {
    // Don't render anything if not authenticated
    return null
  }

  return <Dashboard />
}
