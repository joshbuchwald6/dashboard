'use client'

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
import InvestmentsPage from '@/app/investments/page'
import TaxToolsPage from '@/app/tax-tools/page'
import ComingSoon from '@/components/ComingSoon'
import { useAuth } from '@/components/auth/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Loader2 } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const { section } = useDashboardSection()
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/')
    }
  }, [user, loading, router])

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
        return <InvestmentsPage />
      case 'tax-tools':
        return <TaxToolsPage />
      case 'settings':
      case 'profile':
      case 'help':
        return <ComingSoon />
      default:
        return <DashboardBento />
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
        <span className="ml-2 text-zinc-400">Loading...</span>
      </div>
    )
  }

  if (!user) {
    return <>{children}</>
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