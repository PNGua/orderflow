import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronRight, ArrowRight, Star, Sparkles, FolderOpen, Layers, Printer } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PRODUCTS } from '@/components/catalog/products';

const CATEGORIES = [
  { id: 'all', label: 'Усі товари', icon: Layers },
  { id: 'dtf', label: 'ДТФ друк', icon: Printer },
  { id: 'uv_dtf', label: 'УФ ДТФ друк', icon: Sparkles },
  { id: 'samples', label: 'Взірці', icon: FolderOpen },
];

const CATEGORY_INFO = {
  all: {
    title: 'Каталог товарів PNG druk',
    text: 'У нашому каталозі зібрані плівки для друку, матеріали для брендування одягу та готові взірці продукції. Ми працюємо з різними технологіями нанесення — від ДТФ та УФ ДТФ до шовкотрафарету, — тож ви зможете обрати рішення під будь-яке завдання. Усі позиції можна замовити онлайн з доставкою по Україні.',
  },
  dtf: {
    title: 'ДТФ плівки для друку',
    text: 'DTF-плівки призначені для повноколірного друку з наступним термотрансфером на бавовну, поліестр та міксовані тканини. Вони забезпечують яскраві кольори, стійкість до прання та зношування. У каталозі представлена як холодна, так і тепла плівка різної ширини — від 0.58 м до 1.6 м. Підійде для серійних тиражів та дропшипінгу.',
  },
  uv_dtf: {
    title: 'УФ ДТФ плівки з об\'ємним ефектом',
    text: 'УФ-ДТФ-плівки створені для нанесення на тверді поверхні: скло, метал, пластик, деревину. Полімеризація УФ-ламами дає глянсову поверхню та рельєфний ефект із підвищеною стійкістю до зношування. Ідеальне рішення для брендування сувенірів, етикеток та рекламної продукції.',
  },
  samples: {
    title: 'Взірці продукції',
    text: 'Безкоштовні взірці плівок та готових нанесень, щоб ви могли оцінити якість, тактильні відчуття та колір до оформлення замовлення. Замовляйте набір, щоб обрати оптимальну технологію та матеріал під ваш проєкт.',
  },
};

const TONE_STYLES = {
  cyan: 'from-cyan-400/15 to-cyan-500/5 border-cyan-300/30',
  gold: 'from-amber-300/20 to-yellow-500/5 border-amber-300/40',
  silver: 'from-slate-300/20 to-slate-400/5 border-slate-300/40',
  purple: 'from-purple-400/15 to-fuchsia-500/5 border-purple-300/30',
  lime: 'from-lime-400/15 to-green-500/5 border-lime-300/30',
  slate: 'from-slate-400/15 to-slate-600/5 border-slate-400/30',
};

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className={`relative overflow-hidden bg-gradient-to-br ${TONE_STYLES[product.tone]} aspect-[4/3]`}>
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover mix-blend-overlay opacity-90 group-hover:scale-110 transition-transform duration-500"
        />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {product.tag}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground text-sm mb-1.5 group-hover:text-primary transition-colors leading-snug">
          {product.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/60">
          {product.price > 0 ? (
            <p className="text-base font-bold text-foreground">
              <span className="text-[11px] font-normal text-muted-foreground mr-1">від</span>
              {product.price} <span className="text-xs font-medium text-muted-foreground">грн</span>
            </p>
          ) : (
            <p className="text-sm font-semibold text-primary">Безкоштовно</p>
          )}
          <span className="text-primary text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 translate-x-[-4px] group-hover:translate-x-0 transition-all">
            Детальніше <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function Catalog() {
  const location = useLocation();
  const validCats = CATEGORIES.map((c) => c.id);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const cat = urlParams.get('cat');
    const q = urlParams.get('q') || '';
    setActiveCategory(cat && validCats.includes(cat) ? cat : 'all');
    setSearch(q);
  }, [location.search]);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 lg:px-8 py-6 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-5">
          <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">Каталог товарів</span>
        </nav>

        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Каталог товарів</h1>
          <p className="text-sm text-muted-foreground">Преміальні плівки для друку, технології та взірці продукції</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - categories */}
          <aside className="lg:w-60 shrink-0">
            <div className="lg:sticky lg:top-4 space-y-4">
              <div className="bg-card border rounded-2xl p-3 shadow-sm">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 mb-2">Категорії</h2>
                <div className="flex flex-wrap lg:flex-col gap-1.5">
                  {CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all w-full text-left ${
                          isActive
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        {cat.label}
                        <span className={`ml-auto text-[11px] px-1.5 py-0.5 rounded-full ${
                          isActive ? 'bg-white/20' : 'bg-muted text-muted-foreground'
                        }`}>
                          {cat.id === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat.id).length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Пошук товару..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 h-10 text-sm"
                />
              </div>

              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-4 text-primary-foreground shadow-sm">
                <Star className="w-5 h-5 mb-2" />
                <p className="text-sm font-semibold leading-snug">Потрібна консультація?</p>
                <p className="text-xs text-primary-foreground/80 mt-1 mb-3">Менеджер допоможе обрати матеріал</p>
                <Link to="/contacts" className="inline-flex items-center gap-1 text-xs font-bold bg-white/15 hover:bg-white/25 px-3 py-1.5 rounded-full transition-colors">
                  Зв'язатись <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-4">
              Знайдено: <strong className="text-foreground">{filtered.length}</strong> товарів
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground text-sm border border-dashed rounded-2xl">
                Нічого не знайдено. Спробуйте інший запит або категорію.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* SEO / info text block */}
        <section className="mt-12 lg:mt-16 border-t border-border pt-8">
          <div className="max-w-3xl">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
              {CATEGORY_INFO[activeCategory].title}
            </h2>
            <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">
              {CATEGORY_INFO[activeCategory].text}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}