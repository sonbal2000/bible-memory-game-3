import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between text-purple-600 mb-1 px-1">
        <span>암송 진행률</span>
        <span>{percentage}%</span>
      </div>
      <div className="w-full bg-purple-200 rounded-full h-4 overflow-hidden shadow-inner">
        <div 
          className="bg-purple-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;