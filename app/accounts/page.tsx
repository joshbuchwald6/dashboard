'use client'

import AccountCards from '@/components/accounts/AccountCards'
import BankAccounts from '@/components/accounts/BankAccounts'
import InvestmentAccounts from '@/components/accounts/InvestmentAccounts'
import AccountsInsights from '@/components/accounts/AccountsInsights'

export default function AccountsPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-[1600px] mx-auto">
      <AccountCards />
      <BankAccounts />
      <InvestmentAccounts />
      <AccountsInsights />
    </div>
  )
} 