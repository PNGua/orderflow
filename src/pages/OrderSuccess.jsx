import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Phone, Mail, MapPin, CreditCard, Building2, Receipt } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const PAYMENT_DETAILS = {
  name: 'ФОП Демко Галина Іванівна',
  bank: 'АТ "УНІВЕРСАЛ БАНК"',
  sort: '3407309580',
  iban: 'UA423220010000026005340038680',
};

const DEMO_ORDER = {
  order_number: '27290',
  order_date: '2026-08-28T00:00:00.000Z',
  status: 'Нове',
  total_amount: 700,
  payment_type: 'Рахунок-фактура',
  delivery_type: 'Доставка службою Нова пошта',
  payer_name: 'ТЕСТ ФОП Мар\'ян',
  payer_email: 'andreyusik1@gmail.com',
  recipient_name: 'Усік Андрій',
  recipient_phone: '+38 (063) 015-24-37',
  address_branch: 'Відділення №10 (до 10 кг): вул. Левицького, 7',
  address_city: 'Львів',
  address_area: 'Львівська',
  comment: 'Рахунок виставлено на:\nПлатник: ТЕСТ ФОП Мар\'ян\nЄДРПОУ: 111111',
  items: [
    {
      product_name: 'Розробка дизайну',
      quantity: 1,
      price: 0,
      'order-size-product': '600 * 100 мм',
      'order-size-product-width': 600,
      'order-size-product-height': 100,
      isdesign_ordering: true,
      links: 'https://pngdruk.com.ua/product/wideformat/vzirci-uk-uk-uk-uk/papka-vzirciiv-dtf-ta-uf-dt/',
    },
    {
      product_name: 'ДТФ плівка преміум',
      quantity: 1,
      price: 700,
      'order-size-product': '600 * 2000 мм',
      'order-size-product-width': 600,
      'order-size-product-height': 2000,
    },
  ],
};

const fmt = (n) => `${(Number(n || 0)).toFixed(2)} ₴`;

