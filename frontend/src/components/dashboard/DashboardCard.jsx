// src/components/dashboard/DashboardCard.jsx
import React from 'react';

const DashboardCard = ({ title, value, icon, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
      <div className="mb-3">
        {icon || (
          <svg
            className="w-10 h-10 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
      {value !== undefined && (
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      )}
      {description && (
        <p className="text-gray-500 text-sm">{description}</p>
      )}
    </div>
  );
};

export default DashboardCard;
