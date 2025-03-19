import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
      className="px-3 py-1 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
    >
      {language === 'ar' ? 'English' : 'العربية'}
    </button>
  );
}