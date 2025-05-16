import { Card } from '@/components/ui/card'
import { ArrowDownLeft, ArrowUpRight, Plus, Send, User, CreditCard } from 'lucide-react'
import { TellerConnectButton } from '@/components/teller/TellerConnectButton'

const accounts = [
  {
    name: 'Main Savings',
    type: 'Savings',
    balance: 8459.45,
    change: '+2.3%',
    up: true,
    chart: [40, 60, 55, 70, 80, 90, 100],
  },
  {
    name: 'Checking Account',
    type: 'Checking',
    balance: 2850.0,
    change: '-0.5%',
    up: false,
    chart: [100, 90, 85, 80, 75, 70, 65],
  },
  {
    name: 'Investment Portfolio',
    type: 'Investment',
    balance: 15230.8,
    change: '+4.8%',
    up: true,
    chart: [60, 65, 70, 80, 90, 110, 120],
  },
]

const recentActivity = [
  {
    name: 'Apple Store Purchase',
    amount: -999,
    date: 'Today, 2:45 PM',
    category: 'Shopping',
    up: false,
  },
  {
    name: 'Salary Deposit',
    amount: 4500,
    date: 'Today, 9:00 AM',
    category: 'Income',
    up: true,
  },
  {
    name: 'Netflix Subscription',
    amount: -15.99,
    date: 'Yesterday',
    category: 'Entertainment',
    up: false,
  },
  {
    name: 'Supabase Subscription',
    amount: -15.99,
    date: 'Yesterday',
    category: 'Services',
    up: false,
  },
  {
    name: 'Vercel Subscription',
    amount: -15.99,
    date: 'Yesterday',
    category: 'Services',
    up: false,
  },
]

const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0)

function MiniChart({ data, up }: { data: number[]; up: boolean }) {
  // Compact sparkline
  const points = data.map((v: number, i: number) => `${i * 18},${32 - v * 0.25}`).join(' ')
  return (
    <svg width="108" height="16" viewBox="0 0 108 16" fill="none">
      <polyline
        points={points}
        fill="none"
        stroke={up ? '#22c55e' : '#ef4444'}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function handleAccountLinked(enrollment: any) {
  fetch('/api/teller/save-enrollment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enrollmentId: enrollment.id, userId: 'currentUserId' })
  })
}

export default function AccountsBento() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
      {/* Accounts Overview */}
      <Card className="col-span-2 bg-[#111113] rounded-2xl p-8 shadow-none border border-black/60">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-[#232326] rounded-xl p-3">
              <CreditCard className="w-6 h-6 text-white/80" />
            </div>
            <h2 className="text-2xl font-bold text-white">Accounts Overview</h2>
          </div>
          <div className="flex gap-2">
            <TellerConnectButton onSuccess={handleAccountLinked} />
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#a259ff] text-white text-sm font-medium hover:bg-[#7c3aed] transition">
              <Send className="w-4 h-4" /> Transfer
            </button>
          </div>
        </div>
        <div className="text-4xl font-extrabold text-white mb-1">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
        <div className="text-zinc-400 text-base mb-6">Total Balance</div>
        <div className="space-y-4">
          {accounts.map((acc, i) => (
            <div key={i} className="flex items-center gap-4 bg-[#18181b] rounded-xl px-5 py-4">
              <div className="w-12 h-12 rounded-lg bg-[#232326] flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white/60" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-white truncate">{acc.name}</span>
                  <span className="text-xs text-zinc-400 font-medium">{acc.type}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-2xl font-extrabold text-white">${acc.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  <span className={`text-sm font-bold ${acc.up ? 'text-green-400' : 'text-red-400'} flex items-center gap-1`}>
                    {acc.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                    {acc.change}
                  </span>
                </div>
                <div className="mt-1">
                  <MiniChart data={acc.chart} up={acc.up} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
      {/* Recent Activity */}
      <Card className="bg-[#111113] rounded-2xl p-8 shadow-none border border-black/60 flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-[#232326] rounded-xl p-3">
            <User className="w-6 h-6 text-white/80" />
          </div>
          <h2 className="text-2xl font-bold text-white">Recent Activity</h2>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          {recentActivity.map((tx, i) => (
            <div key={i} className="flex items-center gap-3 bg-[#18181b] rounded-xl px-4 py-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tx.up ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                {tx.up ? <ArrowDownLeft className="w-5 h-5 text-green-400" /> : <ArrowUpRight className="w-5 h-5 text-red-400" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-white truncate">{tx.name}</span>
                  <span className={`font-mono text-lg font-bold ${tx.up ? 'text-green-400' : 'text-red-400'}`}>{tx.up ? '+' : '-'}${Math.abs(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-zinc-400">{tx.date}</span>
                  <span className="text-xs text-zinc-400">{tx.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="mt-6 w-full bg-black text-white rounded-xl py-3 text-base font-medium hover:bg-zinc-800 transition flex items-center justify-center gap-2 border border-zinc-800">
          View All Transactions <ArrowUpRight className="w-4 h-4" />
        </button>
      </Card>
    </div>
  )
} 