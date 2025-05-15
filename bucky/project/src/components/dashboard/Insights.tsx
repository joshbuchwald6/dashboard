import React from 'react';
import { Lightbulb } from 'lucide-react';
import { Card } from '../ui/Card';

export const Insights: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-purple-700 to-indigo-700 border-purple-600/40">
      <div className="flex items-center gap-3 mb-4">
        <Lightbulb size={20} className="text-yellow-300" />
        <h3 className="text-lg font-semibold text-white">Insights</h3>
      </div>
      <p className="text-gray-200 mb-2">Personalized AI insight</p>
      <p className="font-semibold text-white text-lg mb-2">You're on track to save $1,200 this month! <span className="text-yellow-300">🎉</span></p>
      <button className="text-sm text-indigo-200 hover:text-white transition-colors underline mt-2">
        View more insights
      </button>
    </Card>
  );
};