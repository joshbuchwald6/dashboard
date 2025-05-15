import React from 'react';
import { PieChart } from 'lucide-react';

export const SpendingCategories = () => {
  const categories = [
    { name: 'Housing', amount: 1400, color: 'from-purple-500 to-purple-600' },
    { name: 'Food', amount: 650, color: 'from-blue-500 to-blue-600' },
    { name: 'Transport', amount: 450, color: 'from-emerald-500 to-emerald-600' },
    { name: 'Entertainment', amount: 300, color: 'from-pink-500 to-pink-600' },
  ];

  const total = categories.reduce((sum, cat) => sum + cat.amount, 0);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-violet-500/20 rounded-xl">
            <PieChart className="w-6 h-6 text-violet-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Spending</h2>
        </div>

        <div className="space-y-4">
          {categories.map((category, index) => (
            <div key={index} className="group">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">{category.name}</span>
                <span className="text-white font-medium">
                  ${category.amount.toLocaleString()}
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${category.color} transform transition-all duration-500 group-hover:scale-x-105`}
                  style={{ width: `${(category.amount / total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};