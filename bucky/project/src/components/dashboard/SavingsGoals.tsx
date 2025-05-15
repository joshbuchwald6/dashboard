import React from 'react';
import { Target } from 'lucide-react';

export const SavingsGoals = () => {
  const goals = [
    { name: 'Emergency Fund', current: 6500, target: 10000, color: 'from-purple-500 to-pink-500' },
    { name: 'Vacation', current: 1200, target: 3000, color: 'from-blue-500 to-cyan-500' },
    { name: 'New Car', current: 4500, target: 15000, color: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-indigo-500/20 rounded-xl">
            <Target className="w-6 h-6 text-indigo-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Goals</h2>
        </div>

        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="group">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">{goal.name}</span>
                <span className="text-white font-medium">
                  ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${goal.color} rounded-full transition-all duration-500 group-hover:scale-x-105`}
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};