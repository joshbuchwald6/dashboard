import React from 'react';
import { Wallet, ArrowRight, PlusCircle, Send, ArrowUpRight } from 'lucide-react';
import { Card } from '../ui/Card';

interface AccountProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  balance: number;
  color: string;
}

const Account: React.FC<AccountProps> = ({ icon, name, description, balance, color }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800/30 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-gray-900`}>
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-white">{name}</h4>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold text-white">${balance.toLocaleString()}</p>
      </div>
    </div>
  );
};

export const AccountsOverview: React.FC = () => {
  const accounts = [
    {
      icon: <Wallet size={18} />,
      name: 'Main Savings',
      description: 'Personal savings',
      balance: 8459.45,
      color: 'bg-emerald-400'
    },
    {
      icon: <Wallet size={18} />,
      name: 'Checking Account',
      description: 'Daily expenses',
      balance: 2850.00,
      color: 'bg-blue-400'
    },
    {
      icon: <Wallet size={18} />,
      name: 'Investment Portfolio',
      description: 'Stock & ETFs',
      balance: 15230.80,
      color: 'bg-purple-400'
    },
    {
      icon: <Wallet size={18} />,
      name: 'Credit Card',
      description: 'Pending charges',
      balance: 1200.00,
      color: 'bg-red-400'
    },
    {
      icon: <Wallet size={18} />,
      name: 'Savings Account',
      description: 'Emergency fund',
      balance: 3000.00,
      color: 'bg-teal-400'
    }
  ];

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <Card 
      title="Accounts" 
      icon={<Wallet size={20} />}
      infoTooltip="View all your accounts"
    >
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-1">Total Balance</p>
        <h2 className="text-3xl font-bold text-white">${totalBalance.toLocaleString()}</h2>
      </div>
      
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-400 mb-3">Your Accounts</h3>
        <div className="space-y-1">
          {accounts.map((account, index) => (
            <Account key={index} {...account} />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mt-6">
        <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
          <PlusCircle size={16} />
          <span className="text-sm font-medium">Add</span>
        </button>
        <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
          <Send size={16} />
          <span className="text-sm font-medium">Send</span>
        </button>
      </div>
    </Card>
  );
};