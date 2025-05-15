import React from 'react';
import { Wallet, FileText, Calendar, TrendingUp, PieChart, DollarSign, Target, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1600px] mx-auto">
        {/* Accounts */}
        <div className="bg-black/90 border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-xl">
              <Wallet className="w-6 h-6 text-purple-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Accounts</h2>
          </div>
          <div className="mb-8">
            <p className="text-4xl font-bold text-white tracking-tight">$26,540.25</p>
            <p className="text-green-400 text-sm mt-1">↑ +2.5% from last month</p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-emerald-500">💳</span>
                </div>
                <div>
                  <p className="text-white font-medium">Main Account</p>
                  <p className="text-sm text-gray-400">Personal</p>
                </div>
              </div>
              <p className="text-white font-medium">$8,459.45</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-blue-500">📈</span>
                </div>
                <div>
                  <p className="text-white font-medium">Investments</p>
                  <p className="text-sm text-gray-400">NASDAQ</p>
                </div>
              </div>
              <p className="text-white font-medium">$15,230.80</p>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-black/90 border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
            </div>
            <span className="text-gray-400 text-sm">This Month</span>
          </div>
          <div className="space-y-4">
            {[
              { icon: '🛍️', name: 'Apple Store', time: 'Today, 2:45 PM', amount: -999.00 },
              { icon: '💳', name: 'Salary', time: 'Today, 9:00 AM', amount: 4500.00 },
              { icon: '📺', name: 'Netflix', time: 'Yesterday', amount: -15.99 },
            ].map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${tx.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-xl flex items-center justify-center`}>
                    <span>{tx.icon}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{tx.name}</p>
                    <p className="text-sm text-gray-400">{tx.time}</p>
                  </div>
                </div>
                <p className={`font-medium ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-black/90 border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <Calendar className="w-6 h-6 text-amber-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Upcoming</h2>
          </div>
          <div className="space-y-4">
            {[
              { icon: '📺', name: 'Netflix', date: 'Dec 1', amount: 15.99 },
              { icon: '🎵', name: 'Spotify', date: 'Dec 2', amount: 9.99 },
              { icon: '☁️', name: 'iCloud', date: 'Dec 5', amount: 2.99 },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-xl">
                    {payment.icon}
                  </div>
                  <div>
                    <p className="text-white font-medium">{payment.name}</p>
                    <p className="text-sm text-gray-400">{payment.date}</p>
                  </div>
                </div>
                <p className="text-white font-medium">${payment.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Net Worth Chart */}
        <div className="lg:col-span-2 bg-black/90 border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-white">Net Worth</h2>
            </div>
            <div className="text-emerald-400 bg-emerald-500/10 px-4 py-1 rounded-full text-sm">
              +5.05% this month
            </div>
          </div>
          <div className="h-[200px] relative">
            <div className="absolute bottom-0 left-0 right-0 h-[180px] bg-gradient-to-t from-emerald-500/20 to-transparent rounded-lg"></div>
            <div className="absolute bottom-0 left-0 right-0 h-[180px] flex items-end">
              {[40, 65, 45, 75, 55, 85, 90].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 mx-1"
                  style={{ height: `${height}%` }}
                >
                  <div className="h-full bg-emerald-500/40 rounded-t-lg backdrop-blur-sm transform hover:scale-y-110 transition-transform duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Spending Categories */}
        <div className="bg-black/90 border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-violet-500/20 rounded-xl">
              <PieChart className="w-6 h-6 text-violet-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Spending</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Housing', amount: 1400, color: 'bg-purple-500' },
              { name: 'Food', amount: 650, color: 'bg-blue-500' },
              { name: 'Transport', amount: 450, color: 'bg-emerald-500' },
              { name: 'Entertainment', amount: 300, color: 'bg-pink-500' },
            ].map((category, index) => (
              <div key={index} className="group">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">{category.name}</span>
                  <span className="text-white font-medium">${category.amount.toLocaleString()}</span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${category.color} transform transition-all duration-500 group-hover:scale-x-105`}
                    style={{ width: `${(category.amount / 2800) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Income */}
        <div className="bg-black/90 border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Income</h2>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Received</span>
                <span className="text-white font-medium">$4,500</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500 group-hover:scale-x-105"
                  style={{ width: '80%' }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Expected</span>
              <span className="text-white font-medium">$5,600</span>
            </div>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="bg-black/90 border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-500/20 rounded-xl">
              <Target className="w-6 h-6 text-indigo-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Goals</h2>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Emergency Fund', current: 6500, target: 10000, color: 'bg-purple-500' },
              { name: 'Vacation', current: 1200, target: 3000, color: 'bg-blue-500' },
              { name: 'Investments', current: 4500, target: 10000, color: 'bg-emerald-500' },
            ].map((goal, index) => (
              <div key={index} className="group">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">{goal.name}</span>
                  <span className="text-white font-medium">
                    ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${goal.color} rounded-full transition-all duration-500 group-hover:scale-x-105`}
                    style={{ width: `${(goal.current / goal.target) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-black/90 border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-fuchsia-500/20 rounded-xl">
              <Sparkles className="w-6 h-6 text-fuchsia-500" />
            </div>
            <h2 className="text-xl font-bold text-white">AI Insights</h2>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-2xl">
              <p className="text-white font-medium">You're on track to save $1,200 this month! 🎉</p>
              <p className="text-gray-400 text-sm mt-2">Keep up the good work! Your savings rate has increased by 15% compared to last month.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;