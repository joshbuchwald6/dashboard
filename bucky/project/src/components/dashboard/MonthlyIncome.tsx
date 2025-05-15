import React from 'react';
import { DollarSign } from 'lucide-react';

export const MonthlyIncome = () => {
  const received = 4500;
  const expected = 5600;
  const percentage = (received / expected) * 100;

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
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
              <span className="text-white font-medium">${received.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-500 group-hover:scale-x-105"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Expected</span>
            <span className="text-white font-medium">${expected.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};