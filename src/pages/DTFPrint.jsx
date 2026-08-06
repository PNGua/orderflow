import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, HelpCircle, Upload, CheckCircle2,
  Zap, Info, Phone, MessageCircle, ZoomIn
} from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PRICE_PER_SQM = 520;
const MIN_WIDTH = 0.58;
const MIN_PRICE = 175;

const FEATURES = [
  { icon: CheckCircle2, text: 'Яскраві кольори без вигорання' },
  { icon: CheckCircle2, text: 'Стійкість до прання та хімчистки' },
  { icon: CheckCircle2, text: 'Преміум якість плівки' },
  { icon: CheckCircle2, text: 'Швидке виготовлення' },
];

export default function DTFPrint() {
  const [width, setWidth] = useState(MIN_WIDTH);
  const [height, setHeight] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const parsedW = parseFloat(width) || 0;
  const parsedH = parseFloat(height) || 0;
  const area = parsedW * parsedH;
  const basePrice = area * PRICE_PER_SQM;
  const totalCalc = urgent ? basePrice * 1.3 : basePrice;
  const total = totalCalc < MIN_PRICE && totalCalc > 0 ? MIN_PRICE : totalCalc > 0 ? Math.round(totalCalc) : MIN_PRICE;

  const canOrder = parsedW > 0 && parsedH > 0;

  const handleOrder = () => {
    if (!canOrder) return;
    setOrdered(true);
    setTimeout(() => setOrdered(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 lg:px-8 py-6 max-w-6xl">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-5 flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/technologies" className="hover:text-primary transition-colors">Технології друку</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/dtf-print" className="hover:text-primary transition-colors">ДТФ друк в рулонах</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">ДТФ плівка преміум</span>
        </nav>

        {/* Title */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <h1 className="text-2xl font-bold text-foreground">ДТФ плівка преміум</h1>
          <Badge className="bg-accent text-accent-foreground text-xs">Преміум якість</Badge>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* LEFT — Image + Features */}
          <div className="lg:col-span-3 space-y-4">
            {/* Image */}
            <div
              className="relative rounded-xl overflow-hidden border bg-card shadow-sm cursor-zoom-in group"
              onClick={() => setImageZoomed(!imageZoomed)}
            >
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85"
                alt="ДТФ плівка преміум"
                className={`w-full object-cover transition-transform duration-300 ${imageZoomed ? 'scale-110' : 'group-hover:scale-105'}`}
                style={{ maxHeight: imageZoomed ? '400px' : '260px' }}
              />
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <ZoomIn className="w-4 h-4 text-foreground" />
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {FEATURES.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2.5 text-sm text-foreground">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Info block */}
            <div className="bg-muted/50 border rounded-xl p-4 text-sm text-muted-foreground leading-relaxed space-y-2">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p>
                  Перед завантаженням файлів переконайтесь, що макет відповідає{' '}
                  <a href="#" className="text-primary hover:underline font-medium">технічним вимогам</a>.{' '}
                  <a href="#" className="text-primary hover:underline">Інструкція з підготовки файлів</a> до друку.
                  Тип відрізу – на <a href="#" className="text-primary hover:underline">гарячу</a>.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-4 pt-1 border-t border-border">
                <a href="tel:+380739338895" className="flex items-center gap-1.5 text-primary hover:underline font-medium">
                  <Phone className="w-3.5 h-3.5" />
                  +38 073 933 88 95
                </a>
                <a href="#" className="flex items-center gap-1.5 text-primary hover:underline font-medium">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Telegram менеджера
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — Order Panel */}
          <div className="lg:col-span-2 sticky top-4">
            <div className="bg-card border rounded-xl shadow-md p-6 space-y-5">

              {/* Size */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-bold text-foreground">Розмір</h2>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    мін. ширина {MIN_WIDTH} м
                  </span>
                </div>
                <p className="text-xs text-amber-600 font-medium">
                  * Обов'язково вкажіть актуальну довжину Вашого макету
                </p>
                <div className="flex items-end gap-2">
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Ширина (м)</label>
                    <Input
                      type="number"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      step="0.01"
                      min="0"
                      className="text-center font-mono text-base"
                    />
                  </div>
                  <span className="pb-2 text-muted-foreground font-bold text-lg">×</span>
                  <div className="flex-1 space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Висота (м)</label>
                    <Input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      step="0.01"
                      min="0"
                      placeholder="0"
                      className="text-center font-mono text-base"
                    />
                  </div>
                </div>
                {parsedW > 0 && parsedH > 0 && (
                  <p className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-1.5">
                    Площа: <strong>{area.toFixed(4)} м²</strong> · {(area * 10000).toFixed(0)} см²
                  </p>
                )}
              </div>

              <hr className="border-border" />

              {/* Urgent */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-foreground">Терміново</h2>
                  <div className="relative group/tip">
                    <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                    <div className="absolute left-5 -top-1 hidden group-hover/tip:block z-10 bg-foreground text-background text-xs rounded-lg px-3 py-2 w-44 shadow-lg">
                      Термінове виготовлення +30% до вартості
                    </div>
                  </div>
                </div>
                <label
                  htmlFor="urgent"
                  className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-all ${
                    urgent ? 'border-accent bg-accent/10' : 'border-border hover:border-muted-foreground/40'
                  }`}
                >
                  <Checkbox
                    id="urgent"
                    checked={urgent}
                    onCheckedChange={setUrgent}
                  />
                  <div className="flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${urgent ? 'text-accent' : 'text-muted-foreground'}`} />
                    <span className={`text-sm font-medium ${urgent ? 'text-accent' : 'text-foreground'}`}>
                      Терміново (+30%)
                    </span>
                  </div>
                </label>
              </div>

              <hr className="border-border" />

              {/* File upload hint */}
              <div className="flex items-center gap-2 border border-dashed border-primary/40 rounded-lg px-4 py-3 text-sm text-primary/70 hover:border-primary hover:text-primary transition-colors cursor-pointer bg-primary/5">
                <Upload className="w-4 h-4 shrink-0" />
                <span>Прикріпити файл макету (необов'язково)</span>
              </div>

              {/* Price */}
              <div className="bg-muted/60 rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">До сплати:</p>
                  {urgent && canOrder && (
                    <p className="text-xs text-muted-foreground line-through">{Math.round(basePrice)} грн</p>
                  )}
                </div>
                <p className="text-3xl font-bold text-foreground tracking-tight">
                  {total} <span className="text-base font-medium text-muted-foreground">грн</span>
                </p>
              </div>

              {/* CTA */}
              <Button
                onClick={handleOrder}
                disabled={!canOrder}
                className={`w-full py-5 text-base font-semibold transition-all duration-200 ${
                  ordered
                    ? 'bg-green-600 hover:bg-green-600 text-white'
                    : canOrder
                    ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                {ordered ? (
                  <span className="flex items-center gap-2 justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                    Замовлення прийнято!
                  </span>
                ) : (
                  'Замовити друк'
                )}
              </Button>

              {!canOrder && (
                <p className="text-xs text-center text-muted-foreground">
                  Вкажіть розміри для оформлення замовлення
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}