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
        <h1 className="text-7xl font-extrabold text-primary mb-4">404</h1>
        <p className="text-3xl font-semibold text-gray-800 mb-4">{t('pageNotFound')}</p>
        <p className="text-lg text-gray-600 mb-8">{t('pageNotFoundDescription')}</p>
        <Link to="/">
          <Button>{t('goToHomepage')}</Button>
        </Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;