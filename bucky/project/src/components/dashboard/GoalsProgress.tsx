import React from 'react';
import { Target } from 'lucide-react';
import { Card } from '../ui/Card';

interface Goal {
  name: string;
  current: number;
  target: number;
  color: string;
}

export const GoalsProgress: React.FC = () => {
  const goals: Goal[] = [
    { 
      name: 'Emergency Fund', 
      current: 6500, 
      target: 10000, 
      color: 'rgba(167, 139, 250, 1)' // purple
    },
    { 
      name: 'Vacation', 
      current: 1200, 
      target: 3000, 
      color: 'rgba(249, 168, 212, 1)' // pink
    },
    { 
      name: 'Investments', 
      current: 4500, 
      target: 10000, 
      color: 'rgba(45, 212, 191, 1)' // teal
    }
  ];

  const totalPercentage = goals.reduce((sum, goal) => sum + goal.current, 0) / 
                          goals.reduce((sum, goal) => sum + goal.target, 0);

  // Calculate the sweep angle for each goal segment in the donut chart
  const calculateSegments = () => {
    const total = goals.reduce((sum, goal) => sum + goal.current, 0);
    let startAngle = 0;
    
    return goals.map(goal => {
      const percentage = goal.current / total;
      const angle = percentage * 360;
      const segment = {
        startAngle,
        endAngle: startAngle + angle,
        color: goal.color
      };
      startAngle += angle;
      return segment;
    });
  };

  const segments = calculateSegments();

  return (
    <Card
      title="Goals Progress"
      icon={<Target size={20} />}
      infoTooltip="View your savings goals progress"
    >
      <div className="flex flex-col items-center mb-6">
        <div className="relative w-36 h-36">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="#374151"
              strokeWidth="12"
            />
            
            {/* Goal segments */}
            {segments.map((segment, index) => {
              // Convert angles to radians and calculate the path
              const startAngleRad = (segment.startAngle - 90) * (Math.PI / 180);
              const endAngleRad = (segment.endAngle - 90) * (Math.PI / 180);
              
              const x1 = 50 + 40 * Math.cos(startAngleRad);
              const y1 = 50 + 40 * Math.sin(startAngleRad);
              const x2 = 50 + 40 * Math.cos(endAngleRad);
              const y2 = 50 + 40 * Math.sin(endAngleRad);
              
              // Determine if the arc should be drawn as a large arc
              const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
              
              // Create the path for the arc
              const pathData = `
                M 50 50
                L ${x1} ${y1}
                A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}
                Z
              `;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={segment.color}
                  className="transition-all duration-500 ease-out"
                />
              );
            })}
            
            {/* Inner circle for donut effect */}
            <circle
              cx="50"
              cy="50"
              r="32"
              fill="#111827"
            />
          </svg>
        </div>
      </div>
      
      <div className="space-y-2">
        {goals.map((goal, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: goal.color }}></div>
              <span className="text-sm text-white">{goal.name}</span>
            </div>
            <span className="text-sm text-gray-400">
              {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};