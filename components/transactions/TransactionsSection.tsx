import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Bar, Line } from 'react-chartjs-2'
import 'chart.js/auto'
import { ArrowDownLeft, ArrowUpRight, Filter, Search, Calendar, Info, ChevronDown, ChevronUp, MoreHorizontal, Tag, Trash2, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@radix-ui/react-dialog'

const categories = [
  { label: 'Shopping', color: '#a78bfa' },
  { label: 'Food', color: '#f472b6' },
  { label: 'Transport', color: '#38bdf8' },
  { label: 'Entertainment', color: '#fbbf24' },
  { label: 'Bills', color: '#34d399' },
  { label: 'Other', color: '#64748b' },
]

const transactions = [
  {
    id: '1',
    title: 'Apple Store Purchase',
    amount: -999.0,
    type: 'outgoing',
    category: 'Shopping',
    date: '2024-06-01',
    status: 'completed',
    details: 'iPhone 15 Pro Max',
    tags: ['Apple', 'Electronics'],
  },
  {
    id: '2',
    title: 'Salary Deposit',
    amount: 4500.0,
    type: 'incoming',
    category: 'Other',
    date: '2024-06-01',
    status: 'completed',
    details: 'Monthly salary',
    tags: ['Work'],
  },
  {
    id: '3',
    title: 'Netflix Subscription',
    amount: -15.99,
    type: 'outgoing',
    category: 'Entertainment',
    date: '2024-05-30',
    status: 'pending',
    details: 'Monthly subscription',
    tags: ['Streaming'],
  },
  {
    id: '4',
    title: 'Groceries',
    amount: -120.5,
    type: 'outgoing',
    category: 'Food',
    date: '2024-05-29',
    status: 'completed',
    details: 'Whole Foods',
    tags: ['Groceries'],
  },
  {
    id: '5',
    title: 'Uber Ride',
    amount: -32.0,
    type: 'outgoing',
    category: 'Transport',
    date: '2024-05-28',
    status: 'completed',
    details: 'Airport to home',
    tags: ['Travel'],
  },
  {
    id: '6',
    title: 'Supabase Subscription',
    amount: -15.99,
    type: 'outgoing',
    category: 'Bills',
    date: '2024-05-27',
    status: 'pending',
    details: 'Monthly subscription',
    tags: ['Cloud'],
  },
]

type Transaction = typeof transactions[number]

const barData = {
  labels: categories.map(c => c.label),
  datasets: [
    {
      label: 'Spending by Category',
      data: categories.map(c =>
        transactions.filter(t => t.category === c.label).reduce((sum, t) => sum + Math.abs(t.amount), 0)
      ),
      backgroundColor: categories.map(c => c.color),
      borderRadius: 8,
    },
  ],
}

const lineData = {
  labels: transactions.map(t => t.date),
  datasets: [
    {
      label: 'Balance Over Time',
      data: transactions.reduce((acc, t, i) => {
        acc.push((acc[i - 1] || 0) + t.amount)
        return acc
      }, [] as number[]),
      borderColor: '#38bdf8',
      backgroundColor: '#38bdf822',
      tension: 0.4,
      fill: true,
      pointRadius: 2,
    },
  ],
}

export function TransactionsSection() {
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [category, setCategory] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Transaction | null>(null)

  const filtered = transactions.filter(t =>
    (!filter || t.title.toLowerCase().includes(filter.toLowerCase())) &&
    (!category || t.category === category)
  )

  function handleExpand(id: string) {
    setExpanded(expanded === id ? null : id)
  }

  function handleOpenDetails(tx: Transaction) {
    setSelected(tx)
    setOpen(true)
  }

  return (
    <TooltipProvider>
      <div className='space-y-8 font-sans'>
        {/* Filters & Actions */}
        <div className='flex flex-wrap gap-4 items-center mb-4'>
          <div className='relative'>
            <input
              className='bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition w-56'
              placeholder='Search transactions...'
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
            <Search className='absolute right-3 top-2.5 w-4 h-4 text-zinc-400 pointer-events-none' />
          </div>
          <div className='flex gap-2'>
            <select
              className='bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value=''>All Categories</option>
              {categories.map(c => (
                <option key={c.label} value={c.label}>{c.label}</option>
              ))}
            </select>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className='bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white flex items-center gap-2 hover:bg-zinc-800 transition'>
                  <Filter className='w-4 h-4' />
                  Filter
                </button>
              </TooltipTrigger>
              <TooltipContent className='bg-zinc-800 text-xs text-zinc-100 rounded px-2 py-1'>
                Filter by category
              </TooltipContent>
            </Tooltip>
          </div>
          <div className='ml-auto flex gap-2'>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className='bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white flex items-center gap-2 hover:bg-zinc-800 transition'>
                  <Download className='w-4 h-4' /> Export
                </button>
              </TooltipTrigger>
              <TooltipContent className='bg-zinc-800 text-xs text-zinc-100 rounded px-2 py-1'>
                Export transactions as CSV
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className='bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white flex items-center gap-2 hover:bg-zinc-800 transition'>
                  <Trash2 className='w-4 h-4' /> Bulk Delete
                </button>
              </TooltipTrigger>
              <TooltipContent className='bg-zinc-800 text-xs text-zinc-100 rounded px-2 py-1'>
                Delete selected transactions
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Animated Charts */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-4'>
          <Card className='p-6 bg-zinc-900 border border-zinc-800'>
            <h2 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
              <Tag className='w-5 h-5 text-yellow-400' /> Spending by Category
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className='w-4 h-4 text-zinc-400 cursor-pointer' />
                </TooltipTrigger>
                <TooltipContent className='bg-zinc-800 text-xs text-zinc-100 rounded px-2 py-1'>
                  Animated bar chart of your spending by category.
                </TooltipContent>
              </Tooltip>
            </h2>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Bar data={barData} options={{ plugins: { legend: { display: false } }, borderRadius: 8, responsive: true, maintainAspectRatio: false }} height={180} />
            </motion.div>
          </Card>
          <Card className='p-6 bg-zinc-900 border border-zinc-800'>
            <h2 className='text-lg font-bold text-white mb-4 flex items-center gap-2'>
              <ArrowUpRight className='w-5 h-5 text-cyan-400' /> Balance Over Time
            </h2>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Line data={lineData} options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }} height={180} />
            </motion.div>
          </Card>
        </div>

        {/* Transactions Table */}
        <Card className='p-0 bg-zinc-900 border border-zinc-800 overflow-x-auto'>
          <table className='min-w-full text-sm text-zinc-200'>
            <thead>
              <tr className='bg-zinc-800'>
                <th className='px-6 py-3 text-left font-semibold'>Date</th>
                <th className='px-6 py-3 text-left font-semibold'>Title</th>
                <th className='px-6 py-3 text-left font-semibold'>Category</th>
                <th className='px-6 py-3 text-right font-semibold'>Amount</th>
                <th className='px-6 py-3 text-center font-semibold'>Status</th>
                <th className='px-6 py-3 text-center font-semibold'>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.map((tx, i) => (
                  <motion.tr
                    key={tx.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className='border-b border-zinc-800 hover:bg-zinc-800/60 transition cursor-pointer'
                  >
                    <td className='px-6 py-3'>{tx.date}</td>
                    <td className='px-6 py-3 flex items-center gap-2'>
                      {tx.type === 'incoming' ? <ArrowDownLeft className='w-4 h-4 text-green-400' /> : <ArrowUpRight className='w-4 h-4 text-red-400' />}
                      {tx.title}
                    </td>
                    <td className='px-6 py-3'>
                      <span className='inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium' style={{ background: categories.find(c => c.label === tx.category)?.color + '22', color: categories.find(c => c.label === tx.category)?.color }}>{tx.category}</span>
                    </td>
                    <td className={'px-6 py-3 text-right font-mono ' + (tx.amount >= 0 ? 'text-green-400' : 'text-red-400')}>{tx.amount >= 0 ? '+' : ''}${Math.abs(tx.amount).toLocaleString()}</td>
                    <td className='px-6 py-3 text-center'>
                      <span className={'px-2 py-1 rounded-full text-xs font-semibold ' + (tx.status === 'completed' ? 'bg-green-900/40 text-green-400' : 'bg-yellow-900/40 text-yellow-400')}>{tx.status}</span>
                    </td>
                    <td className='px-6 py-3 text-center'>
                      <button onClick={() => handleExpand(tx.id)} className='rounded-full p-1 hover:bg-zinc-800 transition'>
                        {expanded === tx.id ? <ChevronUp className='w-4 h-4' /> : <ChevronDown className='w-4 h-4' />}
                      </button>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button onClick={() => handleOpenDetails(tx)} className='rounded-full p-1 hover:bg-zinc-800 transition'>
                            <MoreHorizontal className='w-4 h-4' />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className='bg-zinc-800 text-xs text-zinc-100 rounded px-2 py-1'>
                          View details
                        </TooltipContent>
                      </Tooltip>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {/* Expandable Row Details */}
          <AnimatePresence initial={false}>
            {filtered.map(tx => (
              expanded === tx.id && (
                <motion.div
                  key={tx.id + '-details'}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='bg-zinc-950 border-t border-zinc-800 px-8 py-4 flex flex-col gap-2'
                >
                  <div className='flex items-center gap-4'>
                    <span className='text-zinc-400 text-xs'>Details:</span>
                    <span className='text-zinc-100'>{tx.details}</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    <span className='text-zinc-400 text-xs'>Tags:</span>
                    <div className='flex gap-2'>
                      {tx.tags.map((tag, i) => (
                        <span key={i} className='px-2 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300'>{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </Card>

        {/* Slide-in Transaction Details Modal */}
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
                  <div className='flex items-center justify-between p-6 border-b border-zinc-800'>
                    <DialogTitle className='text-lg font-bold flex items-center gap-2'>
                      {selected.title}
                    </DialogTitle>
                    <DialogClose asChild>
                      <button className='rounded-full p-2 hover:bg-zinc-800 transition'>
                        <ChevronDown className='w-5 h-5 text-zinc-400' />
                      </button>
                    </DialogClose>
                  </div>
                  <div className='flex-1 p-6 overflow-y-auto'>
                    <div className='mb-4'>
                      <div className='text-zinc-400 text-xs mb-1'>Date</div>
                      <div className='text-white font-medium'>{selected.date}</div>
                    </div>
                    <div className='mb-4'>
                      <div className='text-zinc-400 text-xs mb-1'>Category</div>
                      <div className='text-white font-medium'>{selected.category}</div>
                    </div>
                    <div className='mb-4'>
                      <div className='text-zinc-400 text-xs mb-1'>Amount</div>
                      <div className={'text-lg font-bold ' + (selected.amount >= 0 ? 'text-green-400' : 'text-red-400')}>
                        {selected.amount >= 0 ? '+' : ''}${Math.abs(selected.amount).toLocaleString()}
                      </div>
                    </div>
                    <div className='mb-4'>
                      <div className='text-zinc-400 text-xs mb-1'>Status</div>
                      <div className='text-white font-medium'>{selected.status}</div>
                    </div>
                    <div className='mb-4'>
                      <div className='text-zinc-400 text-xs mb-1'>Details</div>
                      <div className='text-white font-medium'>{selected.details}</div>
                    </div>
                    <div className='mb-4'>
                      <div className='text-zinc-400 text-xs mb-1'>Tags</div>
                      <div className='flex gap-2 flex-wrap'>
                        {selected.tags.map((tag, i) => (
                          <span key={i} className='px-2 py-1 rounded-full bg-zinc-800 text-xs text-zinc-300'>{tag}</span>
                        ))}
                      </div>
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