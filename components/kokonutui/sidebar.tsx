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
import Link from "next/link"
import { useState } from "react"

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
    className = '',
    iconClass = '',
  }: {
    href: string
    icon: any
    children: React.ReactNode
    className?: string
    iconClass?: string
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={`flex items-center px-3 py-2 text-base rounded-md transition-colors font-medium text-gray-400 hover:text-white hover:bg-zinc-800 ${className}`}
      >
        <Icon className={`h-5 w-5 mr-3 flex-shrink-0 ${iconClass}`} />
        {children}
      </Link>
    )
  }

  return (
    <nav className="h-full flex flex-col bg-[#18181b] border-r border-zinc-800 w-64 min-w-64">
      <div className="flex flex-col flex-1">
        <div className="h-20 flex items-center justify-center border-b border-zinc-800">
          <span className="text-3xl font-bold text-white tracking-tight">Budget</span>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div className="py-6 space-y-1">
            <NavItem href="#" icon={LayoutDashboard} className="text-white bg-zinc-900">Dashboard</NavItem>
            <NavItem href="#" icon={CreditCard}>Accounts</NavItem>
            <NavItem href="#" icon={Receipt}>Transactions</NavItem>
            <NavItem href="#" icon={Calculator}>Budget</NavItem>
            <NavItem href="#" icon={LineChart}>Spending Trends</NavItem>
            <NavItem href="#" icon={Target}>Goals</NavItem>
            <NavItem href="#" icon={Coins}>Investments</NavItem>
            <NavItem href="#" icon={FileText}>Tax & Tools</NavItem>
          </div>
          <div className="pb-8 space-y-1">
            <NavItem href="#" icon={HelpCircle} iconClass="text-red-500">Help</NavItem>
            <NavItem href="#" icon={Settings}>Settings</NavItem>
            <NavItem href="#" icon={User}>Profile</NavItem>
          </div>
        </div>
      </div>
    </nav>
  )
}