const fmtDate = (d) => {
  if (!d) return '—';
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return String(d);
  return dt.toLocaleDateString('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export default function OrderSuccess() {
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);
  const orderNumberParam = new URLSearchParams(window.location.search).get('order');

  useEffect(() => {
    if (order) return;
    if (!orderNumberParam) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const list = await base44.entities.Order.filter({ order_number: orderNumberParam });
        setOrder(list?.[0] || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [order, orderNumberParam]);

  // Demo data fills the page when no real order is loaded (preview without ?order=)
  const displayOrder = order || (!orderNumberParam ? DEMO_ORDER : null);
  const items = displayOrder?.items || [];
  const itemsTotal = items.reduce((s, it) =>
    s + Number(it.price ?? it.ywcnp_amount ?? it.amount ?? 0) * (it.quantity || 1), 0);
  const orderNo = displayOrder?.order_number || orderNumberParam || '—';

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6f7]">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

          {/* Success hero */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-9 h-9 text-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-1.5">
              Оформлення замовлення
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Дякуємо. Ваше замовлення було отримано.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : !displayOrder ? (
            <div className="text-center text-sm text-muted-foreground py-12">
              Замовлення не знайдено. <Link to="/" className="text-primary hover:underline">На головну</Link>
            </div>
          ) : (
            <div className="space-y-5">
              {!order && (
                <div className="text-center text-xs text-muted-foreground bg-primary/5 border border-primary/20 rounded-lg px-4 py-2">
                  Демо-дані замовлення для попереднього перегляду
                </div>
              )}

              {/* Order summary header */}
              <section className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="px-5 sm:px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-foreground">Деталі замовлення</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3 px-5 sm:px-6 py-5 text-sm">
                  <Detail label="Номер замовлення" value={`№ ${orderNo}`} strong />
                  <Detail label="Дата" value={fmtDate(displayOrder.order_date)} />
                  <Detail label="E-mail" value={displayOrder.payer_email || '—'} />
                  <Detail label="Всього" value={fmt(displayOrder.total_amount)} strong />
                  <Detail label="Спосіб оплати" value={displayOrder.payment_type || '—'} />
                </div>
              </section>

              {/* Bank details */}
              <section className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="px-5 sm:px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  <h2 className="font-semibold text-foreground">Деталі нашого банку</h2>
                </div>
                <div className="px-5 sm:px-6 py-4 space-y-1.5 text-sm">
                  <p className="font-medium text-foreground">{PAYMENT_DETAILS.name}</p>
                  <RowKV label="Банк" value={PAYMENT_DETAILS.bank} />
                  <RowKV label="Sort код" value={PAYMENT_DETAILS.sort} mono />
                  <RowKV label="IBAN" value={PAYMENT_DETAILS.iban} mono />
                </div>
              </section>

              {/* Order items table */}
              <section className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                <div className="px-5 sm:px-6 py-4 border-b border-border bg-muted/30">
                  <h2 className="font-semibold text-foreground">Товари у замовленні</h2>
                </div>
                <div className="px-5 sm:px-6">
                  <div className="grid grid-cols-[1fr_auto] text-xs font-semibold text-muted-foreground uppercase tracking-wide py-3 border-b border-border">
                    <span>Товар</span>
                    <span>Загалом</span>
                  </div>
                  {items.map((it, i) => {
                    const name = it.product_name || it.name || it.title || 'Товар';
                    const qty = it.quantity || 1;
                    const unitPrice = Number(it.price ?? it.ywcnp_amount ?? it.amount ?? 0);
                    const size = it.size || it['order-size-product'] ||
                      (it['order-size-product-width'] && it['order-size-product-height']
                        ? `${it['order-size-product-width']} × ${it['order-size-product-height']} мм`
                        : '');
                    const link = it.product_url || it.links;
                    const isDesign = it.isdesign_ordering === true || it.isdesign_ordering === 'true';
                    return (
                      <div key={i} className="py-4 border-b border-border last:border-0">
                        <div className="flex justify-between gap-4">
                          <div className="min-w-0 space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-medium text-foreground">
                                {name}{' '}
                                <span className="text-muted-foreground font-normal">× {qty}</span>
                              </p>
                              {isDesign && (
                                <span className="text-[10px] font-semibold uppercase tracking-wide bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                  Розробка дизайну
                                </span>
                              )}
                            </div>
                            {(size || it.material_type || it.print_quality) && (
                              <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                                {size && <span>Розмір: {size}</span>}
                                {it.material_type && <span>Матеріал: {it.material_type}</span>}
                                {it.print_quality && <span>Друк: {it.print_quality}</span>}
                              </div>
                            )}
                            {link && (
                              <a href={link} target="_blank" rel="noreferrer" className="inline-block text-[11px] text-primary hover:underline break-all">
                                Переглянути товар
                              </a>
                            )}
                          </div>
                          <span className="text-sm font-semibold text-foreground whitespace-nowrap self-start">
                            {fmt(unitPrice * qty)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Totals */}
                <div className="px-5 sm:px-6 py-4 bg-muted/20 space-y-2 text-sm">
                  <TotRow label="Разом" value={fmt(itemsTotal)} />
                  <TotRow label="Доставка" value={displayOrder.delivery_type || '—'} />
                  <TotRow label="Спосіб оплати" value={displayOrder.payment_type || '—'} />
                  <div className="flex justify-between gap-4 pt-2 border-t border-border text-base font-bold">
                    <span className="text-foreground">Всього</span>
                    <span className="text-primary">{fmt(displayOrder.total_amount)}</span>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Payer note */}
                {displayOrder.comment && (
                  <section className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                    <div className="px-5 sm:px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-primary" />
                      <h2 className="font-semibold text-foreground">Нотатка</h2>
                    </div>
                    <div className="px-5 sm:px-6 py-4 text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                      {displayOrder.comment}
                    </div>
                  </section>
                )}

                {/* Billing / shipping address */}
                <section className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                  <div className="px-5 sm:px-6 py-4 border-b border-border bg-muted/30 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <h2 className="font-semibold text-foreground">Платіжна адреса</h2>
                  </div>
                  <div className="px-5 sm:px-6 py-4 space-y-1.5 text-sm text-foreground/90">
                    <p className="font-medium text-foreground">{displayOrder.recipient_name || displayOrder.payer_name || '—'}</p>
                    {displayOrder.address_branch && <p>{displayOrder.address_branch}</p>}
                    <p>{[displayOrder.address_city, displayOrder.address_area].filter(Boolean).join(', ') || ''}</p>
                    {displayOrder.recipient_phone && (
                      <p className="flex items-center gap-1.5 pt-1.5">
                        <Phone className="w-3.5 h-3.5 text-primary" /> {displayOrder.recipient_phone}
                      </p>
                    )}
                    {displayOrder.payer_email && (
                      <p className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-primary" /> {displayOrder.payer_email}
                      </p>
                    )}
                  </div>
                </section>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Link to="/cabinet">
                  <Button className="font-semibold gap-2">
                    <ArrowRight className="w-4 h-4" /> Перейти до кабінету
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="font-semibold">На головну</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Detail({ label, value, strong }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
      <p className={`${strong ? 'font-semibold text-foreground' : 'text-foreground/90'} break-words`}>{value}</p>
    </div>
  );
}

function RowKV({ label, value, mono }) {
  return (
    <div className="flex justify-between gap-4 items-center">
      <span className="text-muted-foreground">{label}</span>
      <span className={`text-foreground text-right ${mono ? 'font-mono text-xs sm:text-sm' : ''}`}>{value}</span>
    </div>
  );
}

function TotRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground text-right">{value}</span>
    </div>
  );
}