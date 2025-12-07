import React from 'react';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';

const TermsPage = () => {
  const { t } = useTranslation();

  const sections = t('terms.sections', { returnObjects: true });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            {t('terms.hero.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('terms.hero.subtitle')}
          </p>
          <p className="text-sm text-gray-500 mt-4">
            {t('terms.hero.lastUpdated')}: {t('terms.hero.date')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">
                  {section.title}
                </h2>
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-600 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.list && (
                  <ul className="list-disc pl-6 space-y-2 text-gray-600">
                    {section.list.map((item, lIndex) => (
                      <li key={lIndex}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 p-8 bg-pink-50 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              {t('terms.contact.title')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('terms.contact.description')}
            </p>
            <a
              href="mailto:legal@pizoo.ch"
              className="text-primary-500 font-semibold hover:underline"
            >
              legal@pizoo.ch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;
