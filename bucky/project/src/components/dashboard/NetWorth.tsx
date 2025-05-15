import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';

export const NetWorth: React.FC = () => {
  return (
    <Card
      title="Net Worth"
      icon={<TrendingUp size={20} />}
      infoTooltip="Your financial net worth"
      className="h-[280px]"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-white">$16,762</h2>
        <div className="text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full text-sm font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m6 9 6-6 6 6"></path><path d="M6 15h12"></path></svg>
          +5.05% this month
        </div>
      </div>

      <div className="relative h-[140px] mt-4">
        <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
          {/* Gradient background */}
          <defs>
            <linearGradient id="netWorthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area chart */}
          <path
            d="M0,80 C20,70 40,60 60,40 C80,20 100,30 120,40 C140,50 160,55 180,45 C200,35 220,30 240,40 C260,50 280,45 300,30 C320,15 340,10 360,5 C380,0 400,0 400,0 L400,100 L0,100 Z"
            fill="url(#netWorthGradient)"
            className="transition-all duration-1000 ease-in-out"
          />

          {/* Line chart */}
          <path
            d="M0,80 C20,70 40,60 60,40 C80,20 100,30 120,40 C140,50 160,55 180,45 C200,35 220,30 240,40 C260,50 280,45 300,30 C320,15 340,10 360,5 C380,0 400,0 400,0"
            fill="none"
            stroke="#06B6D4"
            strokeWidth="2"
            className="transition-all duration-1000 ease-in-out"
          />

          {/* Data points */}
          <circle cx="0" cy="80" r="4" fill="#06B6D4" />
          <circle cx="60" cy="40" r="4" fill="#06B6D4" />
          <circle cx="120" cy="40" r="4" fill="#06B6D4" />
          <circle cx="180" cy="45" r="4" fill="#06B6D4" />
          <circle cx="240" cy="40" r="4" fill="#06B6D4" />
          <circle cx="300" cy="30" r="4" fill="#06B6D4" />
          <circle cx="360" cy="5" r="4" fill="#06B6D4" />
        </svg>
      </div>
    </Card>
  );
};