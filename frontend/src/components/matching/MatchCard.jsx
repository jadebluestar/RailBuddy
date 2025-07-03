import React from 'react';
import Button from '../common/Button';
import { useTranslation } from 'react-i18next';
import CheckmarkIcon from '../../assets/icons/checkmark.svg'; // Import SVG
import UserIcon from '../../assets/icons/user.svg'; // Import SVG

const MatchCard = ({ match, onInitiateChat, onSendExchangeRequest }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
      <div className="flex-shrink-0">
        {/* Placeholder for user profile pic or default icon */}
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden">
          {match.profilePic ? (
            <img src={match.profilePic} alt={match.name} className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="w-12 h-12" />
          )}
        </div>
      </div>
      <div className="flex-grow text-center md:text-left">
        <h3 className="text-xl font-semibold text-gray-800 mb-1 flex items-center justify-center md:justify-start">
          {match.name}
          {match.isVerified && <CheckmarkIcon className="w-5 h-5 text-green-500 ml-2" title={t('verifiedProfile')} />}
        </h3>
        <p className="text-gray-600 mb-2">{t('travelingTo')}: <span className="font-medium">{match.destination}</span></p>
        <p className="text-gray-500 text-sm mb-3">
          {t('currentSeat')}: <span className="font-medium">{match.currentSeat}</span>, {t('desiredSeat')}: <span className="font-medium">{match.desiredSeat}</span>
        </p>
        <p className="text-gray-500 text-sm">
          {t('matchScore')}: <span className="font-bold text-primary">{match.score}%</span>
        </p>
      </div>
      <div className="flex flex-col space-y-2 w-full md:w-auto">
        <Button onClick={() => onInitiateChat(match.id)} variant="primary" size="sm">
          {t('chatNow')}
        </Button>
        <Button onClick={() => onSendExchangeRequest(match.id)} variant="outline" size="sm">
          {t('requestExchange')}
        </Button>
      </div>
    </div>
  );
};

export default MatchCard;