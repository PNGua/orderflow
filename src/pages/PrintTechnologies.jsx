import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Printer, Layers, Flame, Image as ImageIcon, SprayCan, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TECHNOLOGIES = [
  {
    icon: Printer,
    title: 'ДТФ друк',
    subtitle: 'Direct-to-Film',
    description: 'Преміальний повноколірний друк на плівці для перенесення на будь-які тканини — бавовна, поліестр, мікс.',
    features: ['Яскраві кольори', 'Стійкість до прання', 'Мін. ширина 0.58 м'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    link: '/dtf-print',
    available: true,
    accent: 'from-cyan-500/15 to-cyan-500/5',
  },
  {
    icon: Layers,
    title: 'УФ ДТФ друк',
    subtitle: 'UV Direct-to-Film',
    description: 'УФ-полімеризаційний друк на плівці з об\'ємним рельєфом та глянсовою поверхнею для твердих поверхонь.',
    features: ['Об\'ємний ефект', 'Підвищена стійкість', 'Скло, метало, пластик'],
    image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80',
    link: '/dtf-print',
    available: false,
    accent: 'from-violet-500/15 to-violet-500/5',
  },
  {
    icon: ImageIcon,
    title: 'Сублімаційний друк',
    subtitle: 'Dye Sublimation',
    description: 'Яскравий фотодрук на синтетичних тканинах, кружках, тарілках та сувенірній продукції.',
    features: ['Фотореалістична якість', 'Без вигорання', 'Для синтетичних матеріалів'],
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
    link: '/dtf-print',
    available: false,
    accent: 'from-amber-500/15 to-amber-500/5',
  },
  {
    icon: SprayCan,
    title: 'Широкоформатний друк',
    subtitle: 'Large Format',
    description: 'Друк на банерній тканині, плівці та папері для зовнішньої реклами будь-яких розмірів.',
    features: ['Будь-які розміри', 'Внутрішня/зовнішня реклама', 'Стійкість до УФ'],
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
    link: '/dtf-print',
    available: false,
    accent: 'from-emerald-500/15 to-emerald-500/5',
  },
  {
    icon: Flame,
    title: 'Термоперенос',
    subtitle: 'Heat Transfer',
    description: 'Класичний термоперенос та флекс для однотонних логотипів, написів та номерів на текстилі.',
    features: ['Однотонні принти', 'Швидкий тираж', 'Флекс, флок, металік'],
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
    link: '/dtf-print',
    available: false,
    accent: 'from-rose-500/15 to-rose-500/5',
  },
];

export default function PrintTechnologies() {
  const availableCount = TECHNOLOGIES.filter(t => t.available).length;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl pt-6">
          <nav className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Технології друку</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-10">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-[#037291]/10 text-[#037291] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Технології
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight mb-3">
                Технології друку
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed">
                Ознайомтеся з технологіями друку, які ми пропонуємо. Кожна технология має власну посадкову
                сторінку з описом, можливостями та калькулятором вартості.
              </p>
            </div>
          </div>
        </section>

        {/* Technologies grid */}
        <section className="pb-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {TECHNOLOGIES.map((t) => {
                const Icon = t.icon;
                const content = (
                  <div className={`group relative flex flex-col bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 ${t.available ? 'cursor-pointer' : 'opacity-90'}`}>
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={t.image}
                        alt={t.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br ${t.accent}`} />
                      <div className="absolute top-3 left-3 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                        <Icon className="w-5 h-5 text-[#037291]" />
                      </div>
                      {!t.available && (
                        <span className="absolute top-3 right-3 bg-foreground/80 text-background text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
                          Незабаром
                        </span>
                      )}
                      {t.available && (
                        <span className="absolute top-3 right-3 bg-[#037291] text-white text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full">
                          Доступно
                        </span>
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#037291]/70 mb-1">{t.subtitle}</p>
                      <h2 className="text-xl font-bold text-foreground mb-2">{t.title}</h2>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t.description}</p>
                      <ul className="space-y-1.5 mb-4">
                        {t.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs text-foreground/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#037291] shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-2">
                        <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${
                          t.available ? 'text-[#037291] group-hover:gap-2.5' : 'text-muted-foreground'
                        } transition-all`}>
                          {t.available ? 'Перейти до сторінки' : 'Сторінка готується'}
                          {t.available && <ArrowRight className="w-4 h-4" />}
                        </span>
                      </div>
                    </div>
                  </div>
                );
                return t.available ? (
                  <Link key={t.title} to={t.link}>{content}</Link>
                ) : (
                  <div key={t.title}>{content}</div>
                );
              })}
            </div>

            {/* Help CTA */}
            <div className="mt-10 bg-muted/40 border rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-foreground mb-1">Потрібна консультація?</h3>
                <p className="text-sm text-muted-foreground">
                  Менеджер допоможе обрати оптимальну технологію під ваше завдання.
                </p>
              </div>
              <Link
                to="/contacts"
                className="shrink-0 inline-flex items-center gap-2 bg-[#037291] text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#025a73] transition-colors"
              >
                Зв'язатися з нами <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}