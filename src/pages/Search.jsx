import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search as SearchIcon, ChevronRight, ArrowRight, X, SlidersHorizontal } from 'lucide-react';
import { Input } from "@/components/ui/input";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PRODUCTS, CATEGORY_LABELS } from '@/components/catalog/products';

const TONE_STYLES = {
  cyan: 'from-cyan-400/15 to-cyan-500/5 border-cyan-300/30',
  gold: 'from-amber-300/20 to-yellow-500/5 border-amber-300/40',
  silver: 'from-slate-300/20 to-slate-400/5 border-slate-300/40',
  purple: 'from-purple-400/15 to-fuchsia-500/5 border-purple-300/30',
  lime: 'from-lime-400/15 to-green-500/5 border-lime-300/30',
  slate: 'from-slate-400/15 to-slate-600/5 border-slate-400/30',
};

function ResultCard({ product }) {
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

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setQuery(urlParams.get('q') || '');
  }, [location.search]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (CATEGORY_LABELS[p.category] || '').toLowerCase().includes(q)
    );
  }, [query]);

  const submit = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 lg:px-8 py-6 max-w-6xl">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-5">
          <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">Пошук товарів</span>
        </nav>

        {/* Search hero */}
        <div className="mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1 flex items-center gap-2">
            <SearchIcon className="w-7 h-7 text-primary" />
            Пошук товарів
          </h1>
          <p className="text-sm text-muted-foreground">Шукайте плівки, матеріали та взірці по назві чи категорії</p>

          <form onSubmit={submit} className="relative mt-4 max-w-2xl">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              autoFocus
              placeholder="Введіть назву товару..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-14 pl-12 pr-12 text-base rounded-2xl border-2 border-input focus-visible:ring-primary/30"
            />
            {query && (
              <button
                type="button"
                onClick={() => { setQuery(''); navigate('/search'); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Очистити"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>

        {/* Results */}
        {query.trim() === '' ? (
          <div className="text-center py-20 text-muted-foreground">
            <SlidersHorizontal className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-sm">Почніть вводити запит, щоб знайти товари</p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground border border-dashed rounded-2xl">
            <p className="text-sm mb-1">За запитом <strong className="text-foreground">«{query.trim()}»</strong> нічого не знайдено</p>
            <p className="text-xs">Спробуйте змінити запит або переглянути <Link to="/catalog" className="text-primary font-semibold hover:underline">каталог</Link></p>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-4">
              Знайдено: <strong className="text-foreground">{results.length}</strong> товарів за запитом <strong className="text-foreground">«{query.trim()}»</strong>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((product) => (
                <ResultCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}