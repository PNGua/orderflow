import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, CheckCircle2, Sparkles, ShieldCheck, Palette,
  WashingMachine, Zap, ArrowRight, Phone, MessageCircle, Shirt,
  Layers, Award, Scissors, Boxes, Users, Building2
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import YoutubeVideoPlaceholder from '@/components/YoutubeVideoPlaceholder';

const METHODS = [
  {
    icon: Layers,
    title: 'DTF друк',
    text: 'Повноколірний фотодрук на термоплівці для перенесення на бавовну, поліестер, трикотаж та змішані тканини. Стійкість 50+ циклів прання.',
    price: 'від 95 грн',
  },
  {
    icon: Palette,
    title: 'Сублімація',
    text: 'Насичений фотографічний друк на світлих синтетичних тканинах (поліестер ≥ 65%). Кольори не вигорають і не тріскаються з часом.',
    price: 'від 85 грн',
  },
  {
    icon: ShieldCheck,
    title: 'Флекс та флок',
    text: 'Однотонні логотипи, написи, номери з еластичної термоплівки. Стійкість до високих температур прання, ідеально для спортивного та робочого одягу.',
    price: 'від 45 грн',
  },
  {
    icon: Award,
    title: 'Машинна вишивка',
    text: 'Найстійкіше брендування — вишивка служить довше за сам виріб. Преміум-вигляд для корпоративного одягу, поло, кепок, нашивок.',
    price: 'від 60 грн',
  },
];

const FEATURES = [
  { icon: Palette, title: 'Метод під завдання', text: 'Підбираємо технологію під тканину, тираж і бюджет — від одного виробу до крупного корпоративного замовлення.' },
  { icon: Shirt, title: 'Готовий одяг', text: 'Брендуємо готові вироби: футболки, поло, худі, светри, куртки, кепки, робочий та корпоративний одяг.' },
  { icon: WashingMachine, title: 'Стійкість до прання', text: 'Зберігаємо вигляд після десятків циклів прання та інтенсивного носіння — підтверджуємогарантією.' },
  { icon: Zap, title: 'Швидкі терміни', text: 'Терміновий тираж за 24–72 години. Точний строк залежить від методу та обсягу замовлення.' },
];

const USE_CASES = [
  { icon: Building2, title: 'Корпоративний одяг', text: 'Уніформа та стилі офісу — поло, футболки, худі з логотипом компанії для команди та заходів.' },
  { icon: ShieldCheck, title: 'Робоча форма', text: 'Брендування спецодягу, жилетів, курток — стійке до навантажень і частого прання.' },
  { icon: Boxes, title: 'Мерч та екіпірування', text: 'Брендований мерч для івентів, команд, фан-бази та промокампаній — від ескізу до готового виробу.' },
  { icon: Users, title: 'Спортивний одяг', text: 'Номери, імена та логотипи на формі команд, клубів, шкіл — флекс та DTF для високої стійкості.' },
];

const SPECS = [
  { label: 'Мінімальний тираж', value: 'від 1 виробу (DTF, флекс, вишивка)' },
  { label: 'Методи брендування', value: 'DTF, сублімація, флекс/флок, вишивка' },
  { label: 'Стійкість прання', value: 'до 50+ циклів (DTF, флекс)' },
  { label: 'Матеріали', value: 'Бавовна, поліестер, трикотаж, мікс, змішані тканини' },
  { label: 'Терміни виготовлення', value: '1–5 робочих днів (терміново — 24 год)' },
  { label: 'Формат макету', value: 'Вектор PDF/AI/EPS або растр ≥300 dpi' },
];

const STEPS = [
  { n: '01', title: 'Заявка', text: 'Надсилаєте опис завдання, макет або ескіз через форму чи менеджера. За потреби поможемо з дизайн-підготовкою.' },
  { n: '02', title: 'Підбір методу', text: 'Менеджер радить технологію під тканину та тираж, прораховує вартість та погоджує строки.' },
  { n: '03', title: 'Виготовлення', text: 'Друк або вишивку виконуємо з контролем якості на кожному етапі — обов\'язковий тестовий відтиск при великому тиражі.' },
  { n: '04', title: 'Доставка', text: 'Готовий одяг відправляємо Новою Поштою, Укрпоштою або кур\'єром по Києву і Львову.' },
];

