import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUp, HelpCircle, CheckCircle2 } from 'lucide-react';
import { CATEGORY_LABELS } from '@/components/catalog/products';
import { useCart } from '@/lib/CartContext';
import LayoutUploadModal from '@/components/catalog/LayoutUploadModal';

export default function ProductShowcase({ product }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [width, setWidth] = useState(product.category === 'dtf' ? '0.58' : '');
  const [height, setHeight] = useState('1');
  const [urgent, setUrgent] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [attachedUrl, setAttachedUrl] = useState('');
  const [attachedPhone, setAttachedPhone] = useState('');

  const total = useMemo(() => {
    if (product.price === 0) return 0;
    const area = Math.max(0, Number(width)) * Math.max(0, Number(height));
    return Math.round(product.price * area * (urgent ? 1.3 : 1));
  }, [product.price, width, height, urgent]);

  const retailTotal = Math.round(total * 1.2);

  const addToCart = (layoutUrl = '', phone = '') => {
    addItem({ id: product.id, name: product.title, image: product.image, price: total, qty: 1, maket_url: layoutUrl, attrs: {
      'Ширина': `${width || 0} м`, 'Лист': `${height || 0} м`, 'Терміново': urgent ? 'Так (+30%)' : 'Ні',
      ...(phone ? { 'Телефон': phone } : {}),
    }});
  };

  const handleModalSubmit = ({ layoutUrl, phone }) => {
    setAttachedUrl(layoutUrl);
    setAttachedPhone(phone);
    setModalOpen(false);
  };

  const orderPrint = () => {
    addToCart(attachedUrl, attachedPhone);
    setAttachedUrl('');
    setAttachedPhone('');
    navigate('/cart');
  };

  const dimensionsValid = product.price === 0 || (Number(width) > 0 && Number(height) > 0);

  return (
    <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[35fr_65fr] items-stretch gap-5">
      <div className="bg-muted border rounded-2xl overflow-hidden min-h-72 lg:min-h-[420px]">
        <img src={product.image} alt={product.title} className="w-full h-full min-h-72 lg:min-h-[420px] object-cover" />
      </div>
      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-5 lg:p-6 flex-1 flex flex-col gap-4">
          {/* Condensed info strip */}
          <div className="rounded-lg bg-muted px-3.5 py-2.5 text-[11px] leading-relaxed text-foreground/70">
            Перед завантаженням файлів переконайтеся, що макет відповідає <span className="text-primary font-semibold">технічним вимогам</span>. Для консультації: <a href="tel:+380739338895" className="text-primary font-semibold">+38 073 933 88 95</a>.
          </div>

          {/* Tariff line */}
          <div className="flex items-baseline gap-2 pb-3 border-b border-border/70">
            <span className="text-lg font-bold text-foreground">{product.price} грн/м²</span>
            <span className="text-sm font-medium text-muted-foreground">· {CATEGORY_LABELS[product.category]}</span>
          </div>

          {/* Sizes — one row */}
          <div>
            <h2 className="text-base font-bold text-foreground mb-0.5">Розмір</h2>
            <p className="text-[11px] text-muted-foreground mb-3 leading-snug">Обов'язково вкажіть актуальну довжину вашого макета</p>
            <div className="grid grid-cols-2 gap-2.5">
              <label className="text-xs text-foreground">Ширина (м)
                <input type="number" min="0" step="0.01" value={width} onChange={(e) => setWidth(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-input bg-muted/50 px-3.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </label>
              <label className="text-xs text-foreground">Лист (м)
                <input type="number" min="0" step="0.01" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 h-11 w-full rounded-xl border border-input bg-muted/50 px-3.5 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </label>
            </div>
          </div>

          {/* Urgent + upload — one row */}
          <div>
            <div className="flex items-center gap-1.5 text-base font-bold text-foreground mb-2">Терміново
              <span title="Термінове виготовлення додає 30% до вартості"><HelpCircle className="w-3.5 h-3.5 text-muted-foreground" /></span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label className="inline-flex items-center gap-2 text-xs text-foreground cursor-pointer">
                <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="w-5 h-5 accent-primary" />
                Термінове виготовлення (+30%)
              </label>
              <button type="button" onClick={() => setModalOpen(true)} className="sm:ml-auto inline-flex items-center justify-center gap-2 border-2 border-primary text-primary rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-primary/5">
                {attachedUrl ? <CheckCircle2 className="w-5 h-5" /> : <FileUp className="w-5 h-5" />}
                {attachedUrl ? 'Макет додано' : 'Завантажити макет'}
              </button>
            </div>
            {attachedUrl && (
              <p className="mt-2 text-[11px] text-primary font-medium truncate" title={attachedUrl}>
                Долучено: {attachedUrl}
              </p>
            )}
          </div>
        </div>

        {/* Price + CTA — single strip, no divider */}
        <div className="flex items-center gap-4 px-5 lg:px-6 pb-5 lg:pb-6">
          <div className="flex items-baseline gap-2 shrink-0">
            <span className="text-sm font-medium text-muted-foreground">До сплати:</span>
            {total > 0 && <span className="text-sm text-muted-foreground line-through">{retailTotal} грн</span>}
            <strong className="text-2xl leading-none text-primary">{total} грн</strong>
          </div>
          <button onClick={orderPrint} disabled={!dimensionsValid} className="ml-auto sm:flex-1 max-sm:w-full bg-primary text-primary-foreground rounded-xl py-3.5 px-5 font-semibold text-sm hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground whitespace-nowrap">
            {attachedUrl ? 'Перейти до оформлення' : 'Додати в кошик'}
          </button>
        </div>

        <LayoutUploadModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          product={product}
          total={total}
          qty={1}
          onSubmit={handleModalSubmit}
        />
      </div>
    </section>
  );
}