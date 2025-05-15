import React from 'react';
import { TrendingUp } from 'lucide-react';

export const NetWorthChart = () => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
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
    </div>
  );
};