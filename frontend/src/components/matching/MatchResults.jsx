import React from 'react';
import MatchCard from './MatchCard';
import LoadingSpinner from '../common/LoadingSpinner';

export default function MatchResults({
  matches = [],      // ✅ read from props, not localStorage!
  isLoading,
  error,
  onSendExchangeRequest
}) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner className="w-12 h-12 mb-4" />
        <p className="text-lg text-gray-600">Finding your best matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p className="text-lg mb-2">Error loading matches</p>
        <p className="text-sm">{error.message || 'Please try again'}</p>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No matches found yet</p>
        <p className="text-sm mt-2">Try adjusting your preferences</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          onSendExchangeRequest={() => onSendExchangeRequest(match.id)}
        />
      ))}
    </div>
  );
}