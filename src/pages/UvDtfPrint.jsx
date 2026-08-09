import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Box, ChevronRight, Droplets, Layers, Sparkles, Sun } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YoutubeVideoPlaceholder from '@/components/YoutubeVideoPlaceholder';

const FEATURES = [
  { icon: Layers, title: "Об'ємний 3D-рельєф", text: 'Пошарове нанесення чорнил створює виразну фактуру та преміальний вигляд.' },
  { icon: Sparkles, title: 'Глянцева поверхня', text: 'Насичені кольори, чіткі деталі та стійкий декоративний блиск.' },
  { icon: Box, title: 'Для твердих поверхонь', text: 'Підходить для скла, металу, пластику, дерева та кераміки.' },
  { icon: Droplets, title: 'Стійкість до вологи', text: 'Полімеризований шар витримує щоденне використання та очищення.' },
];

const SPECS = [
  ['Тип нанесення', 'UV Direct-to-Film'], ['Матеріали', 'Скло, метал, пластик, дерево, кераміка'],
  ['Кольорова схема', 'CMYK + White + Varnish'], ['Ефект', "Глянець та об'ємний рельєф"],
  ['Мінімальна ширина макета', '0,4 м'], ['Підготовка поверхні', 'Чиста, суха та знежирена'],
];

const STEPS = [
  ['01', 'Виберіть виріб', 'Визначте поверхню, розмір нанесення та потрібну кількість.'],
  ['02', 'Підготуйте макет', 'Надішліть векторний файл або зображення у високій якості.'],
  ['03', 'Друк і перенесення', 'Ми друкуємо трансфер, полімеризуємо його та контролюємо якість.'],
  ['04', 'Отримайте замовлення', 'Готову продукцію можна забрати самостійно або замовити доставку.'],
];

export default function UvDtfPrint() {
  return (
    <div className="min-h-screen flex flex-col bg-background"><Header /><main className="flex-1">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl pt-6"><nav className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
        <Link to="/" className="hover:text-primary transition-colors">Головна</Link><ChevronRight className="w-3 h-3" />
        <Link to="/technologies" className="hover:text-primary transition-colors">Технології друку</Link><ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">УФ ДТФ друк</span>
      </nav></div>

      <section className="py-8 lg:py-12"><div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-5"><div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"><Sun className="w-3.5 h-3.5" />UV Direct-to-Film</div>
          <h1 className="text-3xl lg:text-5xl font-bold leading-tight">УФ ДТФ друк — <span className="text-primary">декорування твердих поверхонь</span></h1>
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">Інноваційна технологія ультрафіолетового друку на плівці з подальшим перенесенням на виріб. Шарувата полімеризація створює яскраве, рельєфне та стійке зображення без прямого друку на предметі.</p>
          <Link to="/catalog?cat=uv_dtf" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90 transition-colors">Перейти в каталог УФ ДТФ <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg border"><img src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1000&q=85" alt="УФ ДТФ друк на твердих поверхнях" className="w-full h-72 lg:h-96 object-cover" /></div>
      </div></section>

      <section className="pb-12"><div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"><div><p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Про технологію</p><h2 className="text-2xl lg:text-3xl font-bold mb-4">Як працює УФ ДТФ друк</h2><div className="space-y-3 text-sm lg:text-base text-muted-foreground leading-relaxed"><p>Зображення пошарово друкується УФ-чорнилами на клейовій плівці: спочатку біла основа, потім колір і захисний лак. Кожен шар одразу полімеризується ультрафіолетовим світлом.</p><p>Після ламінування трансфер переноситься на чисту тверду поверхню без нагрівання. Результат має виразний рельєф, точні контури та добре витримує щоденне використання.</p></div></div><YoutubeVideoPlaceholder title="Відео про технологію УФ ДТФ друку" /></div></section>

      <section className="py-12 bg-muted/30"><div className="container mx-auto px-4 lg:px-8 max-w-6xl"><h2 className="text-2xl lg:text-3xl font-bold text-center mb-2">Переваги УФ ДТФ</h2><p className="text-muted-foreground text-center mb-10">Технологія для брендованих виробів, пакування та сувенірної продукції.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">{FEATURES.map(({ icon: Icon, title, text }) => <div key={title} className="bg-card border rounded-2xl p-6 shadow-sm"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-primary" /></div><h3 className="font-bold mb-2">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></div>)}</div>
      </div></section>

      <section className="py-14"><div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10"><div><h2 className="text-2xl font-bold mb-6">Технічні характеристики</h2><div className="bg-card border rounded-2xl divide-y overflow-hidden">{SPECS.map(([label, value]) => <div key={label} className="flex justify-between gap-4 px-5 py-4"><span className="text-muted-foreground text-sm">{label}</span><span className="font-semibold text-sm text-right">{value}</span></div>)}</div></div>
        <div><h2 className="text-2xl font-bold mb-6">Як замовити</h2><ol className="space-y-4">{STEPS.map(([n, title, text]) => <li key={n} className="flex gap-4"><span className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">{n}</span><div><h3 className="font-semibold">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></div></li>)}</ol></div>
      </div></section>

      <section className="pb-14"><div className="container mx-auto px-4 lg:px-8 max-w-6xl"><div className="bg-primary text-primary-foreground rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6"><div><h2 className="text-2xl lg:text-3xl font-bold mb-2">Оберіть УФ ДТФ продукцію</h2><p className="text-primary-foreground/80">Перегляньте доступні види плівки та варіанти друку в каталозі.</p></div><Link to="/catalog?cat=uv_dtf" className="shrink-0 inline-flex items-center gap-2 bg-card text-primary font-semibold text-sm px-5 py-3 rounded-xl hover:bg-card/90 transition-colors">Перейти в каталог <ArrowRight className="w-4 h-4" /></Link></div></div></section>
    </main><Footer /></div>
  );
}