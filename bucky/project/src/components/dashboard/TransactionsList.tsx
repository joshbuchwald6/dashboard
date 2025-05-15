import React from 'react';
import { FileText, ShoppingCart, CreditCard } from 'lucide-react';

export const TransactionsList = () => {
  const transactions = [
    {
      icon: <ShoppingCart className="w-4 h-4" />,
      name: 'Apple Store',
      time: '2:45 PM',
      amount: -999.00,
    },
    {
      icon: <CreditCard className="w-4 h-4" />,
      name: 'Salary',
      time: '9:00 AM',
      amount: 4500.00,
    },
    {
      icon: <CreditCard className="w-4 h-4" />,
      name: 'Netflix',
      time: 'Yesterday',
      amount: -15.99,
    },
  ];

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <FileText className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
          </div>
        </div>

        <div className="space-y-4">
          {transactions.map((tx, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${tx.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'} rounded-xl flex items-center justify-center`}>
                  <span className={tx.amount > 0 ? 'text-green-500' : 'text-red-500'}>{tx.icon}</span>
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
    </div>
  );
};