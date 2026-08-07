import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ArrowRight, Phone, Mail, MapPin } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const PAYMENT_DETAILS = {
  name: 'ФОП Демко Галина Іванівна',
  ipn: 'ІПН 3407309580, ЄДРПОУ 3407309580',
  iban: 'IBAN UA423220010000026005340038680',
};

export default function OrderSuccess() {
  const location = useLocation();
  const [order, setOrder] = useState(location.state?.order || null);
  const [loading, setLoading] = useState(!location.state?.order);
  const orderNumber = new URLSearchParams(window.location.search).get('order');

  useEffect(() => {
    if (order) return;
    if (!orderNumber) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const list = await base44.entities.Order.filter({ order_number: orderNumber });
        setOrder(list?.[0] || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [order, orderNumber]);

  const fmt = (n) => (Number(n || 0)).toFixed(2);
  const itemsTotal = (order?.items || []).reduce((s, it) => s + (it.price || 0) * (it.quantity || 1), 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Success block */}
          <div className="text-center mb-10">
            <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center shadow-lg">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Дякуємо за замовлення!
            </h1>
            <p className="text-sm text-muted-foreground">
              Ми зв'яжемося з вами в найближчий час
            </p>
            {orderNumber && (
              <p className="text-xs text-muted-foreground mt-1">Номер замовлення: <span className="font-semibold text-foreground">{orderNumber}</span></p>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
          ) : !order ? (
            <div className="text-center text-sm text-muted-foreground py-8">
              Замовлення не знайдено. <Link to="/" className="text-primary hover:underline">На головну</Link>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Payment details */}
              <section className="border border-border rounded-xl p-5 bg-card">
                <h2 className="font-bold text-foreground mb-3">Деталі оплати</h2>
                <div className="space-y-1.5 text-sm text-foreground/90">
                  <p>{PAYMENT_DETAILS.name}</p>
                  <p className="text-muted-foreground">{PAYMENT_DETAILS.ipn}</p>
                  <p className="text-muted-foreground">{PAYMENT_DETAILS.iban}</p>
                </div>
              </section>

              {/* Order details */}
              <section className="border border-border rounded-xl bg-card overflow-hidden">
                <div className="p-5 pb-2">
                  <h2 className="font-bold text-foreground mb-3">Подробиці замовлення</h2>
                </div>
                <div className="px-5">
                  <div className="grid grid-cols-[1fr_auto] text-xs font-semibold text-muted-foreground pb-2 border-b border-border">
                    <span>Товар</span>
                    <span>Загалом</span>
                  </div>
                  {(order.items || []).map((it, i) => (
                    <div key={i} className="py-3 border-b border-border last:border-0">
                      <div className="flex justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-foreground">
                            {it.product_name} <span className="text-muted-foreground">× {it.quantity || 1}</span>
                          </p>
                          {it.product_url && (
                            <a href={it.product_url} target="_blank" rel="noreferrer" className="text-[11px] text-violet-600 hover:underline break-all">
                              {it.product_url}
                            </a>
                          )}
                          {it.material_type && (
                            <p className="text-xs text-muted-foreground">Тип матеріалу: {it.material_type}</p>
                          )}
                          {it.size && (
                            <p className="text-xs text-muted-foreground">Розмір: {it.size}</p>
                          )}
                          {it.print_quality && (
                            <p className="text-xs text-muted-foreground">Якість друку: {it.print_quality}</p>
                          )}
                        </div>
                        <span className="text-sm font-semibold text-foreground whitespace-nowrap">{fmt(it.price)} грн</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 py-3 space-y-1.5 text-sm">
                  <Row label="Разом:" value={`${fmt(itemsTotal)} грн`} />
                  <Row label="Доставка:" value={order.delivery_type || '—'} />
                  <Row label="Спосіб оплати:" value={order.payment_type || '—'} />
                  <div className="flex justify-between gap-4 pt-2 border-t border-border font-bold">
                    <span>Всього:</span>
                    <span>{fmt(order.total_amount)} грн</span>
                  </div>
                  {order.comment && (
                    <div className="pt-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">Нотатка: </span>
                      {order.comment}
                    </div>
                  )}
                </div>
              </section>

              {/* Billing address */}
              <section className="border border-border rounded-xl p-5 bg-muted/40">
                <h2 className="font-bold text-foreground mb-3">Платіжна адреса</h2>
                <div className="space-y-1.5 text-sm text-foreground/90">
                  <p className="font-medium">{order.recipient_name || order.payer_name}</p>
                  {order.address_branch && <p>{order.address_branch}</p>}
                  <p>{[order.address_city, order.address_area].filter(Boolean).join(', ')}</p>
                  {order.recipient_phone && (
                    <p className="flex items-center gap-1.5 pt-1">
                      <Phone className="w-3.5 h-3.5 text-primary" /> {order.recipient_phone}
                    </p>
                  )}
                  {order.payer_email && (
                    <p className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-primary" /> {order.payer_email}
                    </p>
                  )}
                </div>
              </section>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/cabinet">
                  <Button className="font-bold gap-2"><ArrowRight className="w-4 h-4" /> Перейти до кабінету</Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="font-semibold">На головну</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
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

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground text-right">{value}</span>
    </div>
  );
}