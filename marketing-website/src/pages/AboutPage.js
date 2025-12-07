import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heart, Users, Globe, Award } from 'lucide-react';

const AboutPage = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Heart,
      title: t('about.values.authenticity.title'),
      description: t('about.values.authenticity.description')
    },
    {
      icon: Users,
      title: t('about.values.community.title'),
      description: t('about.values.community.description')
    },
    {
      icon: Globe,
      title: t('about.values.inclusivity.title'),
      description: t('about.values.inclusivity.description')
    },
    {
      icon: Award,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            {t('about.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed">
            {t('about.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                {t('about.story.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                {t('about.story.paragraph1')}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t('about.story.paragraph2')}
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 shadow-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            {t('about.mission.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('about.mission.description')}
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center gradient-text">
            {t('about.values.title')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">{t('about.stats.users')}</div>
              <div className="text-gray-600">{t('about.stats.usersLabel')}</div>
            </div>
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">{t('about.stats.countries')}</div>
              <div className="text-gray-600">{t('about.stats.countriesLabel')}</div>
            </div>
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">{t('about.stats.matches')}</div>
              <div className="text-gray-600">{t('about.stats.matchesLabel')}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
