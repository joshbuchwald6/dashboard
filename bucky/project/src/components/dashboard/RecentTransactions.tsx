import React from 'react';
import { FileText, ShoppingCart, CreditCard, ArrowRight, TrendingDown, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';

interface TransactionProps {
  icon: React.ReactNode;
  name: string;
  time: string;
  amount: number;
  isCredit?: boolean;
}

const Transaction: React.FC<TransactionProps> = ({ icon, name, time, amount, isCredit = false }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800/30 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${isCredit ? 'bg-emerald-400/20 text-emerald-400' : 'bg-red-400/20 text-red-400'} rounded-lg flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-white">{name}</h4>
          <p className="text-sm text-gray-400">{time}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${isCredit ? 'text-emerald-400' : 'text-red-400'}`}>
          {isCredit ? '+' : '-'}${Math.abs(amount).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export const RecentTransactions: React.FC = () => {
  const transactions = [
    {
      icon: <ShoppingCart size={18} />,
      name: 'Apple Store Purchase',
      time: 'Today, 2:45 PM',
      amount: 999.00,
      isCredit: false
    },
    {
      icon: <CreditCard size={18} />,
      name: 'Salary Deposit',
      time: 'Today, 9:00 AM',
      amount: 4500.00,
      isCredit: true
    },
    {
      icon: <CreditCard size={18} />,
      name: 'Netflix Subscription',
      time: 'Yesterday',
      amount: 15.99,
      isCredit: false
    },
    {
      icon: <ShoppingCart size={18} />,
      name: 'Apple Store Purchase',
      time: 'Today, 2:45 PM',
      amount: 999.00,
      isCredit: false
    },
    {
      icon: <CreditCard size={18} />,
      name: 'Supabase Subscription',
      time: 'Yesterday',
      amount: 15.99,
      isCredit: false
    },
    {
      icon: <CreditCard size={18} />,
      name: 'Vercel Subscription',
      time: 'Yesterday',
      amount: 15.99,
      isCredit: false
    }
  ];

  return (
    <Card 
      title="Recent Transactions" 
      icon={<FileText size={20} />}
      infoTooltip="View your recent transactions"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400">Recent Activity</h3>
          <p className="text-xs text-gray-500">(23 transactions)</p>
        </div>
        <div className="bg-gray-800 rounded-lg px-3 py-1 text-xs text-gray-400">
          This Month
        </div>
      </div>
      
      <div className="space-y-1">
        {transactions.map((transaction, index) => (
          <Transaction key={index} {...transaction} />
        ))}
      </div>
      
      <button className="flex items-center justify-center gap-2 w-full py-2.5 px-4 mt-6 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
        <span className="text-sm font-medium">View All Transactions</span>
        <ArrowRight size={16} />
      </button>
    </Card>
  );
};