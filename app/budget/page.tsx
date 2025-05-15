"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'
import { Pie, Line } from 'react-chartjs-2'
import { Plus, Pencil, Trash2, ArrowUpRight, PiggyBank, Wallet, TrendingUp, DollarSign } from 'lucide-react'

const categories = [
  { id: 1, name: 'Housing', budget: 2000, spent: 1800, color: '#a78bfa' },
  { id: 2, name: 'Food & Dining', budget: 800, spent: 650, color: '#f472b6' },
  { id: 3, name: 'Transportation', budget: 400, spent: 280, color: '#38bdf8' },
  { id: 4, name: 'Entertainment', budget: 300, spent: 275, color: '#fbbf24' },
  { id: 5, name: 'Shopping', budget: 500, spent: 420, color: '#34d399' },
  { id: 6, name: 'Healthcare', budget: 300, spent: 150, color: '#fb923c' },
  { id: 7, name: 'Utilities', budget: 400, spent: 380, color: '#64748b' },
]

const monthlyData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Budget',
      data: [4500, 4500, 4700, 4700, 4700, 4700],
      borderColor: '#38bdf8',
      backgroundColor: '#38bdf822',
      borderDash: [5, 5],
    },
    {
      label: 'Actual Spending',
      data: [4200, 4300, 4600, 4400, 4100, 3955],
      borderColor: '#34d399',
      backgroundColor: '#34d39922',
      tension: 0.4,
    },
  ],
}

const pieData = {
  labels: categories.map(c => c.name),
  datasets: [
    {
      data: categories.map(c => c.spent),
      backgroundColor: categories.map(c => c.color),
      borderWidth: 0,
    },
  ],
}

export default function BudgetPage() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0)
  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0)
  const remainingBudget = totalBudget - totalSpent

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Wallet className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Total Budget</h3>
          </div>
          <div className="text-3xl font-bold text-white">${totalBudget.toLocaleString()}</div>
          <div className="text-zinc-400 text-sm mt-1">Monthly allocation</div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Spent</h3>
          </div>
          <div className="text-3xl font-bold text-white">${totalSpent.toLocaleString()}</div>
          <div className="text-zinc-400 text-sm mt-1">This month</div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <PiggyBank className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Remaining</h3>
          </div>
          <div className="text-3xl font-bold text-green-500">${remainingBudget.toLocaleString()}</div>
          <div className="text-zinc-400 text-sm mt-1">Available to spend</div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Savings</h3>
          </div>
          <div className="text-3xl font-bold text-yellow-500">
            {Math.round((remainingBudget / totalBudget) * 100)}%
          </div>
          <div className="text-zinc-400 text-sm mt-1">Of total budget</div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-6">Monthly Comparison</h3>
          <div className="h-[300px]">
            <Line
              data={monthlyData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: '#ffffff',
                      usePointStyle: true,
                      pointStyle: 'circle',
                    },
                  },
                },
                scales: {
                  y: {
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#27272a' },
                  },
                  x: {
                    ticks: { color: '#94a3b8' },
                    grid: { color: '#27272a' },
                  },
                },
              }}
            />
          </div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-6">Spending Distribution</h3>
          <div className="h-[300px] flex items-center justify-center">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      color: '#ffffff',
                      usePointStyle: true,
                      pointStyle: 'circle',
                    },
                  },
                },
              }}
            />
          </div>
        </Card>
      </div>

      {/* Budget Categories */}
      <Card className="p-6 bg-zinc-900 border border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Budget Categories</h3>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </div>

        <div className="space-y-6">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-white font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400">
                    ${category.spent.toLocaleString()} of ${category.budget.toLocaleString()}
                  </span>
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
                  value={(category.spent / category.budget) * 100}
                  className="h-2"
                  className-indicator={`${
                    category.spent > category.budget ? 'bg-red-500' : ''
                  }`}
                />
                {category.spent > category.budget && (
                  <div className="absolute top-3 right-0 text-xs text-red-400 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    Over budget
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}