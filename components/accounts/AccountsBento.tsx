import { Card } from '@/components/ui/card'
import { Bar, Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import { CreditCard, TrendingUp, Zap, Info, Plus, Send, ArrowDownLeft, ArrowUpRight, Banknote, User } from 'lucide-react'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

const accounts = [
  { name: 'Main Savings', type: 'Savings', balance: 8459.45, icon: <TrendingUp className='w-4 h-4 text-green-400' /> },
  { name: 'Checking Account', type: 'Checking', balance: 2850.00, icon: <CreditCard className='w-4 h-4 text-blue-400' /> },
  { name: 'Investment Portfolio', type: 'Investment', balance: 15230.80, icon: <TrendingUp className='w-4 h-4 text-purple-400' /> },
  { name: 'Credit Card', type: 'Credit', balance: 1200.00, icon: <CreditCard className='w-4 h-4 text-red-400' /> },
  { name: 'Savings Account', type: 'Savings', balance: 3000.00, icon: <TrendingUp className='w-4 h-4 text-green-400' /> },
]

const recentActivity = [
  { name: 'Apple Store Purchase', amount: -999, date: 'Today, 2:45 PM', icon: <ArrowUpRight className='w-4 h-4 text-red-400' /> },
  { name: 'Salary Deposit', amount: 4500, date: 'Today, 9:00 AM', icon: <ArrowDownLeft className='w-4 h-4 text-green-400' /> },
  { name: 'Netflix Subscription', amount: -15.99, date: 'Yesterday', icon: <ArrowUpRight className='w-4 h-4 text-red-400' /> },
  { name: 'Supabase Subscription', amount: -15.99, date: 'Yesterday', icon: <ArrowUpRight className='w-4 h-4 text-red-400' /> },
  { name: 'Vercel Subscription', amount: -15.99, date: 'Yesterday', icon: <ArrowUpRight className='w-4 h-4 text-red-400' /> },
]

const accountTypeData = {
  labels: ['Savings', 'Checking', 'Investment', 'Credit'],
  datasets: [
    {
      data: [2, 1, 1, 1],
      backgroundColor: ['#34d399', '#38bdf8', '#a78bfa', '#f472b6'],
      borderWidth: 0,
    },
  ],
}
const accountTypeOptions = {
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  cutout: '70%',
  responsive: true,
  maintainAspectRatio: false,
}

const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

export default function AccountsBento() {
  return (
    <TooltipProvider>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 font-sans'>
        {/* Total Balance */}
        <Card className='col-span-1 xl:col-span-2 p-6 flex flex-col bg-zinc-900 border border-zinc-800'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-bold text-purple-400 flex items-center gap-2'>
              <Banknote className='w-5 h-5' /> Accounts
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='w-4 h-4 text-zinc-400 cursor-pointer' />
              </TooltipTrigger>
              <TooltipContent>Total balance across all accounts.</TooltipContent>
            </Tooltip>
          </div>
          <div className='text-3xl font-bold text-white mb-2'>${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          <div className='text-zinc-400 text-sm mb-4'>Your Accounts</div>
          <ul className='space-y-2 mb-4'>
            {accounts.map(acc => (
              <li key={acc.name} className='flex items-center gap-3 text-zinc-200'>
                {acc.icon}
                <span className='font-medium'>{acc.name}</span>
                <span className='ml-auto text-zinc-400 text-sm'>${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </li>
            ))}
          </ul>
          <div className='flex gap-2 mt-2'>
            <button className='bg-zinc-800 px-4 py-2 rounded-lg text-sm text-white flex items-center gap-2 hover:bg-purple-600 transition'><Plus className='w-4 h-4' /> Add</button>
            <button className='bg-zinc-800 px-4 py-2 rounded-lg text-sm text-white flex items-center gap-2 hover:bg-blue-600 transition'><Send className='w-4 h-4' /> Send</button>
            <button className='bg-zinc-800 px-4 py-2 rounded-lg text-sm text-white flex items-center gap-2 hover:bg-green-600 transition'><Zap className='w-4 h-4' /> Top-up</button>
            <button className='bg-zinc-800 px-4 py-2 rounded-lg text-sm text-white flex items-center gap-2 hover:bg-zinc-700 transition'>More</button>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className='p-6 flex flex-col bg-zinc-900 border border-zinc-800'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-bold text-purple-400 flex items-center gap-2'>
              <User className='w-5 h-5' /> Recent Transactions
            </h2>
          </div>
          <div className='text-zinc-400 text-xs mb-2'>Recent Activity (23 transactions)</div>
          <ul className='space-y-2'>
            {recentActivity.map(tx => (
              <li key={tx.name} className='flex items-center gap-2 text-zinc-200'>
                {tx.icon}
                <span className='font-medium'>{tx.name}</span>
                <span className={`ml-auto font-mono ${tx.amount >= 0 ? 'text-green-400' : 'text-red-400'}`}>{tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </li>
            ))}
          </ul>
          <button className='mt-4 w-full bg-zinc-800 text-white rounded-lg py-2 text-sm hover:bg-purple-700 transition'>View All Transactions →</button>
        </Card>

        {/* Account Types */}
        <Card className='p-6 flex flex-col bg-zinc-900 border border-zinc-800'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-bold text-purple-400 flex items-center gap-2'>
              <CreditCard className='w-5 h-5' /> Account Types
            </h2>
          </div>
          <div className='h-32 mb-2'>
            <Doughnut data={accountTypeData} options={accountTypeOptions} />
          </div>
          <ul className='space-y-1'>
            {accountTypeData.labels.map((label, i) => (
              <li key={label} className='flex justify-between text-sm text-zinc-200'>
                <span>{label}</span>
                <span className='text-zinc-400'>{accountTypeData.datasets[0].data[i]}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Insights - full width on bottom */}
        <Card className='col-span-1 md:col-span-2 xl:col-span-3 p-6 flex flex-col bg-gradient-to-r from-purple-700 to-indigo-700 border-0'>
          <div className='flex items-center gap-2 mb-2'>
            <Zap className='w-5 h-5 text-white' />
            <h2 className='text-lg font-bold text-white'>Insights</h2>
          </div>
          <div className='text-zinc-200 text-sm mb-1'>Personalized AI insight</div>
          <p className='text-white mb-2'>Your savings account is earning 4.2% APY. Consider moving more funds for higher returns!</p>
          <a href='#' className='text-xs text-white underline hover:text-zinc-200 transition'>View more insights</a>
        </Card>
      </div>
    </TooltipProvider>
  )
} 