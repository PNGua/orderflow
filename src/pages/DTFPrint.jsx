import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, CheckCircle2, Sparkles, ShieldCheck, Palette,
  WashingMachine, Zap, ArrowRight, Phone, MessageCircle
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YoutubeVideoPlaceholder from '@/components/YoutubeVideoPlaceholder';

const FEATURES = [
  {
    icon: Palette,
    title: 'Яскраві кольори',
    text: 'Повноколірний CMYK друк з високою насиченістю та відтіненням деталей.',
  },
  {
    icon: ShieldCheck,
    title: 'Стійкість до прання',
    text: 'Зберігає вигляд після 50+ циклів прання та хімчистки.',
  },
  {
    icon: WashingMachine,
    title: 'Універсальність матеріалів',
    text: 'Бавовна, поліестер, мікс, трикотаж — плівка прилягає до будь-якої тканини.',
  },
  {
    icon: Zap,
    title: 'Швидке виготовлення',
    text: 'Терміновий тираж за 24 години з можливістю доставки по Україні.',
  },
];

const SPECS = [
  { label: 'Мінімальна ширина', value: '0.58 м' },
  { label: 'Тип відрізу', value: 'Гаряче /lash' },
  { label: 'Роздільна здатність', value: '1200 dpi' },
  { label: 'Кольоровий профіль', value: 'CMYK + White' },
  { label: 'Товщина плівки', value: '50 мкм' },
  { label: 'Доступні ефекти', value: 'Глітер, фольга, люмінесцент, рефлектив' },
];

const STEPS = [
  { n: '01', title: 'Заявка', text: 'Ви надсилаєте макет та/або опис завдання через форму чи менеджера.' },
  { n: '02', title: 'Прорахунок', text: 'Менеджер рахує вартість за площею тиражу та погоджує деталі.' },
  { n: '03', title: 'Друк', text: 'Виробництво на преміум-плівці з контролем якості на кожному етапі.' },
  { n: '04', title: 'Доставка', text: 'Готовий тираж відправляємо Новою Поштою або курьєром по Києву.' },
];

export default function DTFPrint() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl pt-6">
          <nav className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/technologies" className="hover:text-primary transition-colors">Технології друку</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">ДТФ друк (Direct-to-Film)</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 bg-[#037291]/10 text-[#037291] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  Технологія друку
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                  ДТФ друк — <span className="text-[#037291]">високоякісний переніс на будь-яку тканину</span>
                </h1>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                  Direct-to-Film — технологія повноколірного друку на термоплівці. Візерунок спершу наноситься
                  на носій, а потім пресом переноситься на виріб. Підходить для бавовни, поліестру,
                  трикотажу, змішаних тканин, великогабаритної продукції та робочого одягу.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Link
                    to="/contacts"
                    className="inline-flex items-center gap-2 bg-[#037291] text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-[#025a73] transition-colors"
                  >
                    Замовити консультацію <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="tel:+380739338895"
                    className="inline-flex items-center gap-2 border border-border text-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-muted transition-colors"
                  >
                    <Phone className="w-4 h-4" /> +38 073 933 88 95
                  </a>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg border">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1000&q=85"
                  alt="ДТФ друк"
                  className="w-full h-72 lg:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technology description and video */}
        <section className="pb-12">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Про технологію</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Як працює ДТФ друк</h2>
              <div className="space-y-3 text-sm lg:text-base text-muted-foreground leading-relaxed">
                <p>Макет друкується дзеркально на спеціальній PET-плівці кольоровими та білими чорнилами. На свіжий шар наноситься термоклей, після чого трансфер проходить полімеризацію.</p>
                <p>Готове зображення переноситься на тканину термопресом. Технологія не потребує підготовки текстилю та дозволяє працювати з повноколірними макетами, тонкими лініями й невеликими тиражами.</p>
              </div>
            </div>
            <YoutubeVideoPlaceholder title="Відео про технологію ДТФ друку" />
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 text-center">Переваги технології</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Чому DTF — це оптимальний вибір для promotional-, fashion та робочого текстилю.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-[#037291]/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#037291]" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs + How it works */}
        <section className="py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Specs */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Технічні характеристики</h2>
              <div className="bg-card border rounded-2xl divide-y divide-border overflow-hidden">
                {SPECS.map((s) => (
                  <div key={s.label} className="flex items-center justify-between px-5 py-4">
                    <span className="text-muted-foreground text-sm">{s.label}</span>
                    <span className="text-foreground font-semibold text-sm text-right">{s.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Потребуєте спеціальної конфігурації? Менеджер погодить усі параметри під ваше завдання.
              </p>
            </div>

            {/* How it works */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Як замовити</h2>
              <ol className="space-y-4">
                {STEPS.map(({ n, title, text }) => (
                  <li key={n} className="flex gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-[#037291] text-white font-bold text-sm flex items-center justify-center">
                      {n}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="bg-[#037291] text-white rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">Готові розрахувати тираж?</h2>
                <p className="text-white/80">
                  Надішліть макет — менеджер прорахує вартість за площею тиражу та погодить терміни.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contacts"
                  className="inline-flex items-center gap-2 bg-white text-[#037291] font-semibold text-sm px-5 py-3 rounded-xl hover:bg-white/90 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Залишити заявку
                </Link>
                <Link
                  to="/technologies"
                  className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Інші технології <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}