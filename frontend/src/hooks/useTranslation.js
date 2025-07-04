import { useState, useEffect, useCallback } from 'react';

// Free translation service using MyMemory API (no API key required)
const translateText = async (text, targetLang, sourceLang = 'en') => {
  try {
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
    );
    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text if translation fails
  }
};

// Cache to store translations
const translationCache = new Map();

export const useTranslation = (initialLanguage = 'en') => {
  const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);
  const [isTranslating, setIsTranslating] = useState(false);

  // Function to translate text
  const t = useCallback(async (text, variables = {}) => {
    if (currentLanguage === 'en') {
      // Replace variables in text
      return Object.keys(variables).reduce((result, key) => {
        return result.replace(`{{${key}}}`, variables[key]);
      }, text);
    }

    const cacheKey = `${text}-${currentLanguage}`;
    
    // Check cache first
    if (translationCache.has(cacheKey)) {
      const translated = translationCache.get(cacheKey);
      return Object.keys(variables).reduce((result, key) => {
        return result.replace(`{{${key}}}`, variables[key]);
      }, translated);
    }

    try {
      setIsTranslating(true);
      const translated = await translateText(text, currentLanguage);
      
      // Cache the translation
      translationCache.set(cacheKey, translated);
      
      // Replace variables in translated text
      const finalText = Object.keys(variables).reduce((result, key) => {
        return result.replace(`{{${key}}}`, variables[key]);
      }, translated);
      
      return finalText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text;
    } finally {
      setIsTranslating(false);
    }
  }, [currentLanguage]);

  // Synchronous version for simple cases (uses cache or returns original)
  const tSync = useCallback((text, variables = {}) => {
    if (currentLanguage === 'en') {
      return Object.keys(variables).reduce((result, key) => {
        return result.replace(`{{${key}}}`, variables[key]);
      }, text);
    }

    const cacheKey = `${text}-${currentLanguage}`;
    const cached = translationCache.get(cacheKey);
    
    if (cached) {
      return Object.keys(variables).reduce((result, key) => {
        return result.replace(`{{${key}}}`, variables[key]);
      }, cached);
    }
    
    // If not cached, trigger async translation and return original for now
    t(text, variables);
    return text;
  }, [currentLanguage, t]);

  return {
    t,
    tSync,
    currentLanguage,
    setLanguage: setCurrentLanguage,
    isTranslating,
    supportedLanguages: {
      supportedLanguages: {
  'en': 'English',
  'hi': 'हिन्दी',
  'bn': 'বাংলা',
  'ta': 'தமிழ்',
  'te': 'తెలుగు',
  'kn': 'ಕನ್ನಡ',
  'ml': 'മലയാളം',
  'gu': 'ગુજરાતી',
  'mr': 'मराठी',
  'pa': 'ਪੰਜਾਬੀ',
}

    }
  };
};