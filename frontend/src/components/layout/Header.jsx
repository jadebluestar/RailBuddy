import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../multi-language/LanguageSelector';
import logo from '../../assets/images/logo.png'; // Make sure you have a logo image

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="SeatLink Logo" className="h-8 mr-2" />
          <span className="text-2xl font-bold text-gray-800 hidden sm:block">RailBuddy</span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">{t('How It Works')}</Link>
          <Link to="/exchange" className="text-gray-600 hover:text-primary transition-colors">{t('Exchange Seats')}</Link>
          <Link to="/chat" className="text-gray-600 hover:text-primary transition-colors">{t('Chat')}</Link>
          <Link to="/pricing" className="text-gray-600 hover:text-primary transition-colors">{t('Pricing')}</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors">{t('Dashboard')}</Link>
              <Link to="/profile" className="text-gray-600 hover:text-primary transition-colors">{t('Profile')}</Link>
              <button onClick={handleLogout} className="text-primary hover:text-blue-700 transition-colors font-medium">
                {t('Log Out')}
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {t('Login / Register')}
            </Link>
          )}
          <LanguageSelector />
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 p-4 pt-20 flex flex-col items-center space-y-4 shadow-lg animate-fade-in-down">
          <Link to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg hover:text-primary transition-colors">{t('How It Works')}</Link>
          <Link to="/exchange" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg hover:text-primary transition-colors">{t('Exchange Seats')}</Link>
          <Link to="/chat" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg hover:text-primary transition-colors">{t('Chat')}</Link>
          <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg hover:text-primary transition-colors">{t('Pricing')}</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg hover:text-primary transition-colors">{t('Dashboard')}</Link>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-800 text-lg hover:text-primary transition-colors">{t('Profile')}</Link>
              <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="text-primary text-lg hover:text-blue-700 transition-colors font-medium">
                {t('Log Out')}
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors w-full text-center">
              {t('Login / Register')}
            </Link>
          )}
          <LanguageSelector />
          <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-md p-1">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;