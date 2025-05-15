import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  infoTooltip?: string;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = "", 
  title,
  icon,
  infoTooltip
}) => {
  return (
    <div 
      className={`bg-gray-900/80 backdrop-blur-sm border border-gray-800/40 rounded-xl overflow-hidden shadow-md ${className}`}
    >
      {title && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800/40">
          <div className="flex items-center gap-3">
            {icon && <span className="text-gray-400">{icon}</span>}
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          {infoTooltip && (
            <button className="text-gray-500 hover:text-gray-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
            </button>
          )}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};