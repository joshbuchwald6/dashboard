"use client"

import {
  LayoutDashboard,
  CreditCard,
  Receipt,
  Calculator,
  LineChart,
  Target,
  Coins,
  FileText,
  HelpCircle,
  Settings,
  User,
} from "lucide-react"
import { useDashboardSection } from '@/store/useDashboardSection'

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'accounts', label: 'Accounts', icon: CreditCard },
  { key: 'transactions', label: 'Transactions', icon: Receipt },
  { key: 'budget', label: 'Budget', icon: Calculator },
  { key: 'spending-trends', label: 'Spending Trends', icon: LineChart },
  { key: 'goals', label: 'Goals', icon: Target },
  { key: 'investments', label: 'Investments', icon: Coins },
  { key: 'tax-tools', label: 'Tax & Tools', icon: FileText },
]

const bottomItems = [
  { key: 'help', label: 'Help', icon: HelpCircle, iconClass: 'text-red-500' },
  { key: 'settings', label: 'Settings', icon: Settings },
  { key: 'profile', label: 'Profile', icon: User },
]

export default function Sidebar() {
  const { section, setSection } = useDashboardSection()

  function NavItem({ item }) {
    const isActive = section === item.key
    return (
      <button
        onClick={() => setSection(item.key)}
        className={`
          flex items-center w-full px-5 py-3 rounded-xl transition-colors
          text-base font-medium
          ${isActive
            ? 'bg-white/10 text-white'
            : 'text-zinc-300 hover:bg-white/5 hover:text-white'}
          focus:outline-none
        `}
        style={{ minHeight: 44 }}
        aria-current={isActive ? 'page' : undefined}
      >
        <item.icon className={`h-6 w-6 mr-3 ${item.iconClass || ''}`} />
        <span className="truncate">{item.label}</span>
      </button>
    )
  }

  return (
    <nav className="h-full flex flex-col bg-zinc-950/80 border-r border-zinc-800 w-64 min-w-64 backdrop-blur-md">
      <div className="flex flex-col flex-1">
        <div className="h-20 flex items-center justify-center border-b border-zinc-800">
          <span className="text-2xl font-bold text-white tracking-tight">Budget</span>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="py-6 space-y-1">
            {navItems.map(item => (
              <NavItem key={item.key} item={item} />
            ))}
          </div>
          <div className="border-t border-zinc-800 pb-8 pt-4 space-y-1">
            {bottomItems.map(item => (
              <NavItem key={item.key} item={item} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
