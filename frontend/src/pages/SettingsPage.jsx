import React from 'react';
import Layout from '../components/layout/Layout';
import AccessibilitySettings from '../components/accessibiility/AccessibilitySettings';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('Settings')}</h1>
        <p className="text-gray-600 mb-8">{t('Update your account settings and preferences.')}</p>
        <AccessibilitySettings />
      </div>
    </Layout>
  );
};

export default SettingsPage;