import React from 'react';
import Button from '../common/Button';
import { useTranslation } from 'react-i18next';

const ExchangeRequestList = ({ requests, onAccept, onDecline, type = 'active' }) => {
  const { t } = useTranslation();

  if (!requests || requests.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
        {type === 'active' ? t('No Active Requests') : t('No Past Requests')}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-800 p-4 border-b">
        {type === 'active' ? t('Active Exchange Requests') : t('Past Exchange History')}
      </h3>
      <ul className="divide-y divide-gray-200">
        {requests.map((request) => (
          <li key={request.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-2 sm:mb-0">
              <p className="font-semibold text-gray-800">{t('PNR')}: {request.pnr}</p>
              <p className="text-gray-600 text-sm">{t('From Seat')}: {request.currentSeat} {t('To Seat')}: {request.desiredSeat}</p>
              <p className="text-gray-500 text-xs">{t('Status')}: <span className={`font-medium ${
                request.status === 'pending' ? 'text-yellow-600' :
                request.status === 'accepted' ? 'text-green-600' :
                request.status === 'declined' ? 'text-red-600' : 'text-gray-600'
              }`}>{t(request.status.charAt(0).toUpperCase() + request.status.slice(1))}</span></p>
            </div>
            {type === 'active' && request.status === 'pending' && (
              <div className="flex space-x-2">
                <Button variant="secondary" size="sm" onClick={() => onAccept(request.id)}>
                  {t('Accept')}
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDecline(request.id)}>
                  {t('Decline')}
                </Button>
              </div>
            )}
            {type === 'history' && request.karmaAwarded && (
                <span className="text-sm text-green-600 font-semibold">{t('Karma Awarded', { points: request.karmaAwarded })}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeRequestList;