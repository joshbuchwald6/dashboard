import { Card } from '@/components/ui/card'
import { LineChart, Plus, Edit2, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react'

const demoInvestments = [
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    balance: 5230.80,
    change: '+2.3%',
    up: true,
    color: 'text-green-400',
    chart: [40, 60, 55, 70, 80, 90, 100],
    logo: '/aapl.png',
  },
  {
    ticker: 'TSLA',
    name: 'Tesla',
    balance: 3200.00,
    change: '-1.1%',
    up: false,
    color: 'text-red-400',
    chart: [100, 90, 80, 85, 70, 60, 55],
    logo: '/tsla.png',
  },
  {
    ticker: 'BTC',
    name: 'Bitcoin',
    balance: 1800.00,
    change: '+4.8%',
    up: true,
    color: 'text-green-400',
    chart: [60, 65, 70, 80, 90, 110, 120],
    logo: '/btc.png',
  },
]

function MiniChart({ data, up }: { data: number[]; up: boolean }) {
  // Simple SVG sparkline
  const points = data.map((v, i) => `${i * 20},${120 - v}`).join(' ')
  return (
    <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
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

export default function InvestmentAccounts() {
  return (
    <Card className="bg-black/90 border border-white/10 p-6 rounded-3xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500/20 rounded-xl">
          <LineChart className="w-6 h-6 text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-white">Investment Accounts</h2>
        <button className="ml-auto flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition">
          <Plus className="w-4 h-4" /> Add Investment
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {demoInvestments.map((inv, i) => (
          <div key={i} className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 hover:bg-white/10 transition">
            <img src={inv.logo} alt={inv.ticker} className="w-10 h-10 rounded-lg bg-zinc-900 object-cover" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{inv.ticker}</span>
                <span className="text-xs text-zinc-400">{inv.name}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-lg font-bold text-white">${inv.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                <span className={`text-xs font-medium ${inv.color} flex items-center gap-1`}>
                  {inv.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownLeft className="w-3 h-3" />}
                  {inv.change}
                </span>
              </div>
              <MiniChart data={inv.chart} up={inv.up} />
            </div>
            <div className="flex flex-col items-end gap-1">
              <button className="p-1 rounded-full bg-black/30 hover:bg-black/50 transition" title="Edit">
                <Edit2 className="w-4 h-4 text-zinc-300" />
              </button>
              <button className="p-1 rounded-full bg-black/30 hover:bg-red-600 transition" title="Delete">
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
} 