import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, ChevronRight, PlayCircle, Search, BookOpen } from 'lucide-react';
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
    video: 'https://media.base44.com/images/public/69d39217874c6fe682eac60a/bcd44447f_image.png',
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

/* Media block: shows video (autoplay-muted loop) when available, else image. Optional play badge for cards. */
function PostMedia({ post, badge = false, className = '' }) {
  if (post.video) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <video
          src={post.video}
          poster={post.image}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          muted
          loop
          playsInline
          autoPlay
        />
        {badge && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center pointer-events-none">
            <PlayCircle className="w-12 h-12 text-white drop-shadow-lg" />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
}

export default function Blog() {
  const [activeCat, setActiveCat] = useState('Усі');
  const [query, setQuery] = useState('');

  const categories = ['Усі', ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];
  const featured = BLOG_POSTS.find((p) => p.featured);

  const filtered = BLOG_POSTS.filter((p) => {
    if (p.featured) return false;
    const catOk = activeCat === 'Усі' || p.category === activeCat;
    const qOk = !query.trim() || (p.title + p.excerpt).toLowerCase().includes(query.trim().toLowerCase());
    return catOk && qOk;
  });

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-[#0a8fa8] text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-12 lg:py-16">
          <nav className="flex items-center gap-1 text-xs text-white/70 mb-4">
            <Link to="/" className="hover:text-white">Головна</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Блог</span>
          </nav>
          <div className="flex items-center gap-2 text-white/80 text-xs font-semibold uppercase tracking-widest mb-3">
            <BookOpen className="w-4 h-4" /> Журнал PNG druk
          </div>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-3">Блог</h1>
          <p className="text-white/85 max-w-2xl text-sm lg:text-base">
            Технології друку, поради з підготовки файлів, огляди обладнання та матеріалів — усе, що потрібно для якісного брендування.
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-6xl py-10 flex-1">
        {/* Featured */}
        {featured && (
          <Link
            to={`/blog/${featured.slug}`}
            className="group block mb-12 bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <PostMedia post={featured} className="h-56 lg:h-full min-h-72" badge={false} />
              <div className="p-7 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">Головна стаття</span>
                  {featured.video && (
                    <span className="inline-flex items-center gap-1 bg-violet-100 text-violet-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                      <PlayCircle className="w-3.5 h-3.5" /> Відео
                    </span>
                  )}
                </div>
                <div className="mb-3"><CategoryBadge category={featured.category} /></div>
                <h2 className="text-xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 line-clamp-3">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                  activeCat === c
                    ? 'bg-primary text-primary-foreground border-primary font-semibold'
                    : 'bg-card text-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Пошук статей..."
              className="h-10 w-full pl-9 pr-3 rounded-full border border-input bg-card text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-16">Нічого не знайдено за вашим запитом.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
              >
                <PostMedia post={post} className="h-48" badge={!!post.video} />
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
        )}
      </main>

      <Footer />
    </div>
  );
}