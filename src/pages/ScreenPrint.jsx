import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Layers, Palette, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YoutubeVideoPlaceholder from '@/components/YoutubeVideoPlaceholder';

const FEATURES = [
  { icon: Palette, title: 'Насичені кольори', text: 'Щільне нанесення забезпечує чистий і стабільний колір на світлих та темних матеріалах.' },
  { icon: ShieldCheck, title: 'Висока стійкість', text: 'Фарба витримує інтенсивне використання та багаторазове прання.' },
  { icon: Layers, title: 'Спеціальні ефекти', text: 'Можливі об’ємні, металізовані, флуоресцентні та фактурні покриття.' },
  { icon: Zap, title: 'Вигідно для тиражів', text: 'Собівартість одного нанесення зменшується зі збільшенням кількості виробів.' },
];

const SPECS = [
  ['Тип друку', 'Трафаретне нанесення фарби'], ['Матеріали', 'Текстиль, папір, картон, пластик'],
  ['Кількість кольорів', 'Від 1 кольору'], ['Оптимальний тираж', 'Середні та великі партії'],
  ['Доступні ефекти', 'Об’єм, металік, флуоресцент, глітер'], ['Застосування', 'Одяг, пакування, постери, промопродукція'],
];

const STEPS = [
  ['01', 'Аналіз макета', 'Визначаємо кількість кольорів, матеріал та потрібний ефект.'],
  ['02', 'Підготовка форм', 'Для кожного кольору створюємо окрему друкарську сітку.'],
  ['03', 'Друк тиражу', 'Послідовно наносимо фарби та закріплюємо їх на матеріалі.'],
  ['04', 'Контроль якості', 'Перевіряємо суміщення кольорів, сушимо та пакуємо продукцію.'],
];

export default function ScreenPrint() {
  return (
    <div className="min-h-screen flex flex-col bg-background"><Header /><main className="flex-1">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl pt-6"><nav className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap"><Link to="/" className="hover:text-primary">Головна</Link><ChevronRight className="w-3 h-3" /><Link to="/technologies" className="hover:text-primary">Технології друку</Link><ChevronRight className="w-3 h-3" /><span className="text-foreground font-medium">Шовкотрафаретний друк</span></nav></div>
      <section className="py-8 lg:py-12"><div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"><div className="space-y-5"><div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"><Sparkles className="w-3.5 h-3.5" />Screen Printing</div><h1 className="text-3xl lg:text-5xl font-bold leading-tight">Шовкотрафаретний друк — <span className="text-primary">надійне рішення для тиражів</span></h1><p className="text-muted-foreground text-base lg:text-lg leading-relaxed">Класична технологія прямого нанесення фарби через спеціальну сітку. Вона забезпечує щільний колір, високу стійкість і широкий вибір декоративних ефектів.</p><Link to="/contacts" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90">Отримати консультацію <ArrowRight className="w-4 h-4" /></Link></div><div className="rounded-2xl overflow-hidden shadow-lg border"><img src="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1000&q=85" alt="Шовкотрафаретний друк на текстилі" className="w-full h-72 lg:h-96 object-cover" /></div></div></section>
      <section className="pb-12"><div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"><div><p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Про технологію</p><h2 className="text-2xl lg:text-3xl font-bold mb-4">Як працює шовкотрафаретний друк</h2><div className="space-y-3 text-sm lg:text-base text-muted-foreground leading-relaxed"><p>Макет розділяється на кольори, і для кожного з них готується окрема трафаретна форма. Фарба продавлюється через відкриті ділянки сітки безпосередньо на виріб.</p><p>Кольори наносяться послідовно, після чого відбиток проходить сушіння та закріплення. Метод особливо вигідний для серійного виробництва з повторюваним дизайном.</p></div></div><YoutubeVideoPlaceholder title="Відео про технологію шовкотрафаретного друку" /></div></section>
      <section className="py-12 bg-muted/30"><div className="container mx-auto px-4 lg:px-8 max-w-6xl"><h2 className="text-2xl lg:text-3xl font-bold text-center mb-2">Переваги шовкотрафарету</h2><p className="text-muted-foreground text-center mb-10">Стабільна якість і виразне нанесення для серійної продукції.</p><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">{FEATURES.map(({ icon: Icon, title, text }) => <div key={title} className="bg-card border rounded-2xl p-6 shadow-sm"><div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-primary" /></div><h3 className="font-bold mb-2">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></div>)}</div></div></section>
      <section className="py-14"><div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10"><div><h2 className="text-2xl font-bold mb-6">Технічні характеристики</h2><div className="bg-card border rounded-2xl divide-y overflow-hidden">{SPECS.map(([label, value]) => <div key={label} className="flex justify-between gap-4 px-5 py-4"><span className="text-muted-foreground text-sm">{label}</span><span className="font-semibold text-sm text-right">{value}</span></div>)}</div></div><div><h2 className="text-2xl font-bold mb-6">Як замовити</h2><ol className="space-y-4">{STEPS.map(([n, title, text]) => <li key={n} className="flex gap-4"><span className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">{n}</span><div><h3 className="font-semibold">{title}</h3><p className="text-sm text-muted-foreground leading-relaxed">{text}</p></div></li>)}</ol></div></div></section>
      <section className="pb-14"><div className="container mx-auto px-4 lg:px-8 max-w-6xl"><div className="bg-primary text-primary-foreground rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6"><div><h2 className="text-2xl lg:text-3xl font-bold mb-2">Потрібен розрахунок тиражу?</h2><p className="text-primary-foreground/80">Надішліть макет — менеджер підбере фарби, матеріал і оптимальний формат виробництва.</p></div><Link to="/contacts" className="shrink-0 inline-flex items-center gap-2 bg-card text-primary font-semibold text-sm px-5 py-3 rounded-xl">Зв’язатися з нами <ArrowRight className="w-4 h-4" /></Link></div></div></section>
    </main><Footer /></div>
  );
}