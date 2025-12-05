import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, ArrowRight } from 'lucide-react';

const Blog = () => {
  const { t } = useTranslation();

  const articles = [
    {
      image: 'https://images.unsplash.com/photo-1607529378676-a20456ee2f6b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHw0fHxzbWlsaW5nJTIwcGVyc29ufGVufDB8fHx8MTc2NDkyNTg4N3ww&ixlib=rb-4.1.0&q=85',
      title: '10 Tips for Creating the Perfect Dating Profile',
      excerpt: 'Learn how to make your profile stand out and attract the right matches with these expert tips.',
      date: 'December 1, 2024',
      category: 'Dating Tips',
    },
    {
      image: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFkdWx0JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY0OTI1ODc4fDA&ixlib=rb-4.1.0&q=85',
      title: 'First Date Ideas That Will Impress',
      excerpt: 'Looking for unique first date ideas? Check out these creative suggestions that are sure to leave a lasting impression.',
      date: 'November 28, 2024',
      category: 'Date Ideas',
    },
    {
      image: 'https://images.unsplash.com/photo-1540222797359-e9b786124d4b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHx5b3VuZyUyMGFkdWx0JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzY0OTI1ODc4fDA&ixlib=rb-4.1.0&q=85',
      title: 'How to Keep the Conversation Going',
      excerpt: 'Struggling with what to say? These conversation starters and tips will help you connect on a deeper level.',
      date: 'November 25, 2024',
      category: 'Communication',
    },
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            {t('blog.title')}
          </h2>
          <p className="text-xl text-gray-600">
            {t('blog.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar className="w-4 h-4 mr-2" />
                  {article.date}
                  <span className="mx-2">•</span>
                  <span className="text-primary-500 font-medium">{article.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2">{article.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                <button className="text-primary-500 font-semibold hover:text-primary-600 transition flex items-center">
                  {t('blog.readMore')}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/blog"
            className="inline-block bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition"
          >
            {t('blog.allArticles')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Blog;