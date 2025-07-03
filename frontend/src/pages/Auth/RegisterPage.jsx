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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">{t('register')}</h2>

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
          <InputField
            label={t('confirmPassword')}
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
            error={formError || authError ? (confirmPassword ? (password === confirmPassword ? '' : 'Passwords do not match.') : formError) : ''}
          />

          {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
          {authError && <p className="text-red-500 text-sm mb-4">{authError}</p>}

          <Button type="submit" className="w-full mt-4" disabled={loading}>
            {loading ? <LoadingSpinner className="w-5 h-5" color="white" /> : t('register')}
          </Button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          {t('alreadyHaveAccount')} <Link to="/login" className="text-primary hover:underline">{t('login')}</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;