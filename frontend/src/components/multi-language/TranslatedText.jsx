import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';

/**
 * Usage:
 * <TranslatedText variables={{ name: 'Priya' }}>
 *   Hello {{name}}! Welcome.
 * </TranslatedText>
 */

export const TranslatedText = ({ children, variables = {}, className = '' }) => {
  const { tSync, t, currentLanguage, isTranslating } = useTranslation();

  const [translatedText, setTranslatedText] = useState(() =>
    tSync(children, variables)
  );

  useEffect(() => {
    const translateAsync = async () => {
      if (currentLanguage !== 'en') {
        const translated = await t(children, variables);
        setTranslatedText(translated);
      } else {
        setTranslatedText(children);
      }
    };

    translateAsync();
  }, [children, currentLanguage, variables, t]);

  return (
    <span className={className}>
      {translatedText}
      {isTranslating && currentLanguage !== 'en' && (
        <span className="ml-1 text-blue-500 animate-pulse">⟳</span>
      )}
    </span>
  );
};
