import React, { useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileUp, HelpCircle, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { CATEGORY_LABELS } from '@/components/catalog/products';
import { useCart } from '@/lib/CartContext';

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
    <section className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] items-start gap-5">
      <div className="bg-muted border rounded-xl overflow-hidden min-h-72 lg:min-h-[500px]">
        <img src={product.image} alt={product.title} className="w-full h-full min-h-72 lg:min-h-[500px] object-cover" />
      </div>
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b space-y-2 text-xs leading-relaxed text-muted-foreground">
          <p>Перед завантаженням файлів переконайтеся, що макет відповідає <span className="text-primary font-semibold">технічним вимогам</span>.</p>
          <p>Інструкція з підготовки файлів до друку. Для консультації звертайтеся за номером <a href="tel:+380739338895" className="text-primary font-semibold">+38 073 933 88 95</a> або через месенджер.</p>
          <p>Наші адреси: м. Львів, вул. Городоцька 242 та м. Київ, вул. Машинобудівна 44.</p>
          <p className="font-semibold text-foreground pt-1">Тариф: {product.price} грн/м² · {CATEGORY_LABELS[product.category]}</p>
        </div>
        <div className="p-5 border-b">
          <h2 className="font-bold text-base mb-1">Розмір</h2>
          <p className="text-[11px] text-muted-foreground mb-4">Обов'язково вкажіть актуальну довжину вашого макета</p>
          <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <label className="text-[10px] text-muted-foreground text-center">Ширина (м)<input type="number" min="0" step="0.01" value={width} onChange={(e) => setWidth(e.target.value)} className="mt-1 h-10 w-full rounded-full border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></label>
            <span className="pb-3 text-muted-foreground">×</span>
            <label className="text-[10px] text-muted-foreground text-center">Лист (м)<input type="number" min="0" step="0.01" value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 h-10 w-full rounded-full border bg-background px-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" /></label>
          </div>
        </div>
        <div className="p-5 border-b space-y-4">
          <div>
            <div className="flex items-center gap-1.5 font-bold text-base mb-2">Терміново <span title="Термінове виготовлення додає 30% до вартості"><HelpCircle className="w-4 h-4" /></span></div>
            <label className="inline-flex items-center gap-2 text-xs text-muted-foreground cursor-pointer"><input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="w-4 h-4 accent-primary" />Термінове виготовлення (+30%)</label>
          </div>
          <div>
            <input ref={fileRef} type="file" onChange={uploadLayout} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading} className="w-full inline-flex items-center justify-center gap-2 border border-primary text-primary rounded-full px-4 py-2.5 text-sm font-semibold hover:bg-primary/5 disabled:opacity-50">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileUp className="w-4 h-4" />}{uploading ? 'Завантаження...' : fileName || 'Завантажити макет'}
            </button>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center justify-between border-b"><span className="text-sm">До сплати:</span><strong className="text-2xl">{total} грн</strong></div>
        <div className="p-4">
          <button onClick={orderPrint} disabled={!dimensionsValid || uploading} className="w-full bg-primary text-primary-foreground rounded-full py-3.5 font-bold text-base hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground">Замовити друк</button>
          <Link to={`/catalog?cat=${product.category}`} className="mt-3 w-full inline-flex items-center justify-center gap-2 text-muted-foreground hover:text-primary text-xs font-semibold"><ArrowLeft className="w-3.5 h-3.5" />До каталогу</Link>
        </div>
      </div>
    </section>
  );
}