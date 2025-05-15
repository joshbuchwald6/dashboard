"use client"

import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import Sidebar from '@/components/kokonutui/sidebar'
import TopNav from '@/components/kokonutui/top-nav'
import { useDashboardSection } from '@/store/useDashboardSection'
import DashboardBento from '@/components/kokonutui/dashboard-bento'
import AccountsBento from '@/components/accounts/AccountsBento'
import TransactionsPage from '@/app/transactions/page'
import BudgetPage from '@/app/budget/page'
import SpendingTrendsPage from '@/app/spending-trends/page'
import GoalsPage from '@/app/goals/page'
import ComingSoon from '@/components/ComingSoon'

const inter = Inter({ subsets: ['latin'] })

export function ClientLayout() {
  const { section } = useDashboardSection()

  const renderContent = () => {
    switch (section) {
      case 'dashboard':
        return <DashboardBento />
      case 'accounts':
        return <AccountsBento />
      case 'transactions':
        return <TransactionsPage />
      case 'budget':
        return <BudgetPage />
      case 'spending-trends':
        return <SpendingTrendsPage />
      case 'goals':
        return <GoalsPage />
      case 'investments':
      case 'tax-tools':
      case 'settings':
      case 'profile':
      case 'help':
        return <ComingSoon />
      default:
        return <DashboardBento />
    }
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNav />
          <main className="flex-1 p-8 overflow-auto">
            {renderContent()}
          </main>
        </div>
      </div>
      <Toaster />
    </ThemeProvider>
  )
}