import React, { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileUp, Grid2X2, HelpCircle, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { CATEGORY_LABELS } from '@/components/catalog/products';
import { useCart } from '@/lib/CartContext';
import LayoutUploadModal from '@/components/catalog/LayoutUploadModal';

export default function ProductShowcase({ product }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const fileRef = useRef(null);
  const [width, setWidth] = useState(product.category === 'dtf' ? '0.58' : '');
  const [height, setHeight] = useState('1');
  const [urgent, setUrgent] = useState(false);
  const [layoutUrl, setLayoutUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const total = useMemo(() => {
    if (product.price === 0) return 0;
    const area = Math.max(0, Number(width)) * Math.max(0, Number(height));
    return Math.round(product.price * area * (urgent ? 1.3 : 1));
  }, [product.price, width, height, urgent]);

  const uploadLayout = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    setLayoutUrl(file_url);
    setFileName(file.name);
    setUploading(false);
  };

  const orderPrint = () => {
    addItem({ id: product.id, name: product.title, image: product.image, price: total, qty: 1, maket_url: layoutUrl, attrs: {
      'Ширина': `${width || 0} м`, 'Лист': `${height || 0} м`, 'Терміново': urgent ? 'Так (+30%)' : 'Ні',
    }});
    navigate('/cart');
  };

  const dimensionsValid = product.price === 0 || (Number(width) > 0 && Number(height) > 0);

  return (
    <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[35fr_65fr] items-start gap-5">
      <div className="bg-muted border rounded-xl overflow-hidden min-h-72 lg:min-h-[500px]">
        <img src={product.image} alt={product.title} className="w-full h-full min-h-72 lg:min-h-[500px] object-cover" />
      </div>
      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 lg:p-6">
          <div className="rounded-xl bg-muted px-4 py-3 text-xs leading-relaxed text-foreground/80">
            Перед завантаженням файлів переконайтеся, що макет відповідає <span className="text-primary font-semibold">технічним вимогам</span>. Інструкція з підготовки файлів до друку. Для консультації звертайтеся за номером <a href="tel:+380739338895" className="text-primary font-semibold">+38 073 933 88 95</a> або через месенджер. Наші адреси: м. Львів, вул. Городоцька 242 та м. Київ, вул. Машинобудівна 44.
          </div>

          <p className="mt-5 text-sm font-medium text-foreground">Тариф: {product.price} грн/м² · {CATEGORY_LABELS[product.category]}</p>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border-b-[3px] border-primary pb-5">
              <h2 className="text-xl font-bold text-foreground mb-1">Розмір</h2>
              <p className="text-xs text-muted-foreground leading-snug mb-4">Обов'язково вкажіть актуальну довжину вашого макета</p>
              <div className="grid grid-cols-[1fr_auto_1fr] gap-2.5 items-end">
                <label className="text-xs text-foreground">Ширина (м)<input type="number" min="0" step="0.01" value={width} onChange={(e) => setWidth(e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border-0 bg-muted px-4 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" /></label>
                <span className="pb-3 text-foreground">×</span>
                <label className="text-xs text-foreground">Лист (м)<input type="number" min="0" step="0.01" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1.5 h-11 w-full rounded-xl border-0 bg-muted px-4 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" /></label>
              </div>
            </div>

            <div className="border-b-[3px] border-primary pb-5 flex flex-col">
              <div className="flex items-center gap-1.5 text-xl font-bold text-foreground mb-3">Терміново <span title="Термінове виготовлення додає 30% до вартості"><HelpCircle className="w-4 h-4 text-muted-foreground" /></span></div>
              <label className="inline-flex items-center gap-2.5 text-xs text-foreground cursor-pointer mb-5"><input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="w-5 h-5 accent-primary" />Термінове виготовлення (+30%)</label>
              <input ref={fileRef} type="file" onChange={uploadLayout} className="hidden" />
              <button type="button" onClick={() => setModalOpen(true)} disabled={uploading} className="mt-auto min-h-11 w-full inline-flex items-center justify-center gap-2 border-2 border-primary text-primary rounded-xl px-4 py-2.5 text-sm font-semibold hover:bg-primary/5 disabled:opacity-50">
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-5 h-5" />}{uploading ? 'Завантаження...' : fileName || 'Завантажити макет'}
              </button>
            </div>
          </div>
        </div>

        <LayoutUploadModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          uploading={uploading}
          onUploadClick={() => { setModalOpen(false); fileRef.current?.click(); }}
        />

        <div className="bg-primary px-5 lg:px-6 py-6 text-primary-foreground">
          <div className="flex items-center justify-between gap-4 mb-5"><span className="text-xl font-medium">До сплати:</span><strong className="text-4xl leading-none">{total} грн</strong></div>
          <button onClick={orderPrint} disabled={!dimensionsValid || uploading} className="w-full bg-foreground text-background rounded-xl py-3.5 font-semibold text-base hover:bg-foreground/90 disabled:bg-muted disabled:text-muted-foreground">Замовити друк</button>
          <Link to={`/catalog?cat=${product.category}`} className="mt-4 w-full inline-flex items-center justify-center gap-2 text-primary-foreground hover:opacity-80 text-sm font-semibold"><Grid2X2 className="w-4 h-4" />До каталогу</Link>
        </div>
      </div>
    </section>
  );
}