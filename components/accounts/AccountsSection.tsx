import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Line, Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import { CreditCard, Banknote, PiggyBank, TrendingUp, Plus, ArrowRight, FileText, RefreshCw, Info, Eye, Settings, ChevronRight, ChevronLeft } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@radix-ui/react-dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'

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
    details: {
      institution: 'Bank of America',
      opened: '2018-06-12',
      limit: 10000,
      recent: [
        { date: '2024-06-01', desc: 'Direct Deposit', amount: 2500 },
        { date: '2024-05-28', desc: 'Rent', amount: -1800 },
        { date: '2024-05-25', desc: 'Groceries', amount: -120 },
      ]
    }
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
    details: {
      institution: 'Chase',
      opened: '2020-01-10',
      limit: 20000,
      recent: [
        { date: '2024-05-30', desc: 'Interest', amount: 8.5 },
        { date: '2024-05-15', desc: 'Transfer from Checking', amount: 500 },
      ]
    }
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
    details: {
      institution: 'Amex',
      opened: '2019-03-22',
      limit: 5000,
      recent: [
        { date: '2024-06-02', desc: 'Payment', amount: 300 },
        { date: '2024-05-29', desc: 'Amazon', amount: -120 },
      ]
    }
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
    details: {
      institution: 'Robinhood',
      opened: '2021-11-05',
      limit: null,
      recent: [
        { date: '2024-05-31', desc: 'Dividend', amount: 12.5 },
        { date: '2024-05-20', desc: 'Stock Sale', amount: 500 },
      ]
    }
  },
]

const netWorth = accounts.reduce((sum, acc) => sum + acc.balance, 0)

const allocation = [
  { label: 'Checking', value: 3450.23, color: '#38bdf8' },
  { label: 'Savings', value: 6450.00, color: '#a78bfa' },
  { label: 'Credit', value: -1200.50, color: '#f472b6' },
  { label: 'Investment', value: 8920.75, color: '#34d399' },
]

const donutData = {
  labels: allocation.map(a => a.label),
  datasets: [
    {
      data: allocation.map(a => Math.abs(a.value)),
      backgroundColor: allocation.map(a => a.color),
      borderWidth: 2,
      borderColor: '#18181b',
    },
  ],
}

export function AccountsSection() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  function handleOpenDetails(acc) {
    setSelected(acc)
    setOpen(true)
  }

  return (
    <TooltipProvider>
      <div className='space-y-8 font-sans'>
        {/* Net Worth & Allocation */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='p-6 flex flex-col bg-zinc-900 border border-zinc-800 relative overflow-visible'>
            <h2 className='text-lg font-bold text-white mb-2 flex items-center gap-2'>
              <TrendingUp className='w-5 h-5 text-cyan-400' /> Net Worth
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='w-4 h-4 text-zinc-400 cursor-pointer' />
                </TooltipTrigger>
                <TooltipContent className='bg-zinc-800 text-xs text-zinc-100 rounded px-2 py-1'>
                  Your total assets minus liabilities, updated live.
                </TooltipContent>
              </Tooltip>
            </h2>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='text-3xl font-bold text-white mb-1 flex items-center gap-2'
            >
              ${netWorth.toLocaleString()}
              <span className='text-green-400 text-base font-medium'>+2.3%</span>
            </motion.div>
            <div className='text-zinc-400 text-sm mb-2'>Total across all accounts</div>
            <div className='flex flex-wrap gap-2 mt-2'>
              {allocation.map(a => (
                <span key={a.label} className='px-3 py-1 rounded-full text-xs font-medium' style={{ background: a.color + '22', color: a.color }}>{a.label}: ${a.value.toLocaleString()}</span>
              ))}
            </div>
            <div className='w-32 h-32 mx-auto mt-4'>
              <Doughnut data={donutData} options={{ plugins: { legend: { display: false } } }} />
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
            <motion.div
              key={acc.name}
              whileHover={{ scale: 1.03, boxShadow: '0 4px 32px #0008' }}
              whileTap={{ scale: 0.98 }}
              className='cursor-pointer'
              onClick={() => handleOpenDetails(acc)}
            >
              <Card className='p-6 flex flex-col bg-zinc-900 border border-zinc-800 group hover:shadow-lg transition-shadow duration-200 relative overflow-visible'>
                <div className='flex items-center gap-3 mb-2'>
                  {acc.icon}
                  <span className='text-lg font-bold text-white'>{acc.name}</span>
                  <span className='ml-auto text-xs px-2 py-1 rounded-full' style={{ background: acc.color + '22', color: acc.color }}>{acc.type}</span>
                </div>
                <div className='text-2xl font-bold text-white mb-1 flex items-center gap-2'>
                  ${acc.balance.toLocaleString()}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Eye className='w-4 h-4 text-zinc-400 cursor-pointer' />
                    </TooltipTrigger>
                    <TooltipContent className='bg-zinc-800 text-xs text-zinc-100 rounded px-2 py-1'>
                      View account details
                    </TooltipContent>
                  </Tooltip>
                </div>
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
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className='px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white transition'>
                        <Settings className='w-4 h-4' />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className='bg-zinc-800 text-xs text-zinc-100 rounded px-2 py-1'>
                      Account settings
                    </TooltipContent>
                  </Tooltip>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Slide-in Account Details Modal */}
        <AnimatePresence>
          {open && selected && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent asChild forceMount>
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className='fixed top-0 right-0 w-full max-w-md h-full bg-zinc-900 border-l border-zinc-800 shadow-2xl z-50 flex flex-col'
                >
                  <DialogHeader className='flex items-center justify-between p-6 border-b border-zinc-800'>
                    <DialogTitle className='text-lg font-bold flex items-center gap-2'>
                      {selected.icon} {selected.name}
                    </DialogTitle>
                    <DialogClose asChild>
                      <button className='rounded-full p-2 hover:bg-zinc-800 transition'>
                        <ChevronRight className='w-5 h-5 text-zinc-400' />
                      </button>
                    </DialogClose>
                  </DialogHeader>
                  <div className='flex-1 p-6 overflow-y-auto'>
                    <div className='mb-4'>
                      <div className='text-zinc-400 text-xs mb-1'>Institution</div>
                      <div className='text-white font-medium'>{selected.details.institution}</div>
                    </div>
                    <div className='mb-4'>
                      <div className='text-zinc-400 text-xs mb-1'>Opened</div>
                      <div className='text-white font-medium'>{selected.details.opened}</div>
                    </div>
                    {selected.details.limit && (
                      <div className='mb-4'>
                        <div className='text-zinc-400 text-xs mb-1'>Limit</div>
                        <div className='text-white font-medium'>${selected.details.limit.toLocaleString()}</div>
                      </div>
                    )}
                    <div className='mb-4'>
                      <div className='text-zinc-400 text-xs mb-1'>Recent Activity</div>
                      <ul className='space-y-2'>
                        {selected.details.recent.map((item, i) => (
                          <li key={i} className='flex items-center justify-between'>
                            <span className='text-zinc-300'>{item.date} - {item.desc}</span>
                            <span className={item.amount >= 0 ? 'text-green-400' : 'text-red-400'}>
                              {item.amount >= 0 ? '+' : ''}${Math.abs(item.amount).toLocaleString()}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  )
} 