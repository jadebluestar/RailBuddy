import React from 'react';

const LoadingSpinner = ({ className = 'w-8 h-8', color = 'primary' }) => {
  const spinnerClass = `animate-spin rounded-full border-4 border-t-4 border-t-${color} border-gray-200 ${className}`;

  return (
    <div className="flex justify-center items-center">
      <div className={spinnerClass}></div>
    </div>
  );
};

export default LoadingSpinner;