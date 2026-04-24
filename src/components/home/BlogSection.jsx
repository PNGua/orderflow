import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight } from 'lucide-react';

const POSTS = [
  {
    slug: 'post-1',
    title: 'Як обрати принтер для DTF друку',
    excerpt: 'Детальний посібник для новачків і професіоналів. Розбираємо ключові параметри при виборі обладнання.',
    date: '20 квітня 2026',
    image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d6b?w=600&q=80',
  },
  {
    slug: 'post-2',
    title: 'UV DTF: нові можливості для бізнесу',
    excerpt: 'Відкрийте для себе переваги УФ ДТФ технології та як вона може розширити ваш асортимент послуг.',
    date: '15 квітня 2026',
    image: 'https://images.unsplash.com/photo-1549646452-f673322f30ae?w=600&q=80',
  },
  {
    slug: 'post-3',
    title: '5 причин використовувати сублімаційний друк',
    excerpt: 'Переваги сублімації над іншими видами друку: яскравість, довговічність та необмежені можливості.',
    date: '10 квітня 2026',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
  },
];

export default function BlogSection() {
  return (
    <section className="py-14 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="text-xs text-[#037291] font-semibold uppercase tracking-widest mb-1">Дізнайтесь більше</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Наш блог</h2>
          </div>
          <Link to="/blog" className="text-sm text-[#037291] font-medium hover:underline flex items-center gap-1">
            Всі статті <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-muted-foreground mb-2">{post.date}</p>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-[#037291] transition-colors">{post.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{post.excerpt}</p>
                <span className="text-[#037291] text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-3">
                  Читати далі <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}