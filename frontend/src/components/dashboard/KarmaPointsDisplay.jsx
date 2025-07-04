import React from 'react';
import { useKarma } from '../../hooks/useKarma';
import Button from '../common/Button';
import { useTranslation } from 'react-i18next';

const KarmaPointsDisplay = ({ onRedeemClick }) => {
  const { karmaPoints, loading, error } = useKarma();
  const { t } = useTranslation();

  if (loading) return <div className="bg-white rounded-lg shadow-md p-6 text-center">{t('loadingKarma')}</div>;
  if (error) return <div className="bg-white rounded-lg shadow-md p-6 text-center text-red-600">{t('errorLoadingKarma')}</div>;

  return (
    <div className="bg-gradient-to-r from-secondary to-green-500 text-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
      <h3 className="text-xl font-bold mb-2">{t('Your Karma Points')}</h3>
      <p className="text-5xl font-extrabold mb-4">{karmaPoints}</p>
      <p className="text-green-100 text-sm mb-4">
        {t('Karma Description')}
      </p>
      <Button variant="ghost" onClick={onRedeemClick} className="!bg-white !text-secondary hover:!bg-gray-100">
        {t('Redeem Karma')}
      </Button>
    </div>
  );
};

export default KarmaPointsDisplay;