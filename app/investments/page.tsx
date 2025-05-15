"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'
import { Line, Doughnut, Bar } from 'react-chartjs-2'
import { TrendingUp, DollarSign, PieChart, ArrowUpRight, ArrowDownLeft, Briefcase, BarChart3, Plus, Pencil, Trash2 } from 'lucide-react'
import 'chart.js/auto'

const investments = [
  {
    id: 1,
    name: 'S&P 500 ETF',
    symbol: 'VOO',
    value: 25000,
    initialInvestment: 20000,
    allocation: 40,
    returns: 25,
    type: 'ETF',
    color: '#a78bfa',
  },
  {
    id: 2,
    name: 'Apple Inc.',
    symbol: 'AAPL',
    value: 15000,
    initialInvestment: 10000,
    allocation: 24,
    returns: 50,
    type: 'Stock',
    color: '#f472b6',
  },
  {
    id: 3,
    name: 'Bitcoin',
    symbol: 'BTC',
    value: 12000,
    initialInvestment: 8000,
    allocation: 19,
    returns: 50,
    type: 'Crypto',
    color: '#38bdf8',
  },
  {
    id: 4,
    name: 'Government Bonds',
    symbol: 'GOVT',
    value: 10000,
    initialInvestment: 10000,
    allocation: 17,
    returns: 0,
    type: 'Bonds',
    color: '#34d399',
  },
]

const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Portfolio Value',
      data: [55000, 58000, 57000, 60000, 62000, 62000],
      borderColor: '#38bdf8',
      backgroundColor: '#38bdf822',
      tension: 0.4,
      fill: true,
    }
  ]
}

const allocationData = {
  labels: investments.map(inv => inv.name),
  datasets: [{
    data: investments.map(inv => inv.allocation),
    backgroundColor: investments.map(inv => inv.color),
    borderWidth: 0,
  }]
}

const returnsData = {
  labels: investments.map(inv => inv.symbol),
  datasets: [{
    label: 'Returns %',
    data: investments.map(inv => inv.returns),
    backgroundColor: investments.map(inv => inv.color),
    borderRadius: 8,
  }]
}

export default function InvestmentsPage() {
  const [timeframe, setTimeframe] = useState('6m')
  const totalValue = investments.reduce((sum, inv) => sum + inv.value, 0)
  const totalInitial = investments.reduce((sum, inv) => sum + inv.initialInvestment, 0)
  const totalReturns = totalValue - totalInitial
  const returnsPercentage = ((totalValue - totalInitial) / totalInitial) * 100

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Briefcase className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Portfolio Value</h3>
          </div>
          <div className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</div>
          <div className="flex items-center gap-2 text-green-400 text-sm mt-1">
            <ArrowUpRight className="w-4 h-4" />
            {returnsPercentage.toFixed(1)}% total return
          </div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-pink-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Total Returns</h3>
          </div>
          <div className="text-3xl font-bold text-green-500">+${totalReturns.toLocaleString()}</div>
          <div className="text-zinc-400 text-sm mt-1">Unrealized gains</div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <PieChart className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Asset Types</h3>
          </div>
          <div className="text-3xl font-bold text-white">{investments.length}</div>
          <div className="text-zinc-400 text-sm mt-1">Different assets</div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Best Performer</h3>
          </div>
          <div className="text-3xl font-bold text-white">AAPL</div>
          <div className="flex items-center gap-2 text-green-400 text-sm mt-1">
            <ArrowUpRight className="w-4 h-4" />
            50% return
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Portfolio Performance</h3>
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 text-sm text-white"
            >
              <option value="1m">1 Month</option>
              <option value="3m">3 Months</option>
              <option value="6m">6 Months</option>
              <option value="1y">1 Year</option>
              <option value="all">All Time</option>
            </select>
          </div>
          <div className="h-[300px]">
            <Line
              data={performanceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#27272a' }
                  },
                  x: {
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#27272a' }
                  }
                }
              }}
            />
          </div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-6">Asset Allocation</h3>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={allocationData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      color: '#ffffff',
                      usePointStyle: true,
                      pointStyle: 'circle'
                    }
                  }
                }
              }}
            />
          </div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-6">Returns by Asset</h3>
          <div className="h-[300px]">
            <Bar
              data={returnsData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#27272a' }
                  },
                  x: {
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#27272a' }
                  }
                }
              }}
            />
          </div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Holdings</h3>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Investment
            </button>
          </div>

          <div className="space-y-6">
            {investments.map((investment) => (
              <motion.div
                key={investment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: investment.color }}
                    />
                    <div>
                      <span className="text-white font-medium">{investment.name}</span>
                      <span className="text-zinc-400 text-sm ml-2">({investment.symbol})</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-xs bg-zinc-800 text-zinc-300">
                      {investment.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-white font-medium">${investment.value.toLocaleString()}</div>
                      <div className="text-zinc-400 text-sm">{investment.allocation}% of portfolio</div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button className="p-1 hover:bg-zinc-800 rounded-lg transition">
                        <Pencil className="w-4 h-4 text-zinc-400" />
                      </button>
                      <button className="p-1 hover:bg-zinc-800 rounded-lg transition">
                        <Trash2 className="w-4 h-4 text-zinc-400" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Progress
                    value={investment.allocation}
                    className="h-2"
                  />
                  <div className="absolute top-3 right-0 text-xs text-green-400 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {investment.returns}% return
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}