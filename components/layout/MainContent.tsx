'use client'

import { ReactNode } from 'react'
import DashboardContent from '@/components/kokonutui/content'

interface MainContentProps {
  children?: ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black dark:from-black dark:via-zinc-800/40 dark:to-black">
      {children || <DashboardContent />}
    </div>
  )
} 