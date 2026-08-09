import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Flame, Scissors, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FEATURES = [
  { icon: Scissors, title: 'Чіткі контури', text: 'Плівка вирізається за формою макета та точно передає лінії й написи.' },
  { icon: Zap, title: 'Швидкий тираж', text: 'Оптимальна технологія для термінових малих і середніх замовлень.' },
  { icon: Sparkles, title: 'Спеціальні ефекти', text: 'Флекс, флок, металік та інші фактури для виразного дизайну.' },
  { icon: ShieldCheck, title: 'Стійкість до прання', text: 'Якісно нанесена плівка довго зберігає колір і форму.' },
];

const SPECS = [
  ['Тип нанесення', 'Термоплівка'], ['Матеріали', 'Бавовна, поліестер, сумішеві тканини'],
  ['Рекомендована палітра', '1–3 кольори'], ['Види плівки', 'Флекс, флок, металік, світловідбивна'],
  ['Мінімальна ширина', '0,3 м'], ['Застосування', 'Номери, написи, логотипи, командна форма'],
];

const STEPS = [
  ['01', 'Оберіть плівку', 'Визначте колір, фактуру та текстиль для нанесення.'],
  ['02', 'Підготуйте макет', 'Надішліть векторний логотип, напис або номер у потрібному розмірі.'],
  ['03', 'Порізка і перенесення', 'Вирізаємо елементи та фіксуємо їх на текстилі термопресом.'],
  ['04', 'Перевірка', 'Контролюємо міцність нанесення й передаємо готовий тираж.'],
];

export default function HeatTransferPrint() {
  return (
    <div className="min-h-screen flex flex-col bg-background"><Header /><main className="flex-1">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl pt-6"><nav className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap"><Link to="/" className="hover:text-primary">Головна</Link><ChevronRight className="w-3 h-3" /><Link to="/technologies" className="hover:text-primary">Технології друку</Link><ChevronRight className="w-3 h-3" /><span className="text-foreground font-medium">Термоперенос</span></nav></div>
      <section className="py-8 lg:py-12"><div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"><div className="space-y-5"><div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"><Flame className="w-3.5 h-3.5" />Heat Transfer</div><h1 className="text-3xl lg:text-5xl font-bold leading-tight">Термоперенос — <span className="text-primary">чітке нанесення на текстиль</span></h1><p className="text-muted-foreground text-base lg:text-lg leading-relaxed">Класична технологія нанесення логотипів, написів і номерів за допомогою термоплівки. Підходить для форми, корпоративного одягу, клубного мерчу та невеликих тиражів із лаконічним дизайном.</p><Link to="/catalog?cat=heat_transfer" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90">Перейти в каталог термопереносу <ArrowRight className="w-4 h-4" /></Link></div><div className="rounded-2xl overflow-hidden shadow-lg border"><img src="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1000&q=85" alt="Термоперенос на текстиль" className="w-full h-72 lg:h-96 object-cover" /></div></div></section>
      <section className="py-12 bg-muted/30"><div className="container mx-auto px-4 lg:px-8 max-w-6xl"><h2 className="text-2xl lg:text-3xl font-bold text-center mb-2">Переваги термопереносу</h2><p className="text-muted-foreground text-center mb-10">Практичне рішення для номерів, написів і лаконічних логотипів.</p><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">{FEATURES.map(({ icon: Icon, title, text }) => <div key={title} className="bg-card border rounded-2xl p-6 shadow-sm"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-primary" /></div><h3 className="font-bold mb-2">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></div>)}</div></div></section>
      <section className="py-14"><div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10"><div><h2 className="text-2xl font-bold mb-6">Технічні характеристики</h2><div className="bg-card border rounded-2xl divide-y overflow-hidden">{SPECS.map(([label, value]) => <div key={label} className="flex justify-between gap-4 px-5 py-4"><span className="text-muted-foreground text-sm">{label}</span><span className="font-semibold text-sm text-right">{value}</span></div>)}</div></div><div><h2 className="text-2xl font-bold mb-6">Як замовити</h2><ol className="space-y-4">{STEPS.map(([n, title, text]) => <li key={n} className="flex gap-4"><span className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">{n}</span><div><h3 className="font-semibold">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></div></li>)}</ol></div></div></section>
      <section className="pb-14"><div className="container mx-auto px-4 lg:px-8 max-w-6xl"><div className="bg-primary text-primary-foreground rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6"><div><h2 className="text-2xl lg:text-3xl font-bold mb-2">Оберіть матеріали для термопереносу</h2><p className="text-primary-foreground/80">Перегляньте доступні рішення для текстилю у каталозі.</p></div><Link to="/catalog?cat=heat_transfer" className="shrink-0 inline-flex items-center gap-2 bg-card text-primary font-semibold text-sm px-5 py-3 rounded-xl">Перейти в каталог <ArrowRight className="w-4 h-4" /></Link></div></div></section>
    </main><Footer /></div>
  );
}