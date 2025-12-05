import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'de', name: 'Deutsch' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
    { code: 'ru', name: 'Русский' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangOpen(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const openApp = () => {
    window.open('https://pizoo-debug.preview.emergentagent.com', '_blank');
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold gradient-text">Pizoo</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-primary-500 transition">
              {t('nav.home')}
            </button>
            <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-primary-500 transition">
              {t('nav.features')}
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-primary-500 transition">
              {t('nav.howItWorks')}
            </button>
            <a href="/blog" className="text-gray-700 hover:text-primary-500 transition">
              {t('nav.blog')}
            </a>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary-500 transition"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm">{i18n.language.toUpperCase()}</span>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 max-h-96 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition ${
                        i18n.language === lang.code ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={openApp} className="text-gray-700 hover:text-primary-500 transition font-medium">
              {t('nav.signIn')}
            </button>
            <button
              onClick={openApp}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition"
            >
              {t('nav.getStarted')}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="text-gray-700">
              <Globe className="w-6 h-6" />
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-4">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left text-gray-700 hover:text-primary-500 transition">
              {t('nav.home')}
            </button>
            <button onClick={() => scrollToSection('features')} className="block w-full text-left text-gray-700 hover:text-primary-500 transition">
              {t('nav.features')}
            </button>
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left text-gray-700 hover:text-primary-500 transition">
              {t('nav.howItWorks')}
            </button>
            <a href="/blog" className="block text-gray-700 hover:text-primary-500 transition">
              {t('nav.blog')}
            </a>
            <button onClick={openApp} className="block w-full text-left text-gray-700 hover:text-primary-500 transition font-medium">
              {t('nav.signIn')}
            </button>
            <button
              onClick={openApp}
              className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition"
            >
              {t('nav.getStarted')}
            </button>
          </div>
        </div>
      )}

      {/* Mobile Language Menu */}
      {isLangOpen && (
        <div className="md:hidden bg-white border-t max-h-64 overflow-y-auto">
          <div className="px-4 py-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`block w-full text-left px-4 py-2 rounded hover:bg-gray-100 transition ${
                  i18n.language === lang.code ? 'bg-primary-50 text-primary-600 font-medium' : 'text-gray-700'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;