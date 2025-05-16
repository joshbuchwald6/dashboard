"use client"

import { useAuth } from '@/components/auth/AuthProvider'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { SpaceBackground } from '@/app/components/space-background'
import { Card } from '@/components/ui/card'
import { ArrowDownLeft, ArrowUpRight, CreditCard, FileText, Calendar, TrendingUp, PieChart, DollarSign, Target, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

const accounts = [
  {
    name: 'Main Account',
    type: 'Personal',
    balance: 8459.45,
    icon: '💳',
    color: 'bg-emerald-500/20',
    textColor: 'text-emerald-500'
  },
  {
    name: 'Investments',
    type: 'NASDAQ',
    balance: 15230.80,
    icon: '📈',
    color: 'bg-blue-500/20',
    textColor: 'text-blue-500'
  }
]

const transactions = [
  { icon: '🛍️', name: 'Apple Store', time: 'Today, 2:45 PM', amount: -999.00 },
  { icon: '💳', name: 'Salary', time: 'Today, 9:00 AM', amount: 4500.00 },
  { icon: '📺', name: 'Netflix', time: 'Yesterday', amount: -15.99 },
]

const categories = [
  { name: 'Housing', amount: 1400, color: 'bg-purple-500', percent: 50 },
  { name: 'Food', amount: 650, color: 'bg-blue-500', percent: 23 },
  { name: 'Transport', amount: 450, color: 'bg-emerald-500', percent: 16 },
  { name: 'Entertainment', amount: 300, color: 'bg-pink-500', percent: 11 },
]

const goals = [
  { name: 'Emergency Fund', current: 6500, target: 10000 },
  { name: 'Vacation', current: 1200, target: 3000 },
  { name: 'Investments', current: 4500, target: 10000 },
]

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
        <span className="ml-2 text-zinc-400">Loading...</span>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="relative min-h-screen w-full bg-black/95">
      <SpaceBackground />
      <div className="relative z-10 p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-[1600px] mx-auto">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-full"
          >
            <Card className="bg-zinc-900/50 border-zinc-800 p-6">
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {user.displayName || user.email?.split('@')[0] || 'User'}!
              </h1>
              <p className="text-zinc-400 mt-2">Here's an overview of your financial dashboard.</p>
            </Card>
          </motion.div>

          {/* Accounts Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <CreditCard className="w-6 h-6 text-purple-500" />
                </div>
                <h2 className="text-xl font-bold text-white">Accounts</h2>
              </div>
              <div className="mb-8">
                <p className="text-4xl font-bold text-white tracking-tight">$26,540.25</p>
                <p className="text-green-400 text-sm mt-1">↑ +2.5% from last month</p>
              </div>
              <div className="space-y-4">
                {accounts.map((account, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${account.color} rounded-xl flex items-center justify-center`}>
                        <span className={account.textColor}>{account.icon}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{account.name}</p>
                        <p className="text-sm text-gray-400">{account.type}</p>
                      </div>
                    </div>
                    <p className="text-white font-medium">${account.balance.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/20 rounded-xl">
                    <FileText className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                </div>
                <span className="text-gray-400 text-sm">This Month</span>
              </div>
              <div className="space-y-4">
                {transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${tx.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-xl flex items-center justify-center`}>
                        <span>{tx.icon}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{tx.name}</p>
                        <p className="text-sm text-gray-400">{tx.time}</p>
                      </div>
                    </div>
                    <p className={`font-medium ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Spending Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-violet-500/20 rounded-xl">
                  <PieChart className="w-6 h-6 text-violet-500" />
                </div>
                <h2 className="text-xl font-bold text-white">Spending</h2>
              </div>
              <div className="space-y-4">
                {categories.map((category, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">{category.name}</span>
                      <span className="text-white font-medium">${category.amount.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className={`h-full rounded-full ${category.color} transition-all duration-500 group-hover:scale-x-105`} style={{ width: `${category.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Net Worth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="xl:col-span-2"
          >
            <Card className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-500/20 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Net Worth</h2>
                </div>
                <div className="text-emerald-400 bg-emerald-500/10 px-4 py-1 rounded-full text-sm">
                  +5.05% this month
                </div>
              </div>
              <div className="h-[200px] relative">
                <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-emerald-500/20 to-transparent rounded-lg"></div>
                <div className="absolute bottom-0 left-0 right-0 h-[180px] flex items-end">
                  {[40, 65, 45, 75, 55, 85, 90].map((height, i) => (
                    <div key={i} className="flex-1 mx-1" style={{ height: `${height}%` }}>
                      <div className="h-full bg-emerald-500/40 rounded-t-lg backdrop-blur-sm transform hover:scale-y-110 transition-transform duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Goals Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-black/60 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-indigo-500/20 rounded-xl">
                  <Target className="w-6 h-6 text-indigo-500" />
                </div>
                <h2 className="text-xl font-bold text-white">Goals</h2>
              </div>
              <div className="space-y-4">
                {goals.map((goal, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">{goal.name}</span>
                      <span className="text-white font-medium">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 group-hover:scale-x-105"
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}