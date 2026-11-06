import { useState } from 'react';
import { Clock, ArrowRight, ChevronLeft } from 'lucide-react';
import { blogArticles } from '../data/blogArticles';

interface BlogPageProps {
  onNavigate: (page: string) => void;
}

export default function BlogPage({ onNavigate }: BlogPageProps) {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  if (selectedArticle) {
    const article = blogArticles.find((a) => a.id === selectedArticle);
    if (!article) return null;

    return (
      <div className="pt-20">
        <section className="section-padding bg-white">
          <div className="container-custom max-w-4xl">
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center text-navy hover:text-yellow transition-colors mb-8"
            >
              <ChevronLeft size={20} className="mr-2" />
              Zurück zur Übersicht
            </button>

            <div className="mb-8">
              <span className="inline-block bg-yellow/20 text-navy px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {article.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-navy mb-4">
                {article.title}
              </h1>
              <div className="flex items-center text-gray-600">
                <span>{article.date}</span>
                <span className="mx-3">•</span>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  {article.readTime} Lesezeit
                </div>
              </div>
            </div>

            {article.image && (
              <div className="rounded-lg mb-8 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 md:h-64 object-cover"
                />
              </div>
            )}

            <article className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-navy mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-navy mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <p key={index} className="font-semibold text-navy my-4">
                      {paragraph.replace(/\*\*/g, '')}
                    </p>
                  );
                } else if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter((item) => item.startsWith('- '));
                  return (
                    <ul key={index} className="list-disc list-inside space-y-2 my-4 text-gray-700">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                } else {
                  return (
                    <p key={index} className="text-gray-700 leading-relaxed my-4">
                      {paragraph}
                    </p>
                  );
                }
              })}
            </article>

            <div className="mt-12 p-8 bg-yellow/10 rounded-lg border-2 border-yellow">
              <h3 className="text-2xl font-bold text-navy mb-4">
                Möchten Sie tiefer einsteigen?
              </h3>
              <p className="text-gray-700 mb-6">
                Lassen Sie uns in einem persönlichen Gespräch herausfinden, wie ich Sie bei Ihren technischen Herausforderungen unterstützen kann.
              </p>
              <button
                onClick={() => onNavigate('contact')}
                className="btn-primary"
              >
                Kostenloses Strategiegespräch buchen
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <section className="section-padding bg-gradient-to-br from-navy to-gray-900 text-white">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            Blog
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto animate-fade-in">
            Einblicke, Erfahrungen und Expertise aus Verfahrenstechnik, Pyrolyse, Innovation und Mentoring
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                {article.image ? (
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="bg-gray-200 h-48 flex items-center justify-center">
                    <p className="text-gray-500 text-sm text-center px-4">
                      [Featured Image]
                    </p>
                  </div>
                )}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="mb-3">
                    <span className="inline-block bg-yellow/20 text-navy px-3 py-1 rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy mb-3 flex-grow">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{article.date}</span>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedArticle(article.id)}
                    className="flex items-center text-yellow hover:text-navy font-semibold transition-colors"
                  >
                    Weiterlesen <ArrowRight size={18} className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-yellow">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-navy mb-6">
            Möchten Sie persönliche Begleitung?
          </h2>
          <p className="text-lg text-navy/80 mb-8 max-w-3xl mx-auto">
            Die Artikel geben Ihnen Einblicke – im persönlichen Gespräch finden wir gemeinsam Lösungen für Ihre spezifischen Herausforderungen.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="btn-secondary"
          >
            Kostenloses Strategiegespräch buchen
          </button>
        </div>
      </section>
    </div>
  );
}
