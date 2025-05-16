import { useEffect, useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import { Info, CheckCircle, Calendar, TrendingUp, DollarSign, Target, Zap } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { useAuth } from '@/components/auth/AuthProvider'

// Teller API types (simplified)
type TellerAccount = {
  id: string
  name?: string
  institution?: string
  balance: number | string
}
type TellerTransaction = {
  id: string
  accountId?: string
  amount: number | string
  category?: string
  description?: string
  name?: string
  counterparty?: { name?: string }
  date?: string
  posted_at?: string
}

export function DashboardBento () {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState<TellerAccount[]>([])
  const [transactions, setTransactions] = useState<TellerTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchData () {
      if (!user?.uid) return
      setLoading(true)
      setError('')
      try {
        // Fetch accounts
        const resAcc = await fetch(`/api/teller/accounts?userId=${user.uid}`)
        const accData = await resAcc.json()
        if (!resAcc.ok) throw new Error(accData.error || 'Failed to fetch accounts')
        setAccounts(accData.accounts || [])

        // Fetch transactions for all accounts
        let allTx: TellerTransaction[] = []
        for (const acc of accData.accounts || []) {
          const resTx = await fetch(`/api/teller/transactions?userId=${user.uid}&accountId=${acc.id}`)
          const txData = await resTx.json()
          if (resTx.ok && Array.isArray(txData.transactions)) {
            allTx = allTx.concat(txData.transactions.map((t: any) => ({ ...t, accountId: acc.id })))
          }
        }
        setTransactions(allTx)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user])

  // Net Worth: sum of all account balances
  const netWorth = useMemo(() => {
    return accounts.reduce((sum, acc) => sum + (Number(acc.balance) || 0), 0)
  }, [accounts])

  // Spending by Category: sum of negative (outgoing) transactions grouped by category
  const spendingByCategory = useMemo(() => {
    const catMap: Record<string, number> = {}
    for (const tx of transactions) {
      if (Number(tx.amount) < 0) {
        const cat = tx.category || 'Other'
        catMap[cat] = (catMap[cat] || 0) + Math.abs(Number(tx.amount))
      }
    }
    return catMap
  }, [transactions])

  // Income: sum of positive (incoming) transactions
  const totalIncome = useMemo(() => {
    return transactions.filter(tx => Number(tx.amount) > 0).reduce((sum, tx) => sum + Number(tx.amount), 0)
  }, [transactions])

  // Recent transactions (sorted by date desc)
  const recentTransactions = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date || b.posted_at || '').getTime() - new Date(a.date || a.posted_at || '').getTime()).slice(0, 5)
  }, [transactions])

  // Chart data
  const netWorthData = useMemo(() => ({
    labels: accounts.map(acc => acc.name || acc.institution || acc.id),
    datasets: [
      {
        label: 'Balance',
        data: accounts.map(acc => Number(acc.balance) || 0),
        borderColor: '#22d3ee',
        backgroundColor: 'rgba(34,211,238,0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  }), [accounts])

  const spendingData = useMemo(() => {
    const labels = Object.keys(spendingByCategory)
    return {
      labels,
      datasets: [
        {
          label: 'Spending',
          data: labels.map(l => spendingByCategory[l]),
          backgroundColor: ['#a78bfa', '#f472b6', '#facc15', '#38bdf8', '#34d399', '#fb923c', '#64748b'],
          borderRadius: 6
        }
      ]
    }
  }, [spendingByCategory])

  const incomeData = useMemo(() => ({
    labels: ['Income'],
    datasets: [
      {
        label: 'Income',
        data: [totalIncome],
        backgroundColor: ['#34d399'],
        borderRadius: 6
      }
    ]
  }), [totalIncome])

  if (loading) {
    return <div className='flex items-center justify-center h-96 text-zinc-400'>Loading dashboard...</div>
  }
  if (error) {
    return <div className='flex items-center justify-center h-96 text-red-400'>Error: {error}</div>
  }

  return (
    <TooltipProvider>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 font-sans'>
        {/* Net Worth */}
        <Card className='col-span-1 xl:col-span-2 p-6 flex flex-col bg-zinc-900 border border-zinc-800'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-bold text-white flex items-center gap-2'>
              <TrendingUp className='w-5 h-5 text-cyan-400' /> Net Worth
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='w-4 h-4 text-zinc-400 cursor-pointer' />
              </TooltipTrigger>
              <TooltipContent>Total assets minus liabilities.</TooltipContent>
            </Tooltip>
          </div>
          <div className='flex items-center gap-6 mb-2'>
            <span className='text-2xl font-bold text-white'>${netWorth.toLocaleString()}</span>
          </div>
          <div className='h-32'>
            <Line data={netWorthData} options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }} />
          </div>
        </Card>
        {/* Spending by Category */}
        <Card className='p-6 flex flex-col bg-zinc-900 border border-zinc-800'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-bold text-white flex items-center gap-2'>
              <DollarSign className='w-5 h-5 text-yellow-400' /> Spending by Category
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='w-4 h-4 text-zinc-400 cursor-pointer' />
              </TooltipTrigger>
              <TooltipContent>Total spent by category this month.</TooltipContent>
            </Tooltip>
          </div>
          <div className='flex items-center gap-4 mb-2'>
            <span className='text-white font-semibold'>${Object.values(spendingByCategory).reduce((a, b) => a + b, 0).toLocaleString()}</span>
            <span className='text-zinc-400 text-xs'>({transactions.length} transactions)</span>
          </div>
          <div className='h-32'>
            <Bar data={spendingData} options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }} />
          </div>
        </Card>
        {/* Recent Transactions */}
        <Card className='p-6 flex flex-col bg-zinc-900 border border-zinc-800'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-bold text-white flex items-center gap-2'>
              <Calendar className='w-5 h-5 text-purple-400' /> Recent Transactions
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='w-4 h-4 text-zinc-400 cursor-pointer' />
              </TooltipTrigger>
              <TooltipContent>Latest activity from your accounts.</TooltipContent>
            </Tooltip>
          </div>
          <ul className='space-y-2'>
            {recentTransactions.length === 0 && <li className='text-zinc-400 text-sm'>No transactions found.</li>}
            {recentTransactions.map((tx, i) => (
              <li key={tx.id || i} className='flex items-center justify-between text-sm text-zinc-200'>
                <div className='flex flex-col'>
                  <span className='font-medium'>{tx.description || tx.name || tx.counterparty?.name || 'Transaction'}</span>
                  <span className='text-zinc-400 text-xs'>{tx.date || tx.posted_at || ''}</span>
                </div>
                <span className={Number(tx.amount) > 0 ? 'text-green-400' : 'text-red-400'}>
                  {Number(tx.amount) > 0 ? '+' : ''}${Math.abs(Number(tx.amount)).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </Card>
        {/* Income */}
        <Card className='p-6 flex flex-col bg-zinc-900 border border-zinc-800'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-bold text-white flex items-center gap-2'>
              <DollarSign className='w-5 h-5 text-green-400' /> Monthly Income
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='w-4 h-4 text-zinc-400 cursor-pointer' />
              </TooltipTrigger>
              <TooltipContent>Income received this month.</TooltipContent>
            </Tooltip>
          </div>
          <div className='h-32'>
            <Bar data={incomeData} options={{ plugins: { legend: { display: false } }, responsive: true, maintainAspectRatio: false }} />
          </div>
          <div className='flex justify-between text-sm text-zinc-200 mt-2'>
            <span>${totalIncome.toLocaleString()} received</span>
          </div>
        </Card>
      </div>
    </TooltipProvider>
  )
}

export default DashboardBento 