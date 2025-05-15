"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { motion, AnimatePresence } from 'framer-motion'
import { Line, Doughnut } from 'react-chartjs-2'
import { Target, Plus, Pencil, Trash2, Calendar, TrendingUp, Trophy, Star } from 'lucide-react'
import 'chart.js/auto'

const goals = [
  {
    id: 1,
    name: 'Emergency Fund',
    target: 10000,
    current: 6500,
    deadline: '2024-12-31',
    category: 'Savings',
    priority: 'High',
    color: '#a78bfa',
    monthlyContribution: 500,
  },
  {
    id: 2,
    name: 'New Car',
    target: 25000,
    current: 8000,
    deadline: '2025-06-30',
    category: 'Purchase',
    priority: 'Medium',
    color: '#f472b6',
    monthlyContribution: 1000,
  },
  {
    id: 3,
    name: 'Vacation Fund',
    target: 5000,
    current: 2500,
    deadline: '2024-08-31',
    category: 'Travel',
    priority: 'Low',
    color: '#38bdf8',
    monthlyContribution: 300,
  },
  {
    id: 4,
    name: 'Home Down Payment',
    target: 50000,
    current: 15000,
    deadline: '2026-12-31',
    category: 'Purchase',
    priority: 'High',
    color: '#34d399',
    monthlyContribution: 1500,
  },
]

const monthlyProgress = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: goals.map(goal => ({
    label: goal.name,
    data: Array(6).fill().map((_, i) => goal.current - (5 - i) * goal.monthlyContribution),
    borderColor: goal.color,
    backgroundColor: goal.color + '22',
    tension: 0.4,
  }))
}

const distributionData = {
  labels: goals.map(g => g.name),
  datasets: [{
    data: goals.map(g => g.current),
    backgroundColor: goals.map(g => g.color),
    borderWidth: 0,
  }]
}

export default function GoalsPage() {
  const [selectedGoal, setSelectedGoal] = useState(null)
  const totalSaved = goals.reduce((sum, goal) => sum + goal.current, 0)
  const totalTarget = goals.reduce((sum, goal) => sum + goal.target, 0)

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Target className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Active Goals</h3>
          </div>
          <div className="text-3xl font-bold text-white">{goals.length}</div>
          <div className="text-zinc-400 text-sm mt-1">Total goals tracked</div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-pink-500/20 rounded-xl">
              <Trophy className="w-6 h-6 text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Total Progress</h3>
          </div>
          <div className="text-3xl font-bold text-white">
            {Math.round((totalSaved / totalTarget) * 100)}%
          </div>
          <div className="text-zinc-400 text-sm mt-1">Across all goals</div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Star className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Amount Saved</h3>
          </div>
          <div className="text-3xl font-bold text-white">${totalSaved.toLocaleString()}</div>
          <div className="text-zinc-400 text-sm mt-1">Total savings</div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <Calendar className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Next Milestone</h3>
          </div>
          <div className="text-3xl font-bold text-green-500">28 days</div>
          <div className="text-zinc-400 text-sm mt-1">Until next goal date</div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-6">Progress Timeline</h3>
          <div className="h-[300px]">
            <Line
              data={monthlyProgress}
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
          <h3 className="text-lg font-semibold text-white mb-6">Savings Distribution</h3>
          <div className="h-[300px] flex items-center justify-center">
            <Doughnut
              data={distributionData}
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

      {/* Goals List */}
      <Card className="p-6 bg-zinc-900 border border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Financial Goals</h3>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Goal
          </button>
        </div>

        <div className="space-y-6">
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: goal.color }}
                  />
                  <span className="text-white font-medium">{goal.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    goal.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                    goal.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {goal.priority}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-400">
                    ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
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
                  value={(goal.current / goal.target) * 100}
                  className="h-2"
                />
                <div className="absolute top-3 right-0 text-xs text-zinc-400">
                  Due: {new Date(goal.deadline).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}