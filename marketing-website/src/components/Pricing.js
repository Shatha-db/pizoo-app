import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {t('pricing.plans', { returnObjects: true }).map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-3xl shadow-xl overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl animate-slide-up ${
                plan.popular ? 'ring-4 ring-primary-500' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-2 rounded-bl-2xl font-semibold flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>Most Popular</span>
                </div>
              )}
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                {plan.savings && (
                  <p className="text-sm text-green-600 font-semibold mb-4">{plan.savings}</p>
                )}
                <div className="flex items-baseline mb-6">
                  <span className="text-5xl font-bold gradient-text">{plan.price}</span>
                  <span className="text-2xl text-gray-600 ml-2">{plan.currency}</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="w-5 h-5 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => window.open('https://pizoo-debug.preview.emergentagent.com', '_blank')}
                  className={`w-full py-4 rounded-full font-semibold transition ${
                    plan.popular
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-xl transform hover:scale-105'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {t('pricing.cta')}
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-gray-600">
          ✓ {t('pricing.moneyBack')}
        </p>
      </div>
    </section>
  );
};

export default Pricing;