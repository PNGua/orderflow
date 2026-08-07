import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Minus, Plus, FileImage, ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SAMPLE_ITEMS = [
  {
    id: 'dtf-prem',
    name: 'ДТФ плівка преміум',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=160&q=80',
    price: 980,
    qty: 1,
    maket_url: 'https://example.com/layout.pdf',
    attrs: {
      'Тип матеріалу': 'Плівка на гарячу',
      'Розмір': '580 × 2000 мм',
    },
  },
];

export default function Cart() {
  const [items, setItems] = useState(SAMPLE_ITEMS);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(0, it.qty + delta) } : it))
        .filter((it) => it.qty > 0)
    );
  };

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const isEmpty = items.length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-background pb-20">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl pt-6">
          <nav className="flex items-center gap-1 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Кошик</span>
          </nav>
        </div>

        {/* Heading */}
        <section className="pt-4 pb-8 text-center">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="inline-flex items-center gap-2.5 justify-center">
              <ShoppingBag className="w-6 h-6 text-primary" />
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Кошик</h1>
            </div>
            {!isEmpty && (
              <p className="text-sm text-muted-foreground mt-2">
                {items.length} {items.length === 1 ? 'товар' : 'товарів'} у вашому замовленні
              </p>
            )}
          </div>
        </section>

        <section className="pb-12">
          <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
            {isEmpty ? (
              /* Empty state */
              <div className="bg-card border rounded-2xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-5 flex items-center justify-center">
                  <ShoppingBag className="w-7 h-7 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-2">Кошик порожній</h2>
                <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
                  Поки що тут нічого немає. Перейдіть до каталогу, щоб обрати продукцію для друку.
                </p>
                <Link to="/catalog">
                  <Button className="bg-primary hover:bg-primary/90 font-semibold px-7">
                    Перейти до каталогу <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Items list */}
                <div className="lg:col-span-2 space-y-4">
                  {items.map((it) => (
                    <article
                      key={it.id}
                      className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
                    >
                      {/* Main row */}
                      <div className="p-4 sm:p-5 flex items-center gap-4">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-muted ring-1 ring-border">
                          <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-bold text-foreground leading-tight group-hover:text-primary transition-colors">{it.name}</h3>
                            <button
                              onClick={() => removeItem(it.id)}
                              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                              aria-label="Видалити"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Attribute chips */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {Object.entries(it.attrs).map(([k, v]) => (
                              <span key={k} className="inline-flex items-center text-[11px] bg-muted text-foreground/80 rounded-md px-2 py-0.5">
                                <span className="text-muted-foreground mr-1">{k}:</span>
                                <span className="font-medium">{v}</span>
                              </span>
                            ))}
                          </div>

                          {/* Quick actions */}
                          <a
                            href={it.maket_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline mt-3"
                          >
                            <FileImage className="w-3.5 h-3.5 shrink-0" />
                            <span>Переглянути макет</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>
                      </div>

                      {/* Bottom row: stepper + price */}
                      <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-border bg-muted/30">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground hidden sm:inline">Кількість</span>
                          <div className="flex items-center border rounded-full bg-card">
                            <button
                              onClick={() => updateQty(it.id, -1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                              aria-label="Зменшити"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-foreground">{it.qty}</span>
                            <button
                              onClick={() => updateQty(it.id, 1)}
                              className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                              aria-label="Збільшьити"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[11px] text-muted-foreground block leading-none">Сума</span>
                          <span className="font-bold text-lg text-foreground whitespace-nowrap leading-tight">
                            {it.price * it.qty} грн
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}

                  <Link to="/catalog" className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                    <ChevronRight className="w-4 h-4 rotate-180" />
                    Продовжити покупки
                  </Link>
                </div>

                {/* Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-card border border-border rounded-2xl shadow-sm sticky top-6 overflow-hidden">
                    <div className="p-6">
                      <h2 className="font-bold text-foreground mb-5 text-lg flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-primary" />
                        Підсумок замовлення
                      </h2>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Товарів</span>
                          <span className="font-medium text-foreground">{items.length}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Сума позицій</span>
                          <span className="font-medium text-foreground">{total} грн</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Доставка</span>
                          <span className="font-medium text-muted-foreground">розраховується</span>
                        </div>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="bg-primary/5 border-t border-border p-6 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground leading-none">До сплати</p>
                        <p className="text-2xl font-bold text-primary leading-tight mt-1">{total} грн</p>
                      </div>
                      <ShoppingBag className="w-8 h-8 text-primary/40" />
                    </div>

                    {/* CTA */}
                    <div className="p-4">
                      <Link to="/checkout">
                        <Button className="w-full bg-primary hover:bg-primary/90 font-bold h-12 text-base gap-2 shadow-sm">
                          Оформити замовлення <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                      <p className="text-[11px] text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
                        Знижки та доставку розрахує менеджер
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Floating contact button */}
      <Link
        to="/contacts"
        className="fixed bottom-5 left-5 z-40 w-14 h-14 rounded-full bg-violet-600 text-white shadow-lg hover:bg-violet-700 flex items-center justify-center text-center text-[9px] font-bold leading-tight"
        title="Кнопка зв'язку"
      >
        <span className="px-1 text-center">КНОПКА<br />ЗВ'ЯЗКУ</span>
      </Link>

      <Footer />
    </div>
  );
}