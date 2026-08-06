import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Package } from 'lucide-react';

const PRODUCTS = [
  {
    title: 'ДТФ плівка золота фольга',
    description: 'Ефектна золота фольга для преміум-принтів на одязі',
    price: 'від 240 грн',
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    link: '/dtf-print',
    tag: 'Новинка',
  },
  {
    title: 'УФ ДТФ плівка срібна',
    description: 'Срібна металік-плівка зі стійкістю до зношування',
    price: 'від 260 грн',
    image: 'https://images.unsplash.com/photo-1567789884554-0bcbca3b83cb?w=600&q=80',
    link: '/dtf-print',
    tag: null,
  },
  {
    title: 'ДТФ плівка хамелеон',
    description: 'Переливчаста голограмна плівка для яскравих принтів',
    price: 'від 290 грн',
    image: 'https://images.unsplash.com/photo-1621240219314-543e0c24f931?w=600&q=80',
    link: '/dtf-print',
    tag: 'Хіт',
  },
  {
    title: 'Папка з взірцями DTF',
    description: 'Візуальний набір взірців друку для оцінки якості',
    price: '350 грн',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80',
    link: '/catalog',
    tag: 'Вигідно',
  },
];

export default function ProductsSection() {
  return (
    <section className="py-14 bg-muted/30 border-y border-border/60">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#037291]/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-[#037291]" />
            </div>
            <div>
              <p className="text-xs text-[#037291] font-semibold uppercase tracking-widest mb-1">Готова продукція</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Товари</h2>
            </div>
          </div>
          <Link to="/catalog" className="text-sm text-[#037291] font-medium hover:underline flex items-center gap-1">
            Усі товари <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRODUCTS.map((p) => (
            <Link
              key={p.title}
              to={p.link}
              className="group relative flex bg-card border-2 border-transparent hover:border-[#037291]/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200"
            >
              <div className="relative w-32 sm:w-40 shrink-0 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {p.tag && (
                  <span className="absolute top-2 left-2 bg-[#037291] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center p-4 flex-1 min-w-0">
                <h3 className="font-bold text-foreground mb-1 group-hover:text-[#037291] transition-colors truncate">
                  {p.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">
                  {p.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-base font-extrabold text-[#037291]">{p.price}</span>
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#037291]/10 text-[#037291] group-hover:bg-[#037291] group-hover:text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}