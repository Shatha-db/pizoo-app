import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save } from 'lucide-react';

const AdminBlog = () => {
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentArticle, setCurrentArticle] = useState({
    id: null,
    title: '',
    content: '',
    excerpt: '',
    author: '',
    date: new Date().toISOString(),
    category: '',
    image: '',
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = () => {
    const saved = localStorage.getItem('pizoo_blog_articles');
    if (saved) {
      setArticles(JSON.parse(saved));
    }
  };

  const saveArticles = (updatedArticles) => {
    localStorage.setItem('pizoo_blog_articles', JSON.stringify(updatedArticles));
    setArticles(updatedArticles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentArticle.id) {
      // Update existing
      const updated = articles.map(a => a.id === currentArticle.id ? currentArticle : a);
      saveArticles(updated);
    } else {
      // Add new
      const newArticle = {
        ...currentArticle,
        id: Date.now(),
        date: new Date().toISOString(),
      };
      saveArticles([...articles, newArticle]);
    }

    resetForm();
  };

  const handleEdit = (article) => {
    setCurrentArticle(article);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updated = articles.filter(a => a.id !== id);
      saveArticles(updated);
    }
  };

  const resetForm = () => {
    setCurrentArticle({
      id: null,
      title: '',
      content: '',
      excerpt: '',
      author: '',
      date: new Date().toISOString(),
      category: '',
      image: '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold gradient-text">Blog CMS Admin</h1>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:shadow-lg transition"
          >
            <Plus className="w-5 h-5" />
            <span>New Article</span>
          </button>
        </div>

        {/* Editor Form */}
        {isEditing && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{currentArticle.id ? 'Edit Article' : 'New Article'}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={currentArticle.title}
                  onChange={(e) => setCurrentArticle({...currentArticle, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <input
                  type="text"
                  value={currentArticle.excerpt}
                  onChange={(e) => setCurrentArticle({...currentArticle, excerpt: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={currentArticle.content}
                  onChange={(e) => setCurrentArticle({...currentArticle, content: e.target.value})}
                  rows="10"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                  <input
                    type="text"
                    value={currentArticle.author}
                    onChange={(e) => setCurrentArticle({...currentArticle, author: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input
                    type="text"
                    value={currentArticle.category}
                    onChange={(e) => setCurrentArticle({...currentArticle, category: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={currentArticle.image}
                  onChange={(e) => setCurrentArticle({...currentArticle, image: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-full flex items-center space-x-2 hover:shadow-lg transition"
                >
                  <Save className="w-5 h-5" />
                  <span>Save Article</span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-full hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Articles List */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">All Articles ({articles.length})</h2>
          <div className="space-y-4">
            {articles.map((article) => (
              <div key={article.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition">
                <div className="flex items-center space-x-4">
                  <img src={article.image} alt={article.title} className="w-20 h-20 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-bold text-lg">{article.title}</h3>
                    <p className="text-sm text-gray-500">
                      {article.category} • {new Date(article.date).toLocaleDateString()} • {article.author}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(article)}
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
            {articles.length === 0 && (
              <p className="text-center text-gray-500 py-8">No articles yet. Create your first article!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;
