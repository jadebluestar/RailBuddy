import React from 'react';
import MatchCard from './MatchCard';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '../common/LoadingSpinner';

const MatchResults = ({ matches, isLoading, error, onInitiateChat, onSendExchangeRequest }) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <LoadingSpinner className="w-12 h-12 mb-4" />
        <p className="text-lg text-gray-600">{t('findingBestMatches')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-600">
        <p className="text-lg mb-2">{t('errorLoadingMatches')}</p>
        <p className="text-sm">{error.message || t('pleaseTryAgain')}</p>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">{t('noMatchesFound')}</p>
        <p className="text-sm mt-2">{t('tryAdjustingPreferences')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          onInitiateChat={onInitiateChat}
          onSendExchangeRequest={onSendExchangeRequest}
        />
      ))}
    </div>
  );
};

export default MatchResults;