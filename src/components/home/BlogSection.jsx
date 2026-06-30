import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Calendar, Clock } from 'lucide-react';
import { BLOG_POSTS } from '@/pages/Blog';

const CATEGORY_COLORS = {
  'Інструкції': 'bg-blue-100 text-blue-700',
  'Технології': 'bg-purple-100 text-purple-700',
  'Матеріали': 'bg-yellow-100 text-yellow-700',
  'Обладнання': 'bg-green-100 text-green-700',
  'Бізнес': 'bg-orange-100 text-orange-700',
};

export default function BlogSection() {
  const featured = BLOG_POSTS.find(p => p.featured);
  const rest = BLOG_POSTS.filter(p => !p.featured).slice(0, 2);

  return (
    <section className="py-14 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
          <div>
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">Корисні матеріали</p>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Наш блог</h2>
          </div>
          <Link to="/blog" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
            Всі статті <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Featured — spans 2 cols */}
          {featured && (
            <Link
              to={`/blog/${featured.slug}`}
              className="group lg:col-span-2 bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="relative overflow-hidden h-52">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">Головна стаття</span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start mb-2 ${CATEGORY_COLORS[featured.category] || 'bg-gray-100 text-gray-700'}`}>
                  {featured.category}
                </span>
                <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors leading-snug">
                  {featured.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-2">{featured.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                  </div>
                  <span className="text-primary text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Читати <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Side posts */}
          <div className="flex flex-col gap-5">
            {rest.map(post => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col flex-1"
              >
                <div className="relative overflow-hidden h-32">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full self-start mb-2 ${CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-700'}`}>
                    {post.category}
                  </span>
                  <h3 className="font-bold text-foreground text-sm mb-1 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                    <span className="text-primary text-xs font-semibold flex items-center gap-1">
                      Читати <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}