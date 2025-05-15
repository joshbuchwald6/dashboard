```typescript
"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Line, Bar } from 'react-chartjs-2'
import { Calculator, FileText, DollarSign, PiggyBank, ArrowUpRight, Percent, Calendar, RefreshCw } from 'lucide-react'
import 'chart.js/auto'

// Sample tax brackets for 2024 (Single filer)
const TAX_BRACKETS = [
  { rate: 0.10, threshold: 0, color: '#38bdf8' },
  { rate: 0.12, threshold: 11600, color: '#34d399' },
  { rate: 0.22, threshold: 47150, color: '#a78bfa' },
  { rate: 0.24, threshold: 100525, color: '#f472b6' },
  { rate: 0.32, threshold: 191950, color: '#fbbf24' },
  { rate: 0.35, threshold: 243725, color: '#fb923c' },
  { rate: 0.37, threshold: 609350, color: '#ef4444' },
]

const monthlyIncome = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Taxable Income',
      data: [5000, 5200, 4800, 5100, 5300, 5000],
      borderColor: '#38bdf8',
      backgroundColor: '#38bdf822',
      tension: 0.4,
    },
    {
      label: 'Tax Deductions',
      data: [1200, 1250, 1150, 1200, 1300, 1200],
      borderColor: '#34d399',
      backgroundColor: '#34d39922',
      tension: 0.4,
    }
  ]
}

const deductionsData = {
  labels: ['Housing', 'Medical', 'Charity', 'Education', 'Business', 'Other'],
  datasets: [{
    label: 'Deductions by Category',
    data: [12000, 4500, 2000, 3000, 5000, 1500],
    backgroundColor: [
      '#38bdf8',
      '#34d399',
      '#a78bfa',
      '#f472b6',
      '#fbbf24',
      '#64748b'
    ],
    borderRadius: 8,
  }]
}

export default function TaxToolsPage() {
  const [income, setIncome] = useState('')
  const [deductions, setDeductions] = useState('')
  const [calculatedTax, setCalculatedTax] = useState<number | null>(null)
  const [effectiveRate, setEffectiveRate] = useState<number | null>(null)

  const calculateTax = () => {
    const taxableIncome = parseFloat(income) - parseFloat(deductions || '0')
    let totalTax = 0
    let previousThreshold = 0

    for (let i = 0; i < TAX_BRACKETS.length; i++) {
      const { rate, threshold } = TAX_BRACKETS[i]
      const nextThreshold = TAX_BRACKETS[i + 1]?.threshold || Infinity

      if (taxableIncome > threshold) {
        const taxableAmount = Math.min(taxableIncome - threshold, nextThreshold - threshold)
        totalTax += taxableAmount * rate
      }
    }

    setCalculatedTax(totalTax)
    setEffectiveRate((totalTax / taxableIncome) * 100)
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Calculator className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Tax Calculator</h3>
          </div>
          <div className="text-3xl font-bold text-white">2024</div>
          <div className="text-zinc-400 text-sm mt-1">Tax Year</div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Deductions</h3>
          </div>
          <div className="text-3xl font-bold text-white">$28,000</div>
          <div className="text-zinc-400 text-sm mt-1">Total deductions</div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <PiggyBank className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Tax Savings</h3>
          </div>
          <div className="text-3xl font-bold text-green-500">$6,720</div>
          <div className="flex items-center gap-2 text-green-400 text-sm mt-1">
            <ArrowUpRight className="w-4 h-4" />
            24% effective savings
          </div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Calendar className="w-6 h-6 text-yellow-500" />
            </div>
            <h3 className="text-lg font-semibold text-white">Next Due</h3>
          </div>
          <div className="text-3xl font-bold text-white">Apr 15</div>
          <div className="text-zinc-400 text-sm mt-1">Tax deadline</div>
        </Card>
      </div>

      {/* Tax Calculator */}
      <Card className="p-6 bg-zinc-900 border border-zinc-800">
        <h3 className="text-lg font-semibold text-white mb-6">Quick Tax Calculator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Annual Income</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                <Input
                  type="number"
                  placeholder="Enter your annual income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Total Deductions</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                <Input
                  type="number"
                  placeholder="Enter total deductions"
                  value={deductions}
                  onChange={(e) => setDeductions(e.target.value)}
                  className="pl-10 bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
            <Button
              onClick={calculateTax}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              Calculate Tax
            </Button>
          </div>

          <div className="bg-zinc-800 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Results</h4>
            {calculatedTax !== null && (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-zinc-400">Estimated Tax:</p>
                  <p className="text-2xl font-bold text-white">
                    ${calculatedTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-zinc-400">Effective Tax Rate:</p>
                  <p className="text-2xl font-bold text-white">
                    {effectiveRate?.toFixed(1)}%
                  </p>
                </div>
                <div className="text-xs text-zinc-500 mt-4">
                  * This is an estimate based on 2024 tax brackets for single filers
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-6">Income & Deductions Trend</h3>
          <div className="h-[300px]">
            <Line
              data={monthlyIncome}
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
          </div>
        </Card>

        <Card className="p-6 bg-zinc-900 border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-6">Deductions by Category</h3>
          <div className="h-[300px]">
            <Bar
              data={deductionsData}
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
      </div>

      {/* Tax Brackets */}
      <Card className="p-6 bg-zinc-900 border border-zinc-800">
        <h3 className="text-lg font-semibold text-white mb-6">2024 Tax Brackets (Single Filer)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-zinc-800">
                <th className="px-6 py-3 text-zinc-400">Tax Rate</th>
                <th className="px-6 py-3 text-zinc-400">Taxable Income</th>
                <th className="px-6 py-3 text-zinc-400">Tax Owed</th>
              </tr>
            </thead>
            <tbody>
              {TAX_BRACKETS.map((bracket, index) => (
                <tr key={index} className="border-b border-zinc-800">
                  <td className="px-6 py-4 text-white">
                    {(bracket.rate * 100).toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 text-white">
                    {index === TAX_BRACKETS.length - 1 
                      ? `Over $${bracket.threshold.toLocaleString()}`
                      : `$${bracket.threshold.toLocaleString()} to $${TAX_BRACKETS[index + 1].threshold.toLocaleString()}`
                    }
                  </td>
                  <td className="px-6 py-4 text-white">
                    {(bracket.rate * 100).toFixed(1)}% of excess over ${bracket.threshold.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
```