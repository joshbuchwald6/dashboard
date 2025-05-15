'use client'

import { ReactNode } from 'react'
import { useDashboardSection } from '@/store/useDashboardSection'
import DashboardBento from '@/components/kokonutui/dashboard-bento'
import AccountsBento from '@/components/accounts/AccountsBento'
import { Wallet, FileText, Calendar, TrendingUp, PieChart, DollarSign, Target, Sparkles, CreditCard } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface MainContentProps {
  children?: ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  const { section } = useDashboardSection()

  let content
  if (section === 'dashboard') content = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1600px] mx-auto">
      {/* Accounts */}
      <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl hover:scale-[1.02] transition-all duration-500">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Wallet className="w-6 h-6 text-purple-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Accounts</h2>
        </div>
        <div className="mb-4">
          <p className="text-4xl font-bold text-white tracking-tight">$26,540.25</p>
          <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> +2.5% from last month
          </p>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img src="/bank1.png" className="w-8 h-8 rounded-full" alt="Bank" />
            <div>
              <p className="text-white font-medium">Main Account</p>
              <p className="text-xs text-gray-400">Personal • ****1234</p>
            </div>
            <span className="ml-auto text-green-400 font-mono">$8,459.45</span>
          </div>
          <div className="flex items-center gap-3">
            <img src="/bank2.png" className="w-8 h-8 rounded-full" alt="Bank" />
            <div>
              <p className="text-white font-medium">Investments</p>
              <p className="text-xs text-gray-400">NASDAQ • ****5678</p>
            </div>
            <span className="ml-auto text-blue-400 font-mono">$15,230.80</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: '70%' }} />
          </div>
          <p className="text-xs text-gray-400 mt-1">70% of your savings goal reached</p>
        </div>
      </Card>
      {/* Recent Transactions */}
      <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl hover:scale-[1.02] transition-all duration-500">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
          </div>
          <span className="text-gray-400 text-sm">This Month</span>
        </div>
        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
          {[
            { icon: '🛍️', name: 'Apple Store', time: 'Today, 2:45 PM', amount: -999.00, status: 'Completed' },
            { icon: '💳', name: 'Salary', time: 'Today, 9:00 AM', amount: 4500.00, status: 'Deposit' },
            { icon: '📺', name: 'Netflix', time: 'Yesterday', amount: -15.99, status: 'Recurring' },
            { icon: '🍔', name: 'McDonalds', time: 'Yesterday', amount: -8.99, status: 'Completed' },
            { icon: '🚕', name: 'Uber', time: '2 days ago', amount: -23.50, status: 'Completed' },
          ].map((tx, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${tx.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-xl flex items-center justify-center text-xl`}>
                  <span>{tx.icon}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{tx.name}</p>
                  <p className="text-xs text-gray-400">{tx.time}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className={`font-medium ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                <span className="text-xs mt-1 px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button className="text-xs text-blue-300 hover:underline">View All</button>
        </div>
      </Card>
      {/* Upcoming Events */}
      <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl hover:scale-[1.02] transition-all duration-500">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-500/20 rounded-xl">
            <Calendar className="w-6 h-6 text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Upcoming</h2>
        </div>
        <div className="space-y-4">
          {[
            { icon: '📺', name: 'Netflix', date: 'Dec 1', amount: 15.99, status: 'Due' },
            { icon: '🎵', name: 'Spotify', date: 'Dec 2', amount: 9.99, status: 'Due' },
            { icon: '☁️', name: 'iCloud', date: 'Dec 5', amount: 2.99, status: 'Paid' },
          ].map((payment, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-xl">
                  {payment.icon}
                </div>
                <div>
                  <p className="text-white font-medium">{payment.name}</p>
                  <p className="text-xs text-gray-400">{payment.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-white font-medium">${payment.amount.toFixed(2)}</p>
                <span className={`text-xs mt-1 px-2 py-0.5 rounded-full ${payment.status === 'Paid' ? 'bg-green-700 text-green-300' : 'bg-zinc-800 text-zinc-300'}`}>{payment.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      {/* Net Worth Chart */}
      <Card className="lg:col-span-2 bg-black/90 border border-white/10 p-6 rounded-3xl hover:scale-[1.02] transition-all duration-500">
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
        <div className="h-[200px] relative flex items-end">
          {/* Example bar chart */}
          {[40, 65, 45, 75, 55, 85, 90].map((height, index) => (
            <div key={index} className="flex-1 mx-1 flex flex-col items-center">
              <div className="h-full flex items-end" style={{ height: '180px' }}>
                <div className="h-full bg-emerald-500/40 rounded-t-lg backdrop-blur-sm transition-transform duration-300" style={{ height: `${height}%`, width: '16px' }}></div>
              </div>
              <span className="text-xs text-zinc-500 mt-1">{['Jan','Feb','Mar','Apr','May','Jun','Jul'][index]}</span>
            </div>
          ))}
        </div>
      </Card>
      {/* Spending Categories */}
      <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl hover:scale-[1.02] transition-all duration-500">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-violet-500/20 rounded-xl">
            <PieChart className="w-6 h-6 text-violet-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Spending</h2>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Housing', amount: 1400, color: 'bg-purple-500', percent: 50 },
            { name: 'Food', amount: 650, color: 'bg-blue-500', percent: 23 },
            { name: 'Transport', amount: 450, color: 'bg-emerald-500', percent: 16 },
            { name: 'Entertainment', amount: 300, color: 'bg-pink-500', percent: 11 },
          ].map((category, index) => (
            <div key={index} className="group">
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
      {/* Monthly Income */}
      <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl hover:scale-[1.02] transition-all duration-500">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-500/20 rounded-xl">
            <DollarSign className="w-6 h-6 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Income</h2>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Received</span>
              <span className="text-white font-medium">$4,500</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full transition-all duration-500 group-hover:scale-x-105" style={{ width: '80%' }}></div>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Expected</span>
            <span className="text-white font-medium">$5,600</span>
          </div>
        </div>
      </Card>
      {/* Goals Progress */}
      <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl hover:scale-[1.02] transition-all duration-500">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-500/20 rounded-xl">
            <Target className="w-6 h-6 text-indigo-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Goals</h2>
        </div>
        <div className="space-y-4">
          {[
            { name: 'Emergency Fund', current: 6500, target: 10000, color: 'bg-purple-500' },
            { name: 'Vacation', current: 1200, target: 3000, color: 'bg-blue-500' },
            { name: 'Investments', current: 4500, target: 10000, color: 'bg-emerald-500' },
          ].map((goal, index) => (
            <div key={index} className="group">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">{goal.name}</span>
                <span className="text-white font-medium">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${goal.color} rounded-full transition-all duration-500 group-hover:scale-x-105`} style={{ width: `${(goal.current / goal.target) * 100}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      {/* AI Insights */}
      <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl hover:scale-[1.02] transition-all duration-500">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-fuchsia-500/20 rounded-xl">
            <Sparkles className="w-6 h-6 text-fuchsia-500" />
          </div>
          <h2 className="text-xl font-bold text-white">AI Insights</h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-2xl">
            <p className="text-white font-medium">You're on track to save $1,200 this month! 🎉</p>
            <p className="text-gray-400 text-sm mt-2">Keep up the good work! Your savings rate has increased by 15% compared to last month.</p>
          </div>
        </div>
      </Card>
    </div>
  )
  else if (section === 'accounts') content = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1600px] mx-auto">
      {/* Account Overview */}
      <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Wallet className="w-6 h-6 text-purple-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Accounts Overview</h2>
        </div>
        <div className="mb-8">
          <p className="text-4xl font-bold text-white tracking-tight">$26,540.25</p>
          <p className="text-green-400 text-sm mt-1">↑ +2.5% from last month</p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <span className="text-emerald-500">💳</span>
              </div>
              <div>
                <p className="text-white font-medium">Main Savings</p>
                <p className="text-sm text-gray-400">Personal</p>
              </div>
            </div>
            <p className="text-white font-medium">$8,459.45</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <span className="text-blue-500">📈</span>
              </div>
              <div>
                <p className="text-white font-medium">Checking Account</p>
                <p className="text-sm text-gray-400">Daily expenses</p>
              </div>
            </div>
            <p className="text-white font-medium">$2,850.00</p>
          </div>
        </div>
      </Card>
      {/* Recent Activity */}
      <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          </div>
          <span className="text-gray-400 text-sm">This Month</span>
        </div>
        <div className="space-y-4">
          {[
            { icon: '🛍️', name: 'Apple Store Purchase', time: 'Today, 2:45 PM', amount: -999.00 },
            { icon: '💳', name: 'Salary Deposit', time: 'Today, 9:00 AM', amount: 4500.00 },
            { icon: '📺', name: 'Netflix Subscription', time: 'Yesterday', amount: -15.99 },
          ].map((tx, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${tx.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-xl flex items-center justify-center`}>
                  <span>{tx.icon}</span>
                </div>
                <div>
                  <p className="text-white font-medium">{tx.name}</p>
                  <p className="text-sm text-gray-400">{tx.time}</p>
                </div>
              </div>
              <p className={`font-medium ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
            </div>
          ))}
        </div>
      </Card>
      {/* Account Types */}
      <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-500/20 rounded-xl">
            <CreditCard className="w-6 h-6 text-green-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Account Types</h2>
        </div>
        <div className="space-y-4">
          {[
            { type: 'Savings', count: 2, color: 'bg-emerald-500' },
            { type: 'Checking', count: 1, color: 'bg-blue-500' },
            { type: 'Investment', count: 1, color: 'bg-purple-500' },
            { type: 'Credit', count: 1, color: 'bg-red-500' },
          ].map((acc, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${acc.color}`}></div>
                <span className="text-sm text-gray-300">{acc.type}</span>
              </div>
              <span className="text-white font-medium">{acc.count}</span>
            </div>
          ))}
        </div>
      </Card>
      {/* Insights */}
      <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-fuchsia-500/20 rounded-xl">
            <Sparkles className="w-6 h-6 text-fuchsia-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Insights</h2>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-white/5 rounded-2xl">
            <p className="text-white font-medium">Your savings account is earning 4.2% APY. Consider moving more funds for higher returns!</p>
            <p className="text-gray-400 text-sm mt-2">You have 2 savings accounts and 1 investment account.</p>
          </div>
        </div>
      </Card>
    </div>
  )
  else content = <div className='text-white text-2xl p-12'>Coming soon...</div>

  return (
    <div className="min-h-screen w-full px-6 py-8 md:px-12 md:py-10 flex justify-center">
      <div className="w-full max-w-7xl">{children || content}</div>
    </div>
  )
} 