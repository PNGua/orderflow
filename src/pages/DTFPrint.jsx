import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, HelpCircle } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PRICE_PER_SQM = 520;

export default function DTFPrint() {
  const [width, setWidth] = useState(0.58);
  const [height, setHeight] = useState(0);
  const [urgent, setUrgent] = useState(false);

  const area = parseFloat(width || 0) * parseFloat(height || 0);
  const basePrice = area * PRICE_PER_SQM;
  const total = urgent ? basePrice * 1.3 : basePrice;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 lg:px-8 py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/dtf-print" className="hover:text-primary transition-colors">ДТФ друк в рулонах</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/dtf-print" className="hover:text-primary transition-colors">ДТФ друк в рулонах</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground font-medium">ДТФ плівка преміум</span>
        </nav>

        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-foreground mb-8">ДТФ плівка преміум</h1>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Product Image */}
          <div className="rounded-xl overflow-hidden border bg-card shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="ДТФ плівка преміум"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Order Panel */}
          <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
            {/* Info block */}
            <div className="text-sm text-muted-foreground leading-relaxed">
              <p>
                Перед завантаженням файлів переконайтесь, що макет відповідає{' '}
                <a href="#" className="text-primary hover:underline">технічним вимогам</a>.
              </p>
              <p className="mt-2">
                <a href="#" className="text-primary hover:underline">Інструкція з підготовки файлів</a> до друку. Тип відрізу – на{' '}
                <a href="#" className="text-primary hover:underline">гарячу</a>.
              </p>
              <p className="mt-2">
                Для консультації звертайтесь за номером телефону:{' '}
                <a href="tel:+380739338895" className="text-primary hover:underline">+38 073 933 88 95</a>{' '}
                або на телеграм нашого менеджера. Наші адреси офісів у{' '}
                <strong>м. Львів</strong>, вул. Городоцька 242 та у <strong>м. Київ</strong>, вул. Машинобудівна 44.
              </p>
            </div>

            <hr className="border-border" />

            {/* Size */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold text-foreground">Розмір</h2>
              <p className="text-xs text-muted-foreground">* Обов'язково вкажіть актуальну довжину Вашого макету</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 space-y-1">
                  <label className="text-xs text-muted-foreground">Ширина(м)</label>
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    step="0.01"
                    min="0"
                    className="text-center"
                  />
                </div>
                <span className="mt-5 text-muted-foreground font-medium">x</span>
                <div className="flex-1 space-y-1">
                  <label className="text-xs text-muted-foreground">Висота(м)</label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    step="0.01"
                    min="0"
                    className="text-center"
                  />
                </div>
              </div>
            </div>

            {/* Urgent */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-foreground">Терміново</h2>
                <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" title="Термінове виготовлення +30% до ціни" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="urgent"
                  checked={urgent}
                  onCheckedChange={setUrgent}
                />
                <label htmlFor="urgent" className="text-sm text-foreground cursor-pointer">Терміново</label>
              </div>
            </div>

            <hr className="border-border" />

            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">До сплати:</span>
              <span className="text-2xl font-bold text-foreground">
                {total > 0 ? `${Math.round(total)} грн` : '175 грн'}
              </span>
            </div>

            {/* Submit */}
            <Button
              className="w-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors text-base py-5"
            >
              Замовити друк
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}