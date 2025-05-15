'use client'

import { ReactNode } from 'react'
import { useDashboardSection } from '@/store/useDashboardSection'
import DashboardBento from '@/components/kokonutui/dashboard-bento'
import AccountsBento from '@/components/accounts/AccountsBento'

interface MainContentProps {
  children?: ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  const { section } = useDashboardSection()

  let content
  if (section === 'dashboard') content = <DashboardBento />
  else if (section === 'accounts') content = <AccountsBento />
  else content = <div className='text-white text-2xl p-12'>Coming soon...</div>

  return (
    <div className="min-h-screen w-full px-6 py-8 md:px-12 md:py-10 flex justify-center">
      <div className="w-full max-w-7xl">{children || content}</div>
    </div>
  )
} 