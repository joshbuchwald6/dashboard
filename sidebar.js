'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  CreditCard,
  Receipt,
  Calculator,
  LineChart,
  Target,
  Coins,
  FileText
} from 'lucide-react'
import { useDashboardSection } from '@/store/useDashboardSection'

const sidebarLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, section: 'dashboard' },
  { label: 'Accounts', icon: CreditCard, section: 'accounts' },
  { label: 'Transactions', icon: Receipt, section: 'transactions' },
  { label: 'Budget', icon: Calculator, section: 'budget' },
  { label: 'Spending Trends', icon: LineChart, section: 'spending-trends' },
  { label: 'Goals', icon: Target, section: 'goals' },
  { label: 'Investments', icon: Coins, section: 'investments' },
  { label: 'Tax & Tools', icon: FileText, section: 'tax-tools' },
]

const bottomLinks = [
  { label: 'Help', icon: () => <span>❓</span>, section: 'help' },
  { label: 'Settings', icon: () => <span>⚙️</span>, section: 'settings' },
  { label: 'Profile', icon: () => <span>👤</span>, section: 'profile' },
]

export function Sidebar() {
  const [aiOpen, setAiOpen] = useState(false)
  const { activeSection, setActiveSection } = useDashboardSection()

  return (
    <aside className='flex flex-col h-full w-72 bg-zinc-900 text-white border-r border-zinc-800'>
      <div className='flex flex-col items-center py-6 border-b border-zinc-800'>
        <div className='mb-2'>
          <span className='font-bold text-2xl'>Budget</span>
        </div>
      </div>
      {/* Main Navigation */}
      <nav className='flex-1 px-2 py-2 space-y-1'>
        {sidebarLinks.map(link => (
          <button
            key={link.label}
            onClick={() => setActiveSection(link.section)}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition text-base font-medium w-full text-left',
              activeSection === link.section
                ? 'bg-zinc-800 text-white'
                : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
            )}
          >
            <link.icon className='h-5 w-5' />
            {link.label}
          </button>
        ))}
      </nav>
      {/* Bottom: Help & Settings */}
      <div className='mt-auto px-4 py-4 border-t border-zinc-800 flex flex-col gap-2'>
        {bottomLinks.map(link => (
          <button
            key={link.label}
            onClick={() => setActiveSection(link.section)}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition text-base w-full text-left',
              activeSection === link.section
                ? 'bg-zinc-800 text-white'
                : 'hover:bg-zinc-800 text-zinc-400 hover:text-white'
            )}
          >
            <link.icon />
            {link.label}
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar 