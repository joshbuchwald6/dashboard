import React from 'react';
import { Calendar } from 'lucide-react';

export const UpcomingPayments = () => {
  const payments = [
    { name: 'Netflix', date: 'Dec 1', amount: 15.99, icon: '📺' },
    { name: 'Spotify', date: 'Dec 2', amount: 9.99, icon: '🎵' },
    { name: 'iCloud', date: 'Dec 5', amount: 2.99, icon: '☁️' },
  ];

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative bg-black/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl transform transition-all duration-500 hover:scale-[1.02]">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-amber-500/20 rounded-xl">
            <Calendar className="w-6 h-6 text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-white">Upcoming</h2>
        </div>

        <div className="space-y-4">
          {payments.map((payment, index) => (
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
              <p className="text-white font-medium">
                ${payment.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};