import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, loading, authError } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    if (!email || !password) {
      setFormError('Please enter both email and password.');
      return;
    }

    try {
      await login({ email, password });
      navigate('/dashboard'); // Redirect to dashboard on successful login
    } catch (err) {
      // Error handled by AuthContext, displayed via authError
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t('login')}</h2>

        <form onSubmit={handleSubmit}>
          <InputField
            label={t('email')}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
            error={formError || authError ? (email ? '' : formError) : ''}
          />
          <InputField
            label={t('password')}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            error={formError || authError ? (password ? '' : formError) : ''}
          />

          {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
          {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? <LoadingSpinner className="w-5 h-5" color="white" /> : t('login')}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {t('forgotPassword')} <Link to="/forgot-password" className="text-primary hover:underline">{t('resetPassword')}</Link>
        </p>
        <p className="mt-2 text-center text-gray-600">
          {t('noAccount')} <Link to="/register" className="text-primary hover:underline">{t('register')}</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;