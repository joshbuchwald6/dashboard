"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowUpRight, ArrowDownLeft, Calendar, Wallet, PiggyBank, LineChart } from 'lucide-react'
import 'chart.js/auto'

const monthlySpending = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Monthly Spending',
      data: [3200, 3400, 2800, 3100, 3600, 3200],
      borderColor: '#38bdf8',
      backgroundColor: '#38bdf822',
      tension: 0.4,
      fill: true,
    }
  ]
}

const categoryTrends = {
  labels: ['Housing', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Utilities'],
  datasets: [
    {
      label: 'Last Month',
      data: [1800, 650, 280, 275, 420, 380],
      backgroundColor: '#a78bfa88',
    },
    {
      label: 'This Month',
      data: [1800, 700, 300, 250, 450, 360],
      backgroundColor: '#38bdf888',
    }
  ]
}

const spendingByDay = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Average Spending',
      data: [120, 150, 180, 145, 210, 250, 190],
      backgroundColor: '#f472b688',
    }
  ]
}

const merchantDistribution = {
  labels: ['Amazon', 'Walmart', 'Target', 'Uber', 'Netflix', 'Others'],
  datasets: [{
    data: [30, 20, 15, 12, 8, 15],
    backgroundColor: [
      '#a78bfa',
      '#f472b6',
      '#38bdf8',
      '#fbbf24',
      '#34d399',
      '#64748b'
    ],
    borderWidth: 0,
  }]
}

export default function SpendingTrendsPage() {
  const [timeframe, setTimeframe] = useState('6m')

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Monthly Average</h3>
          </div>
          <div className="text-3xl font-bold text-white">$3,216</div>
          <div className="flex items-center gap-2 text-green-400 text-sm mt-1">
            <ArrowUpRight className="w-4 h-4" />
            5.2% vs last month
          </div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Highest Day</h3>
          </div>
          <div className="text-3xl font-bold text-white">Saturday</div>
          <div className="text-zinc-400 text-sm mt-1">Avg. $250 spent</div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-pink-500/20 rounded-xl">
              <Wallet className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Top Merchant</h3>
          </div>
          <div className="text-3xl font-bold text-white">Amazon</div>
          <div className="text-zinc-400 text-sm mt-1">30% of spending</div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <PiggyBank className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Savings Trend</h3>
          </div>
          <div className="text-3xl font-bold text-green-500">+12.5%</div>
          <div className="flex items-center gap-2 text-green-400 text-sm mt-1">
            <ArrowUpRight className="w-4 h-4" />
            Improving
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Monthly Spending Trend</h3>
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 text-sm text-white"
            >
              <option value="3m">Last 3 months</option>
              <option value="6m">Last 6 months</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-[300px]"
          >
            <Line
              data={monthlySpending}
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
          </motion.div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-6">Category Comparison</h3>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-[300px]"
          >
            <Bar
              data={categoryTrends}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: '#ffffff',
                      usePointStyle: true,
                      pointStyle: 'circle'
                    }
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
          </motion.div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-6">Daily Spending Pattern</h3>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-[300px]"
          >
            <Bar
              data={spendingByDay}
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
          </motion.div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-6">Top Merchants</h3>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-[300px]"
          >
            <Doughnut
              data={merchantDistribution}
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
          </motion.div>
        </Card>
      </div>
    </div>
  )
}