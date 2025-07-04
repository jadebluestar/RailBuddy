import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { TranslatedText } from './TranslatedText';
import { LanguageSwitcher } from './LanguageSwitcher';

export const TranslationExample = () => {
  const { t, currentLanguage } = useTranslation();
  const [asyncText, setAsyncText] = useState('');

  useEffect(() => {
    const loadTranslation = async () => {
      const translated = await t('Welcome to RailBuddy! Find your perfect seat exchange partner.');
      setAsyncText(translated);
    };
    loadTranslation();
  }, [currentLanguage, t]);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Translation Demo</h1>
        <LanguageSwitcher />
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Automatic Translation:</h3>
          <TranslatedText className="text-lg">
            Welcome to RailBuddy! Find your perfect seat exchange partner.
          </TranslatedText>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-2">With Variables:</h3>
          <TranslatedText variables={{ name: 'Priya', score: '92' }}>
            Hello {{name}}! You have a {{score}}% match.
          </TranslatedText>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium mb-2">Async Translation:</h3>
          <p className="text-lg">{asyncText}</p>
        </div>
      </div>
    </div>
  );
};
