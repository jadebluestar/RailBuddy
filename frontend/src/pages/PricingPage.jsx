import React from 'react';
import Layout from '../components/layout/Layout';
import Button from '../components/common/Button';
import { useTranslation } from 'react-i18next';

const PricingPage = () => {
  const { t } = useTranslation();

  const handleSubscribe = (plan) => {
    alert(`${t('subscribingTo')} ${plan} ${t('plan')}`);
    // TODO: Integrate with payment gateway (Razorpay) here
    // This would typically redirect to a payment page or open a payment modal
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('Pricing')}</h1>
        <p className="text-gray-600 mb-8">{t('Choose the plan that best fits your travel needs.')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Basic Plan Card */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-gray-200 text-center flex flex-col">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">{t('Free Plan')}</h2>
            <p className="mb-6">{t('Enjoy basic seat exchange features at no cost.')}</p>
            <div className="text-5xl font-extrabold text-primary mb-6">
              ₹0<span className="text-lg text-gray-500">/{t('perMonth')}</span>
            </div>
            <ul className="text-left text-gray-700 space-y-3 flex-grow">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {t('basicBenefit1')}
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {t('basicBenefit2')}
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {t('basicBenefit3')}
              </li>
            </ul>
            <Button onClick={() => handleSubscribe('Basic')} variant="outline" className="mt-8">
              {t('currentPlan')}
            </Button>
          </div>

          {/* Premium Plan Card */}
          <div className="bg-primary text-white rounded-lg shadow-xl p-8 border-2 border-primary text-center flex flex-col transform scale-105 z-10">
            <p className="text-sm font-semibold mb-2 bg-white text-primary px-3 py-1 rounded-full inline-block self-center">{t('mostPopular')}</p>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">{t('Premium Plan')}</h2>
            <p className="mb-6">{t('Unlock premium features for a seamless experience.')}</p>
            <div className="text-5xl font-extrabold mb-6">
              ₹99<span className="text-lg text-blue-100">/{t('perMonth')}</span>
            </div>
            <ul className="text-left space-y-3 flex-grow">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {t('premiumBenefit1')}
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {t('premiumBenefit2')}
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {t('premiumBenefit3')}
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-300 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                {t('karmaRedemptionFeature')}
              </li>
            </ul>
            <Button onClick={() => handleSubscribe('Premium')} className="mt-8 bg-white !text-primary hover:!bg-gray-100">
              {t('subscribeNow')}
            </Button>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-600">
          <p>{t('cancellationPolicy')}</p>
        </div>
      </div>
    </Layout>
  );
};

export default PricingPage;