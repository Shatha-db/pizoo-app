import React from 'react';
import { useTranslation } from 'react-i18next';
import { Shield, Lock, Eye, AlertCircle, FileCheck, Clock } from 'lucide-react';

const Privacy = () => {
  const { t } = useTranslation();
  const icons = [Lock, Shield, Eye, AlertCircle, FileCheck, Clock];

  return (
    <section id="privacy" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block p-4 bg-primary-100 rounded-full mb-4">
            <Shield className="w-12 h-12 text-primary-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t('privacy.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('privacy.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t('privacy.items', { returnObjects: true }).map((item, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border-2 border-gray-100 hover:border-primary-200 hover:shadow-xl transition transform hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button className="text-primary-500 font-semibold hover:text-primary-600 transition underline">
            {t('privacy.cta')} →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Privacy;