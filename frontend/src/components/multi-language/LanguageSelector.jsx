import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' }, // Hindi
    { code: 'mr', name: 'मराठी' }, // Marathi
    { code: 'bn', name: 'বাংলা' }, // Bengali
    { code: 'te', name: 'తెలుగు' }, // Telugu
    { code: 'ta', name: 'தமிழ்' }, // Tamil
    { code: 'gu', name: 'ગુજરાતી' }, // Gujarati
    { code: 'kn', name: 'ಕನ್ನಡ' }, // Kannada
    { code: 'ml', name: 'മലയാളം' }, // Malayalam
    { code: 'pa', name: 'ਪੰਜਾਬੀ' }, // Punjabi
    { code: 'or', name: 'ଓଡ଼ିଆ' }, // Oriya
    { code: 'as', name: 'অসমীয়া' }, // Assamese
    { code: 'ur', name: 'اردو' }, // Urdu
    // Add all 22 official languages of India here
    // { code: 'ks', name: 'कश्मीरी' },
    // { code: 'ne', name: 'नेपाली' },
    // { code: 'sd', name: 'सिंधी' },
    // { code: 'sa', name: 'संस्कृत' },
    // { code: 'ma', name: 'मैथिली' },
    // { code: 'bo', name: 'बोड़ो' },
    // { code: 'do', name: 'डोगरी' },
    // { code: 'mn', name: 'मणिपुरी' },
    // { code: 'sn', name: 'संथाली' },
  ];

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative inline-block text-left">
      <select
        onChange={changeLanguage}
        value={i18n.language}
        className="block w-full cursor-pointer rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-gray-700 shadow-sm focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;