export default function ApparelBranding() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl pt-6">
          <nav className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/services" className="hover:text-primary transition-colors">Послуги</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Брендування одягу</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  Послуга брендування
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                  Брендування одягу — <span className="text-primary">ескіз до готового виробу</span>
                </h1>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
                  Готовий одяг з вашим принтом від ескізу до готового виробу. Брендуємо футболки, поло,
                  худі, куртки та кепки за допомогою DTF, сублімації, флексу та вишивки. Працюємо з
                  приватними замовниками та корпоративним сегментом — від одного виробу до великих тиражів.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    to="/contacts"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90 transition-colors"
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
                  src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1000&q=85"
                  alt="Брендування одягу"
                  className="w-full h-72 lg:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About + video */}
        <section className="pb-12">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">Про послугу</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Які методи ми поєднуємо</h2>
              <div className="space-y-3 text-sm lg:text-base text-muted-foreground leading-relaxed">
                <p>
                  Брендування одягу — це повний цикл: від ідеї та дизайну до готового виробу з доставкою.
                  Ми працюємо з чотирма основними технологіями нанесення, кожна з яких має свої переваги залежно
                  від тканини, тиражу та візерунка.
                </p>
                <p>
                  Для повноколірних та складних робіт обираємо <strong className="text-foreground">DTF або сублімацію</strong>;
                  для однотонних логотипів і номерів — <strong className="text-foreground">флекс</strong>;
                  для преміум-корпоративного вигляду — <strong className="text-foreground">машинну вишивку</strong>.
                  За потреби поєднуємо методи в одному замовленні.
                </p>
              </div>
            </div>
            <YoutubeVideoPlaceholder title="Відео про брендування одягу" />
          </div>
        </section>

        {/* Methods */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 text-center">Методи нанесення</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Обираємо технологію під вашу тканину, тираж і дизайну — із гарантованою стійкістю.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {METHODS.map(({ icon: Icon, title, text, price }) => (
                <div key={title} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{text}</p>
                  <div className="mt-4 pt-3 border-t border-border text-sm font-bold text-primary">{price}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2 text-center">Переваги роботи з нами</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-2xl mx-auto">
              Досвід понад 10 років у брендуванні одягу для бізнесу, команд та приватних замовників.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="py-14 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="max-w-2xl mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Для кого та для чого</h2>
              <p className="text-muted-foreground text-base">Типові напрямки використання брендованого одягу.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {USE_CASES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-card border rounded-2xl p-6 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-1.5">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specs + How it works */}
        <section className="py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Технічні параметри</h2>
              <div className="bg-card border rounded-2xl divide-y divide-border overflow-hidden">
                {SPECS.map((s) => (
                  <div key={s.label} className="flex items-start justify-between gap-4 px-5 py-4">
                    <span className="text-muted-foreground text-sm shrink-0">{s.label}</span>
                    <span className="text-foreground font-semibold text-sm text-right">{s.value}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Потребуєте складного замовлення чи нестандартного матеріалу? Менеджер погодить параметри під ваше завдання.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Як замовити</h2>
              <ol className="space-y-4">
                {STEPS.map(({ n, title, text }) => (
                  <li key={n} className="flex gap-4">
                    <span className="shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">
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
            <div className="bg-primary text-primary-foreground rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">Готові брендувати ваш одяг?</h2>
                <p className="text-primary-foreground/80">
                  Надішліть макет або ескіз — менеджер підбере технологію, прорахує вартість та погодить терміни виготовлення.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contacts"
                  className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-5 py-3 rounded-xl hover:bg-white/90 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Залишити заявку
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 border border-white/40 text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Інші послуги <ArrowRight className="w-4 h-4" />
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