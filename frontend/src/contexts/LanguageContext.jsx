import React, { createContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Fallback translations if files don't exist
const enTranslations = {
  welcome: "Welcome",
  login: "Login",
  register: "Register",
  dashboard: "Dashboard"
};

const hiTranslations = {
  welcome: "स्वागत",
  login: "लॉगिन",
  register: "पंजीकरण",
  dashboard: "डैशबोर्ड"
};

// Try to import translation files, fall back to defaults if they don't exist
let enImport, hiImport, mrImport, bnImport, teImport, taImport, guImport, knImport, mlImport, paImport, orImport, asImport, urImport;
try {
  enImport = require('../locales/en.json');
} catch (e) {
  enImport = enTranslations;
}
try {
  hiImport = require('../locales/hi.json');
} catch (e) {
  hiImport = hiTranslations;
}
try {
  mrImport = require('../locales/mr.json');
} catch (e) {
  mrImport = {};
}
try {
  bnImport = require('../locales/bn.json');
} catch (e) {
  bnImport = {};
}
try {
  teImport = require('../locales/te.json');
} catch (e) {
  teImport = {};
}
try {
  taImport = require('../locales/ta.json');
} catch (e) {
  taImport = {};
}
try {
  guImport = require('../locales/gu.json');
} catch (e) {
  guImport = {};
}
try {
  knImport = require('../locales/kn.json');
} catch (e) {
  knImport = {};
}
try {
  mlImport = require('../locales/ml.json');
} catch (e) {
  mlImport = {};
}
try {
  paImport = require('../locales/pa.json');
} catch (e) {
  paImport = {};
}
try {
  orImport = require('../locales/or.json');
} catch (e) {
  orImport = {};
}
try {
  asImport = require('../locales/as.json');
} catch (e) {
  asImport = {};
}
try {
  urImport = require('../locales/ur.json');
} catch (e) {
  urImport = {};
}

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enImport },
      hi: { translation: hiImport },
      mr: { translation: mrImport },
      bn: { translation: bnImport },
      te: { translation: teImport },
      ta: { translation: taImport },
      gu: { translation: guImport },
      kn: { translation: knImport },
      ml: { translation: mlImport },
      pa: { translation: paImport },
      or: { translation: orImport },
      as: { translation: asImport },
      ur: { translation: urImport },
    },
    lng: typeof window !== 'undefined' ? (localStorage.getItem('language') || 'en') : 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false
    }
  });

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLanguage(lng);
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lng);
      }
    };
    
    i18n.on('languageChanged', handleLanguageChange);
    
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};