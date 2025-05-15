import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: string;
  showValue?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = 'bg-purple-500',
  height = 'h-2',
  showValue = false,
  valuePrefix = '',
  valueSuffix = '',
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <div className="mt-1 text-sm text-gray-400">
          {valuePrefix}{value.toLocaleString()}{valueSuffix} / {valuePrefix}{max.toLocaleString()}{valueSuffix}
        </div>
      )}
    </div>
  );
};