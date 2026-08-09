import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductShowcase from '@/components/catalog/ProductShowcase';
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
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6 flex-wrap">
          <Link to="/" className="hover:text-primary">Головна</Link><ChevronRight className="w-3 h-3" />
          <Link to={`/catalog?cat=${product.category}`} className="hover:text-primary">{CATEGORY_LABELS[product.category]}</Link><ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">{product.title}</span>
        </nav>
        <h1 className="text-2xl lg:text-3xl font-bold text-center text-foreground mb-6">{product.title}</h1>
        <ProductShowcase product={product} />
      </main>
      <Footer />
    </div>
  );
}