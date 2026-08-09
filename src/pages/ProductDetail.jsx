import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CATEGORY_LABELS, PRODUCTS } from '@/components/catalog/products';

export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((item) => String(item.id) === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background"><Header /><main className="flex-1 container mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold mb-3">Товар не знайдено</h1><Link to="/catalog" className="text-primary font-semibold hover:underline">Повернутися до каталогу</Link></main><Footer /></div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-6 max-w-6xl">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-7 flex-wrap">
          <Link to="/" className="hover:text-primary">Головна</Link><ChevronRight className="w-3 h-3" />
          <Link to={`/catalog?cat=${product.category}`} className="hover:text-primary">{CATEGORY_LABELS[product.category]}</Link><ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="bg-card border rounded-3xl overflow-hidden shadow-sm">
            <img src={product.image} alt={product.title} className="w-full aspect-[4/3] object-cover" />
          </div>
          <div className="lg:py-4">
            {product.tag && <span className="inline-flex bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-4">{product.tag}</span>}
            <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{CATEGORY_LABELS[product.category]}</p>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-4">{product.title}</h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">{product.description}</p>
            <div className="border-y py-5 mb-6">
              {product.price > 0 ? <p className="text-3xl font-bold"><span className="text-sm font-normal text-muted-foreground mr-2">від</span>{product.price} <span className="text-base font-medium text-muted-foreground">грн</span></p> : <p className="text-2xl font-bold text-primary">Безкоштовно</p>}
            </div>
            <ul className="space-y-3 mb-7">
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" />Професійна консультація щодо матеріалу</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" />Перевірка макета перед виробництвом</li>
              <li className="flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-primary" />Доставка по Україні</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Link to="/contacts" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90">Уточнити замовлення <ArrowRight className="w-4 h-4" /></Link>
              <Link to={`/catalog?cat=${product.category}`} className="inline-flex items-center gap-2 border font-semibold text-sm px-5 py-3 rounded-xl hover:bg-muted"><ArrowLeft className="w-4 h-4" />До каталогу</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}