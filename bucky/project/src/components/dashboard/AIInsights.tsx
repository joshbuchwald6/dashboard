import React from 'react';
import { Sparkles } from 'lucide-react';

export const AIInsights = () => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-fuchsia-500/20 rounded-xl">
            <Sparkles className="w-6 h-6 text-fuchsia-500" />
          </div>
          <h2 className="text-xl font-bold text-white">AI Insights</h2>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-fuchsia-500/20 to-pink-500/20 rounded-2xl backdrop-blur-sm">
            <p className="text-white font-medium">You're on track to save $1,200 this month! 🎉</p>
            <p className="text-gray-400 text-sm mt-2">Keep up the good work! Your savings rate has increased by 15% compared to last month.</p>
          </div>
        </div>
      </div>
    </div>
  );
};