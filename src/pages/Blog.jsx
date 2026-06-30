import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const BLOG_POSTS = [
  {
    slug: 'site-guide',
    category: 'Інструкції',
    title: 'Сайт PNG druk: повна покрокова інструкція з користування',
    excerpt: 'PNG druk — це зручний онлайн-сервіс для оформлення друку DTF та UV DTF в рулонах, а також замовлення плівок і супутніх послуг. Ви можете самостійно обрати матеріал, розрахувати вартість і оформити замовлення без дзвінків.',
    date: '18 червня 2026',
    readTime: '5 хв',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
    featured: true,
  },
  {
    slug: 'uv-dtf-film',
    category: 'Технології',
    title: 'Друк на УФ DTF плівці: технологія, можливості та підготовка файлів',
    excerpt: 'Детальний огляд технології UV DTF — від принципу роботи до практичних порад щодо підготовки макетів для ідеального результату.',
    date: '10 червня 2026',
    readTime: '7 хв',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
    featured: false,
  },
  {
    slug: 'gold-silver-film',
    category: 'Матеріали',
    title: 'Підготовка файлів для друку на золотій та срібній плівці УФ DTF',
    excerpt: 'Як правильно підготувати макет для металізованих плівок: кольори, формати, роздільна здатність і типові помилки.',
    date: '5 червня 2026',
    readTime: '6 хв',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
    featured: false,
  },
  {
    slug: 'dtf-printer-guide',
    category: 'Обладнання',
    title: 'Як обрати принтер для DTF друку',
    excerpt: 'Детальний посібник для новачків і професіоналів. Розбираємо ключові параметри при виборі обладнання для ДТФ друку.',
    date: '20 квітня 2026',
    readTime: '8 хв',
    image: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d6b?w=800&q=80',
    featured: false,
  },
  {
    slug: 'uv-dtf-business',
    category: 'Бізнес',
    title: 'UV DTF: нові можливості для бізнесу',
    excerpt: 'Відкрийте для себе переваги УФ ДТФ технології та як вона може розширити ваш асортимент послуг і збільшити прибуток.',
    date: '15 квітня 2026',
    readTime: '5 хв',
    image: 'https://images.unsplash.com/photo-1549646452-f673322f30ae?w=800&q=80',
    featured: false,
  },
  {
    slug: 'sublimation-5-reasons',
    category: 'Технології',
    title: '5 причин використовувати сублімаційний друк',
    excerpt: 'Переваги сублімації над іншими видами друку: яскравість, довговічність та необмежені можливості дизайну.',
    date: '10 квітня 2026',
    readTime: '4 хв',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    featured: false,
  },
];

const CATEGORY_COLORS = {
  'Інструкції': 'bg-blue-100 text-blue-700',
  'Технології': 'bg-purple-100 text-purple-700',
  'Матеріали': 'bg-yellow-100 text-yellow-700',
  'Обладнання': 'bg-green-100 text-green-700',
  'Бізнес': 'bg-orange-100 text-orange-700',
};

function CategoryBadge({ category }) {
  const color = CATEGORY_COLORS[category] || 'bg-gray-100 text-gray-700';
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>{category}</span>
  );
}

export default function Blog() {
  const featured = BLOG_POSTS.find(p => p.featured);
  const rest = BLOG_POSTS.filter(p => !p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl pt-5 pb-2">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Головна</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">Блог</span>
        </nav>
      </div>

      <main className="container mx-auto px-4 lg:px-8 max-w-6xl py-8 flex-1">
        <h1 className="text-3xl font-bold text-foreground mb-8">Блог</h1>

        {/* Featured Post */}
        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group block mb-10 bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative overflow-hidden h-56 lg:h-auto">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Головна стаття</span>
                </div>
              </div>
              <div className="p-7 flex flex-col justify-center">
                <CategoryBadge category={featured.category} />
                <h2 className="text-xl lg:text-2xl font-bold text-foreground mt-3 mb-3 group-hover:text-primary transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime} читання</span>
                </div>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  Читати статтю <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <CategoryBadge category={post.category} />
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />{post.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />{post.date}
                  </span>
                  <span className="text-primary text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Читати <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}