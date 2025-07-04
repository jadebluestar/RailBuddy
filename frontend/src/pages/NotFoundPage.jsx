import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] bg-gray-50 text-center p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('Page Not Found')}</h1>
        <p className="text-gray-600 mb-8">{t('The page you are looking for does not exist. Please check the URL or return to the home page.')}</p>
        <Button to="/" variant="primary">
          {t('Go to Home')}
        </Button>
      </div>
    </Layout>
  );
};

export default NotFoundPage;