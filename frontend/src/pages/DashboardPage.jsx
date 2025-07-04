// src/pages/DashboardPage.jsx
import React from 'react';
import DashboardCard from '../components/dashboard/DashboardCard';
import { TranslatedText } from '../components/multi-language/TranslatedText';

export default function DashboardPage() {
  const stats = [
    {
      title: <TranslatedText>Karma Points</TranslatedText>,
      value: 120,
      icon: (
        <svg className="w-10 h-10 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674h4.912c.969 0 1.371 1.24.588 1.81l-3.976 2.89 1.518 4.674c.3.921-.755 1.688-1.54 1.118l-3.976-2.89-3.976 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674-3.976-2.89c-.783-.57-.38-1.81.588-1.81h4.912l1.518-4.674z" />
        </svg>
      ),
      description: <TranslatedText>Your karma balance for exchanges.</TranslatedText>,
    },
    {
      title: <TranslatedText>Exchanges Completed</TranslatedText>,
      value: 8,
      icon: (
        <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 0 1 2 2v9H3V10a2 2 0 0 1 2-2h2M16 3H8m0 0l4-4m0 0l4 4" />
        </svg>
      ),
      description: <TranslatedText>Number of seats you’ve exchanged.</TranslatedText>,
    },
    {
      title: <TranslatedText>Profile Completed</TranslatedText>,
      value: '85%',
      icon: (
        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      ),
      description: <TranslatedText>Keep your profile up-to-date.</TranslatedText>,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">
        <TranslatedText>Welcome to your Dashboard</TranslatedText>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <DashboardCard
            key={idx}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            description={stat.description}
          />
        ))}
      </div>
    </div>
  );
}
