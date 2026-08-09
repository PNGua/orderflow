import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CATEGORY_LABELS } from '@/components/catalog/products';

export default function ProductShowcase({ product }) {
  return (
    <section className="max-w-4xl mx-auto bg-card border rounded-2xl overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr]">
      <div className="bg-muted min-h-72 md:min-h-[430px]">
        <img src={product.image} alt={product.title} className="w-full h-full min-h-72 md:min-h-[430px] object-cover" />
      </div>
      <div className="flex flex-col border-t md:border-t-0 md:border-l">
        <div className="p-5 border-b">
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-primary">{CATEGORY_LABELS[product.category]}</p>
            {product.tag && <span className="bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-full">{product.tag}</span>}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
        </div>
        <div className="p-5 border-b">
          <h2 className="font-bold text-sm mb-4">Переваги</h2>
          <ul className="space-y-3">
            <li className="flex gap-2 text-xs"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />Професійна консультація щодо матеріалу</li>
            <li className="flex gap-2 text-xs"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />Перевірка макета перед виробництвом</li>
            <li className="flex gap-2 text-xs"><CheckCircle2 className="w-4 h-4 text-primary shrink-0" />Доставка по Україні</li>
          </ul>
        </div>
        <div className="mt-auto p-5">
          <div className="flex items-end justify-between gap-3 mb-5">
            <span className="text-sm text-muted-foreground">До сплати:</span>
            {product.price > 0 ? <p className="text-2xl font-bold">{product.price} <span className="text-sm font-medium">грн</span></p> : <p className="text-xl font-bold text-primary">Безкоштовно</p>}
          </div>
          <Link to="/contacts" className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-full hover:bg-primary/90">Уточнити замовлення <ArrowRight className="w-4 h-4" /></Link>
          <Link to={`/catalog?cat=${product.category}`} className="mt-3 w-full inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-primary text-xs font-semibold"><ArrowLeft className="w-3.5 h-3.5" />До каталогу</Link>
        </div>
      </div>
    </section>
  );
}