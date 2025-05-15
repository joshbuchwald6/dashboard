import { Card } from '@/components/ui/card'
import { Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { CreditCard, Banknote, PiggyBank, TrendingUp, Plus, ArrowRight, FileText, RefreshCw } from 'lucide-react'
import { motion } from 'framer-motion'

const accounts = [
  {
    type: 'Checking',
    name: 'Total Checking',
    number: '**** 1000',
    balance: 3450.23,
    status: 'Active',
    history: [3200, 3300, 3400, 3450, 3450.23],
    color: '#38bdf8',
    icon: <Banknote className='w-5 h-5 text-blue-400' />,
  },
  {
    type: 'Savings',
    name: 'Adv Plus Savings',
    number: '**** 3000',
    balance: 6450.00,
    status: 'Active',
    history: [6000, 6100, 6200, 6400, 6450],
    color: '#a78bfa',
    icon: <PiggyBank className='w-5 h-5 text-purple-400' />,
  },
  {
    type: 'Credit',
    name: 'Credit Card',
    number: '**** 2000',
    balance: -1200.50,
    status: 'Active',
    history: [-800, -900, -1000, -1100, -1200.5],
    color: '#f472b6',
    icon: <CreditCard className='w-5 h-5 text-pink-400' />,
  },
  {
    type: 'Investment',
    name: 'Robinhood',
    number: '**** 4000',
    balance: 8920.75,
    status: 'Active',
    history: [8000, 8200, 8500, 8700, 8920.75],
    color: '#34d399',
    icon: <TrendingUp className='w-5 h-5 text-green-400' />,
  },
]

const netWorth = accounts.reduce((sum, acc) => sum + acc.balance, 0)

const allocation = [
  { label: 'Checking', value: 3450.23, color: '#38bdf8' },
  { label: 'Savings', value: 6450.00, color: '#a78bfa' },
  { label: 'Credit', value: -1200.50, color: '#f472b6' },
  { label: 'Investment', value: 8920.75, color: '#34d399' },
]

export default function AccountsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className='space-y-8 font-sans'
    >
      {/* Net Worth & Allocation */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Card className='p-6 flex flex-col bg-zinc-900 border border-zinc-800'>
          <h2 className='text-lg font-bold text-white mb-2 flex items-center gap-2'>
            <TrendingUp className='w-5 h-5 text-cyan-400' /> Net Worth
          </h2>
          <div className='text-3xl font-bold text-white mb-1'>${netWorth.toLocaleString()}</div>
          <div className='text-zinc-400 text-sm mb-2'>Total across all accounts</div>
          <div className='flex flex-wrap gap-2 mt-2'>
            {allocation.map(a => (
              <span key={a.label} className='px-3 py-1 rounded-full text-xs font-medium' style={{ background: a.color + '22', color: a.color }}>{a.label}: ${a.value.toLocaleString()}</span>
            ))}
          </div>
        </Card>
        <Card className='p-6 flex flex-col bg-zinc-900 border border-zinc-800'>
          <h2 className='text-lg font-bold text-white mb-2 flex items-center gap-2'>
            <FileText className='w-5 h-5 text-indigo-400' /> Account Actions
          </h2>
          <div className='flex flex-wrap gap-3'>
            <button className='flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition'>
              <Plus className='w-4 h-4' /> Add Account
            </button>
            <button className='flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition'>
              <RefreshCw className='w-4 h-4' /> Transfer
            </button>
            <button className='flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition'>
              <ArrowRight className='w-4 h-4' /> View Statements
            </button>
          </div>
        </Card>
      </div>

      {/* Accounts Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6'>
        {accounts.map(acc => (
          <Card key={acc.name} className='p-6 flex flex-col bg-zinc-900 border border-zinc-800 group hover:shadow-lg transition-shadow duration-200 cursor-pointer'>
            <div className='flex items-center gap-3 mb-2'>
              {acc.icon}
              <span className='text-lg font-bold text-white'>{acc.name}</span>
              <span className='ml-auto text-xs px-2 py-1 rounded-full' style={{ background: acc.color + '22', color: acc.color }}>{acc.type}</span>
            </div>
            <div className='text-2xl font-bold text-white mb-1'>${acc.balance.toLocaleString()}</div>
            <div className='text-zinc-400 text-xs mb-2'>Account {acc.number} • {acc.status}</div>
            <div className='h-16 mb-2'>
              <Line
                data={{
                  labels: acc.history.map((_, i) => `T${i + 1}`),
                  datasets: [
                    {
                      data: acc.history,
                      borderColor: acc.color,
                      backgroundColor: acc.color + '22',
                      tension: 0.4,
                      fill: true,
                      pointRadius: 0,
                    },
                  ],
                }}
                options={{
                  plugins: { legend: { display: false }, tooltip: { enabled: true } },
                  scales: { x: { display: false }, y: { display: false } },
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
            <div className='flex gap-2 mt-auto'>
              <button className='px-3 py-1 rounded bg-zinc-800 text-xs text-zinc-300 hover:bg-blue-600 hover:text-white transition'>Details</button>
              <button className='px-3 py-1 rounded bg-zinc-800 text-xs text-zinc-300 hover:bg-green-600 hover:text-white transition'>Transfer</button>
            </div>
          </Card>
        ))}
      </div>
    </motion.div>
  )
} 