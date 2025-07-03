import React from 'react';
import Button from '../common/Button';
import { useTranslation } from 'react-i18next';

const AccessibilitySettings = () => {
  const { t } = useTranslation();

  // This is a simplified example.
  // Real accessibility would involve themes, font size adjustments (using CSS variables or utility classes),
  // high contrast modes, dyslexia-friendly fonts, etc.
  // For a hackathon, focus on demonstrating the *intent*.

  const increaseFontSize = () => {
    // Logic to increase font size (e.g., add a class to body or change CSS variable)
    document.documentElement.classList.add('text-lg'); // Example: Tailwind `text-lg`
    document.documentElement.classList.remove('text-base');
    console.log("Increased font size");
  };

  const decreaseFontSize = () => {
    // Logic to decrease font size
    document.documentElement.classList.remove('text-lg');
    document.documentElement.classList.add('text-base'); // Example: Tailwind `text-base`
    console.log("Decreased font size");
  };

  const toggleHighContrast = () => {
    document.documentElement.classList.toggle('high-contrast');
    console.log("Toggled high contrast");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('accessibilitySettings')}</h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">{t('fontSize')}</h3>
        <div className="flex space-x-3">
          <Button onClick={decreaseFontSize} variant="outline" size="sm">
            {t('decrease')} A-
          </Button>
          <Button onClick={increaseFontSize} variant="outline" size="sm">
            {t('increase')} A+
          </Button>
        </div>
        <p className="text-sm text-gray-500 mt-2">{t('adjustFontSizeDescription')}</p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">{t('visualContrast')}</h3>
        <Button onClick={toggleHighContrast} variant="outline">
          {t('toggleHighContrast')}
        </Button>
        <p className="text-sm text-gray-500 mt-2">{t('highContrastDescription')}</p>
      </div>

      {/* Add more accessibility options as time permits */}
      {/* <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Dyslexia-Friendly Font</h3>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          <span className="ms-3 text-sm font-medium text-gray-900">{t('enableDyslexiaFont')}</span>
        </label>
        <p className="text-sm text-gray-500 mt-2">{t('dyslexiaFontDescription')}</p>
      </div> */}
    </div>
  );
};

export default AccessibilitySettings;