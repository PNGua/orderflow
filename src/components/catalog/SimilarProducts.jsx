import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/components/catalog/products';

const TONE_STYLES = {
  cyan: 'from-cyan-400/15 to-cyan-500/5 border-cyan-300/30',
  gold: 'from-amber-300/20 to-yellow-500/5 border-amber-300/40',
  silver: 'from-slate-300/20 to-slate-400/5 border-slate-300/40',
  purple: 'from-purple-400/15 to-fuchsia-500/5 border-purple-300/30',
  lime: 'from-lime-400/15 to-green-500/5 border-lime-300/30',
  slate: 'from-slate-400/15 to-slate-600/5 border-slate-400/30',
};

function Card({ product }) {
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
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-foreground text-sm mb-1.5 group-hover:text-primary transition-colors leading-snug">
          {product.title}
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/60">
          {product.price > 0 ? (
            <p className="text-base font-bold text-foreground">
              <span className="text-[11px] font-normal text-muted-foreground mr-1">від</span>
              {product.price} <span className="text-xs font-medium text-muted-foreground">грн/м²</span>
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

export default function SimilarProducts({ product, count = 4 }) {
  const similar = PRODUCTS
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, count);

  if (similar.length === 0) return null;

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-xl lg:text-2xl font-bold text-foreground">Схожі товари</h2>
        <Link to={`/catalog?cat=${product.category}`} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
          Усі товари <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {similar.map((p) => <Card key={p.id} product={p} />)}
      </div>
    </section>
  );
}