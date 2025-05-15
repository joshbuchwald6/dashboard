import React from 'react';
import { Wallet } from 'lucide-react';

export const AccountBalance = () => {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-500/20 rounded-xl">
            <Wallet className="w-6 h-6 text-purple-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Total Balance</h2>
        </div>
        
        <div className="mb-8">
          <p className="text-4xl font-bold text-white tracking-tight">
            $26,540.25
          </p>
          <p className="text-green-400 text-sm mt-1 flex items-center gap-1">
            <span>↑</span> +2.5% from last month
          </p>
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
    </div>
  );
};