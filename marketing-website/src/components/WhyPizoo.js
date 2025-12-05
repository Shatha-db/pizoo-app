import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Sparkles } from 'lucide-react';

const WhyPizoo = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative animate-fade-in">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=80"
                alt="Couple in love"
                className="rounded-3xl shadow-2xl"
                loading="lazy"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <Heart className="w-10 h-10 text-primary-500 fill-current" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">2M+</p>
                    <p className="text-sm text-gray-600">Happy Couples</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="animate-slide-up">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-primary-500" />
              <span className="text-primary-500 font-semibold">{t('whyPizoo.subtitle')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              {t('whyPizoo.title')}
            </h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              {t('whyPizoo.story')}
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed italic">
              "{t('whyPizoo.mission')}"
            </p>
            <button
              onClick={() => window.open('https://pizoo-landing.preview.emergentagent.com', '_blank')}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition transform hover:scale-105"
            >
              {t('whyPizoo.cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPizoo;