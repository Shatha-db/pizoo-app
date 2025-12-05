import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles, Video, Shield, MessageCircle, MapPin, HeadphonesIcon } from 'lucide-react';

const Features = () => {
  const { t } = useTranslation();

  const icons = [Sparkles, Video, Shield, MessageCircle, MapPin, HeadphonesIcon];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t('features.items', { returnObjects: true }).map((feature, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 gradient-bg rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;