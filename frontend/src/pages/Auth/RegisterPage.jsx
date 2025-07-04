import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { register, loading, authError } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password || !confirmPassword) {
      setFormError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long.');
      return;
    }

    try {
      await register({ email, password });
      alert('Registration successful! Please login.'); // Or show a success toast
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      console.error("Registration failed:", err);
      // authError from context will be displayed
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{t('Register')}</h1>
        <p className="text-gray-600 mb-8">{t('Create a new account to start exchanging seats.')}</p>

        <form onSubmit={handleSubmit}>
          <InputField
            label={t('Name')}
            id="name"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="John Doe"
            error={formError || authError ? (email ? '' : formError) : ''}
          />
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
          <InputField
            label={t('Confirm Password')}
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            error={formError || authError ? (confirmPassword ? (password === confirmPassword ? '' : 'Passwords do not match.') : formError) : ''}
          />

          {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
          {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? <LoadingSpinner className="w-4 h-4" color="white" /> : t('Register')}
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          {t('Already have an account?')}{' '}
          <a href="/auth/login" className="text-primary font-semibold hover:underline">{t('Login Now')}</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;