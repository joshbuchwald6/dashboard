import { Card } from '@/components/ui/card'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'
import { Info, CheckCircle, Calendar, TrendingUp, DollarSign, Target, Zap } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'

const netWorthData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Net Worth',
      data: [15000, 15500, 16000, 15800, 16500, 16762],
      borderColor: '#22d3ee',
      backgroundColor: 'rgba(34,211,238,0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
}
const netWorthOptions = {
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  scales: { x: { display: false }, y: { display: false } },
  elements: { point: { radius: 4, backgroundColor: '#22d3ee' } },
  responsive: true,
  maintainAspectRatio: false,
}

const spendingData = {
  labels: ['Rent', 'Food', 'Shopping', 'Travel', 'Other'],
  datasets: [
    {
      label: 'Spending',
      data: [1984, 385, 292, 110, 269],
      backgroundColor: ['#a78bfa', '#f472b6', '#facc15', '#38bdf8', '#34d399'],
      borderRadius: 6,
    },
  ],
}
const spendingOptions = {
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  indexAxis: 'y',
  scales: { x: { display: false }, y: { display: true, ticks: { color: '#cbd5e1' } } },
  responsive: true,
  maintainAspectRatio: false,
}

const goalsData = {
  labels: ['Emergency Fund', 'Vacation', 'Investments'],
  datasets: [
    {
      data: [65, 30, 45],
      backgroundColor: ['#f472b6', '#38bdf8', '#a78bfa'],
      borderWidth: 0,
    },
  ],
}
const goalsOptions = {
  plugins: { legend: { display: false }, tooltip: { enabled: true } },
  cutout: '70%',
  responsive: true,
  maintainAspectRatio: false,
}

const bills = [
  { name: 'Netflix', amount: 15.99, due: 'Dec 1', icon: <Zap className='w-4 h-4 text-red-400' />, paid: false },
  { name: 'Spotify', amount: 9.99, due: 'Dec 2', icon: <Zap className='w-4 h-4 text-blue-400' />, paid: false },
  { name: 'Apple Storage', amount: 2.99, due: 'Dec 5', icon: <Zap className='w-4 h-4 text-green-400' />, paid: false },
]

const goals = [
  { name: 'Emergency Fund', current: 6500, target: 10000 },
  { name: 'Vacation', current: 1200, target: 3000 },
  { name: 'Investments', current: 4500, target: 10000 },
]

export function DashboardBento() {
  return (
    <TooltipProvider>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 font-sans'>
        {/* Top Row */}
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
            <span className='text-2xl font-bold text-white'>$16,762</span>
            <span className='text-emerald-400 font-semibold flex items-center gap-1'>
              <CheckCircle className='w-4 h-4' /> +5.05% this month
            </span>
          </div>
          <div className='h-32'>
            <Line data={netWorthData} options={netWorthOptions} />
          </div>
        </Card>
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
            <span className='text-white font-semibold'>$2,940</span>
            <span className='text-zinc-400 text-xs'>(32 transactions)</span>
          </div>
          <div className='h-32'>
            <Bar data={spendingData} options={{
              plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
              },
              indexAxis: 'y',
              scales: {
                x: { display: false },
                y: {
                  display: false,
                  ticks: { color: '#fff' }
                }
              },
              responsive: true,
              maintainAspectRatio: false
            }} />
          </div>
        </Card>

        {/* Second Row */}
        <Card className='p-6 flex flex-col bg-zinc-900 border border-zinc-800'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-bold text-white flex items-center gap-2'>
              <Calendar className='w-5 h-5 text-purple-400' /> Upcoming Bills
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='w-4 h-4 text-zinc-400 cursor-pointer' />
              </TooltipTrigger>
              <TooltipContent>Bills due soon. Mark as paid when done.</TooltipContent>
            </Tooltip>
          </div>
          <ul className='space-y-2'>
            {bills.map((bill, i) => (
              <li key={bill.name} className='flex items-center justify-between text-sm text-zinc-200'>
                <div className='flex items-center gap-2'>
                  {bill.icon}
                  <span>{bill.name}</span>
                  <span className='text-zinc-400 text-xs ml-2'>{bill.due}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className={bill.amount > 10 ? 'text-red-400' : bill.amount > 5 ? 'text-blue-400' : 'text-green-400'}>
                    ${bill.amount.toFixed(2)}
                  </span>
                  <button className='ml-2 px-2 py-1 rounded bg-zinc-800 text-xs text-zinc-300 hover:bg-green-500 hover:text-white transition' title='Mark as paid'>
                    Mark as paid
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className='p-6 flex flex-col bg-zinc-900 border border-zinc-800'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-bold text-white flex items-center gap-2'>
              <DollarSign className='w-5 h-5 text-green-400' /> Monthly Income
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='w-4 h-4 text-zinc-400 cursor-pointer' />
              </TooltipTrigger>
              <TooltipContent>Income received vs. expected.</TooltipContent>
            </Tooltip>
          </div>
          <div className='w-full bg-zinc-800 rounded-full h-3 mb-2'>
            <div className='bg-green-500 h-3 rounded-full' style={{ width: '80%' }} />
          </div>
          <div className='flex justify-between text-sm text-zinc-200'>
            <span>$4,500 received</span>
            <span>$5,600 expected</span>
          </div>
          <div className='text-zinc-400 text-xs mt-1'>Last pay: Nov 15</div>
        </Card>
        <Card className='p-6 flex flex-col bg-zinc-900 border border-zinc-800'>
          <div className='flex items-center justify-between mb-2'>
            <h2 className='text-lg font-bold text-white flex items-center gap-2'>
              <Target className='w-5 h-5 text-pink-400' /> Goals Progress
            </h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='w-4 h-4 text-zinc-400 cursor-pointer' />
              </TooltipTrigger>
              <TooltipContent>Your progress toward each goal.</TooltipContent>
            </Tooltip>
          </div>
          <div className='h-32 mb-2'>
            <Doughnut data={goalsData} options={goalsOptions} />
          </div>
          <ul className='space-y-1'>
            {goals.map(goal => (
              <li key={goal.name} className='flex justify-between text-sm text-zinc-200'>
                <span>{goal.name}</span>
                <span className='text-zinc-400'>{goal.current} / {goal.target}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Insights - full width on bottom */}
        <Card className='col-span-1 md:col-span-2 xl:col-span-3 p-6 flex flex-col bg-gradient-to-r from-purple-700 to-indigo-700 border-0'>
          <div className='flex items-center gap-2 mb-2'>
            <Zap className='w-5 h-5 text-white' />
            <h2 className='text-lg font-bold text-white'>Insights</h2>
          </div>
          <div className='text-zinc-200 text-sm mb-1'>Personalized AI insight</div>
          <p className='text-white mb-2'>You're on track to save $1,200 this month! 🎉</p>
          <a href='#' className='text-xs text-white underline hover:text-zinc-200 transition'>View more insights</a>
        </Card>
      </div>
    </TooltipProvider>
  )
}

export default DashboardBento 