import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-10 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">RailBuddy</h3>
          <p className="text-gray-400">
            {t('Footer Description') || "Your trusted partner for comfortable, smarter train journeys across India. Make seat exchanges hassle-free with our AI-driven matching."}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">{t('Quick Links') || "Quick Links"}</h3>
          <ul className="space-y-2">
            <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">{t('How It Works')}</Link></li>
            <li><Link to="/pricing" className="text-gray-400 hover:text-white transition-colors">{t('Pricing')}</Link></li>
            <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">{t('Dashboard')}</Link></li>
            <li><Link to="/profile" className="text-gray-400 hover:text-white transition-colors">{t('Profile')}</Link></li>
            <li><Link to="/settings" className="text-gray-400 hover:text-white transition-colors">{t('Accessibility Settings')}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">{t('Contact Us') || "Contact Us"}</h3>
          <p className="text-gray-400 mb-2">Email: support@railbuddy.com</p>
          <p className="text-gray-400">Phone: +91 98765 43210</p>
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        &copy; {new Date().getFullYear()} RailBuddy. {t('All Rights Reserved') || "All rights reserved."}
      </div>
    </footer>
  );
};

export default Footer;
