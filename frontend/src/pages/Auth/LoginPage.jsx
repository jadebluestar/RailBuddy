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
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('Login')}</h1>
        <p className="text-gray-600 mb-8">{t('Sign in to your account to access all features.')}</p>

        <form onSubmit={handleSubmit}>
          <InputField
            label={t('Email')}
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
            error={formError || authError ? (email ? '' : formError) : ''}
          />
          <InputField
            label={t('Password')}
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            error={formError || authError ? (password ? '' : formError) : ''}
          />

          {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
          {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? <LoadingSpinner className="w-4 h-4" color="white" /> : t('Login')}
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {t('Do not have an account?')}{' '}
          <a href="/auth/register" className="text-primary font-semibold hover:underline">{t('Register Now')}</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;