import React from 'react';
import Layout from '../components/layout/Layout';
import AccessibilitySettings from '../components/accessibiility/AccessibilitySettings';
import { useTranslation } from 'react-i18next';

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{t('settings')}</h1>
        <AccessibilitySettings />
      </div>
    </Layout>
  );
};

export default SettingsPage;