import React from 'react';
import { PieChart, Banknote } from 'lucide-react';
import { Card } from '../ui/Card';

interface SpendingCategoryProps {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

const SpendingCategory: React.FC<SpendingCategoryProps> = ({ name, amount, percentage, color }) => {
  return (
    <div className="flex items-center justify-between mb-3 last:mb-0">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-sm ${color}`}></div>
        <span className="text-sm text-gray-300">{name}</span>
      </div>
      <div className="w-1/2">
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export const SpendingByCategory: React.FC = () => {
  const categories = [
    {
      name: 'Rent',
      amount: 1400,
      percentage: 48,
      color: 'bg-purple-400'
    },
    {
      name: 'Food',
      amount: 650,
      percentage: 22,
      color: 'bg-pink-400'
    },
    {
      name: 'Shopping',
      amount: 520,
      percentage: 18,
      color: 'bg-amber-400'
    },
    {
      name: 'Travel',
      amount: 200,
      percentage: 7,
      color: 'bg-blue-400'
    },
    {
      name: 'Other',
      amount: 170,
      percentage: 5,
      color: 'bg-teal-400'
    }
  ];

  const totalSpending = categories.reduce((total, category) => total + category.amount, 0);

  return (
    <Card
      title="Spending by Category"
      icon={<Banknote size={20} />}
      infoTooltip="View your spending by category"
    >
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold text-white">${totalSpending.toLocaleString()}</h2>
        <span className="text-xs text-gray-400">({categories.length} transactions)</span>
      </div>

      <div className="space-y-4">
        {categories.map((category, index) => (
          <SpendingCategory key={index} {...category} />
        ))}
      </div>
    </Card>
  );
};