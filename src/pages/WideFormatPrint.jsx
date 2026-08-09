import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Image, Maximize, ShieldCheck, Sparkles, Store } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FEATURES = [
  { icon: Maximize, title: 'Великі формати', text: 'Виготовляємо рекламні носії від компактних постерів до масштабних полотен.' },
  { icon: Store, title: 'Для вулиці та інтер’єру', text: 'Матеріали підбираються відповідно до місця та умов експлуатації.' },
  { icon: ShieldCheck, title: 'Стійкість до УФ', text: 'Зображення витримує сонячне світло, вологу та перепади температур.' },
  { icon: Image, title: 'Різні носії', text: 'Банер, самоклейна плівка, папір, Backlit та спеціальні матеріали.' },
];

const SPECS = [
  ['Тип друку', 'Large Format'], ['Матеріали', 'Банер, плівка, папір, Backlit'],
  ['Роздільна здатність', 'До 1440 dpi'], ['Максимальна ширина', 'Залежить від обраного матеріалу'],
  ['Післядрукарська обробка', 'Ламінація, люверси, проклейка, контурна порізка'], ['Застосування', 'Вивіски, вітрини, стенди, постери, білборди'],
];

const STEPS = [
  ['01', 'Опишіть завдання', 'Вкажіть формат, місце використання та бажаний матеріал.'],
  ['02', 'Перевірка макета', 'Адаптуємо файл під розмір і перевіримо якість зображення.'],
  ['03', 'Друк та обробка', 'Друкуємо тираж і виконуємо потрібне ламінування чи підсилення.'],
  ['04', 'Видача замовлення', 'Пакуємо готову продукцію для самовивозу або доставки.'],
];

export default function WideFormatPrint() {
  return (
    <div className="min-h-screen flex flex-col bg-background"><Header /><main className="flex-1">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl pt-6"><nav className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap"><Link to="/" className="hover:text-primary">Головна</Link><ChevronRight className="w-3 h-3" /><Link to="/technologies" className="hover:text-primary">Технології друку</Link><ChevronRight className="w-3 h-3" /><span className="text-foreground font-medium">Широкоформатний друк</span></nav></div>
      <section className="py-8 lg:py-12"><div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"><div className="space-y-5"><div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"><Sparkles className="w-3.5 h-3.5" />Large Format</div><h1 className="text-3xl lg:text-5xl font-bold leading-tight">Широкоформатний друк — <span className="text-primary">реклама будь-якого масштабу</span></h1><p className="text-muted-foreground text-base lg:text-lg leading-relaxed">Рішення для зовнішньої та внутрішньої реклами: банери, вітрини, світлові короби, виставкові стенди та оформлення інтер’єрів. Підбираємо матеріал і спосіб обробки під конкретні умови використання.</p><Link to="/catalog?cat=wide_format" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90">Перейти в каталог широкоформатного друку <ArrowRight className="w-4 h-4" /></Link></div><div className="rounded-2xl overflow-hidden shadow-lg border"><img src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1000&q=85" alt="Широкоформатний друк реклами" className="w-full h-72 lg:h-96 object-cover" /></div></div></section>
      <section className="py-12 bg-muted/30"><div className="container mx-auto px-4 lg:px-8 max-w-6xl"><h2 className="text-2xl lg:text-3xl font-bold text-center mb-2">Переваги широкоформатного друку</h2><p className="text-muted-foreground text-center mb-10">Помітні рекламні рішення для бізнесу, подій та міського простору.</p><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">{FEATURES.map(({ icon: Icon, title, text }) => <div key={title} className="bg-card border rounded-2xl p-6 shadow-sm"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-primary" /></div><h3 className="font-bold mb-2">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></div>)}</div></div></section>
      <section className="py-14"><div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10"><div><h2 className="text-2xl font-bold mb-6">Технічні характеристики</h2><div className="bg-card border rounded-2xl divide-y overflow-hidden">{SPECS.map(([label, value]) => <div key={label} className="flex justify-between gap-4 px-5 py-4"><span className="text-muted-foreground text-sm">{label}</span><span className="font-semibold text-sm text-right">{value}</span></div>)}</div></div><div><h2 className="text-2xl font-bold mb-6">Як замовити</h2><ol className="space-y-4">{STEPS.map(([n, title, text]) => <li key={n} className="flex gap-4"><span className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">{n}</span><div><h3 className="font-semibold">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></div></li>)}</ol></div></div></section>
      <section className="pb-14"><div className="container mx-auto px-4 lg:px-8 max-w-6xl"><div className="bg-primary text-primary-foreground rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6"><div><h2 className="text-2xl lg:text-3xl font-bold mb-2">Оберіть формат і матеріал</h2><p className="text-primary-foreground/80">Перегляньте доступні рішення для зовнішньої та інтер’єрної реклами.</p></div><Link to="/catalog?cat=wide_format" className="shrink-0 inline-flex items-center gap-2 bg-card text-primary font-semibold text-sm px-5 py-3 rounded-xl">Перейти в каталог <ArrowRight className="w-4 h-4" /></Link></div></div></section>
    </main><Footer /></div>
  );
}