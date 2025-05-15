import React from 'react';
import { CalendarClock, Zap } from 'lucide-react';
import { Card } from '../ui/Card';

interface BillProps {
  icon: React.ReactNode;
  name: string;
  date: string;
  day: number;
  amount: number;
}

const Bill: React.FC<BillProps> = ({ icon, name, date, day, amount }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-800/30 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <h4 className="font-medium text-white">{name}</h4>
          <p className="text-sm text-gray-400">{date} {day}</p>
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="font-semibold text-red-400">${amount.toLocaleString()}</p>
        <button className="px-3 py-1 bg-gray-800 rounded-md text-xs font-medium hover:bg-gray-700 transition-colors">
          Mark as paid
        </button>
      </div>
    </div>
  );
};

export const UpcomingBills: React.FC = () => {
  const bills = [
    {
      icon: <Zap size={18} />,
      name: 'Netflix',
      date: 'Dec',
      day: 1,
      amount: 15.99
    },
    {
      icon: <Zap size={18} />,
      name: 'Spotify',
      date: 'Dec',
      day: 2,
      amount: 9.99
    },
    {
      icon: <Zap size={18} />,
      name: 'Apple Storage',
      date: 'Dec',
      day: 5,
      amount: 2.99
    }
  ];

  return (
    <Card
      title="Upcoming Bills"
      icon={<CalendarClock size={20} />}
      infoTooltip="View your upcoming bills"
    >
      <div className="space-y-1">
        {bills.map((bill, index) => (
          <Bill key={index} {...bill} />
        ))}
      </div>
    </Card>
  );
};