import React from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin, Twitter, Mail } from 'lucide-react';

const TeamPage = () => {
  const { t } = useTranslation();

  const team = t('team.members', { returnObjects: true });

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            {t('team.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600">
            {t('team.hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-primary-400 to-secondary-400"></div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{member.name}</h3>
                  <p className="text-primary-500 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <a href={member.linkedin} className="text-gray-400 hover:text-primary-500 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.twitter} className="text-gray-400 hover:text-primary-500 transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-primary-500 transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 gradient-text">
            {t('team.joinUs.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('team.joinUs.description')}
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 gradient-bg text-white font-semibold rounded-full hover:shadow-lg transition-shadow"
          >
            {t('team.joinUs.cta')}
          </a>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
