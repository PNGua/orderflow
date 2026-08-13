import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Target, Award, Users, Truck, ShieldCheck, Heart, ArrowRight, Factory, Palette, Wrench } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const STATS = [
  { value: '12+', label: 'років на ринку' },
  { value: '50K+', label: 'виконаних замовлень' },
  { value: '2', label: 'власні виробництва' },
  { value: '98%', label: 'повертаються знову' },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Якість без компромісів',
    text: 'Кожне замовлення проходить контроль на всіх етапах — від підготовки макета до пакування готової продукції.',
  },
  {
    icon: Truck,
    title: 'Терміновість',
    text: 'Власне виробництво та налагоджена логістика дозволяють виконувати замовлення навіть у найстисліші терміни.',
  },
  {
    icon: Palette,
    title: 'Гнучкість',
    text: 'Працюємо з одним макетом та великими тиражами, реалізуємо нестандартні ідеї та складні брендування.',
  },
  {
    icon: Heart,
    title: 'Турбота про клієнта',
    text: 'Менеджер супроводжує замовлення від першого дзвінка до доставки та залишається на зв\'язку після.',
  },
];

const TIMELINE = [
  { year: '2014', title: 'Старт у Львові', text: 'Перша друкарня на_city_Городоцькій з одним широкоформатним принтером.' },
  { year: '2017', title: 'Разом з PNG GROUP', text: 'Стали частиною групи компаній PNG, розширили спектр технологій друку.' },
  { year: '2020', title: 'Друге виробництво', text: 'Відкрили потужність у Києві для швидкого обслуговування центрального регіону.' },
  { year: '2023', title: 'ДТФ та УФ ДТФ', text: 'Впровадили сучасні технології DTF та UV DTF друку для брендування одягу та твердих поверхонь.' },
  { year: '2026', title: 'Онлайн-кабінет', text: 'Запустили повноцінну платформу замовлень із особистим кабінетом та відстеженням статусів.' },
];

const TEAM = [
  { role: 'Виробництво', count: '18', icon: Factory },
  { role: 'Дизайн та препрес', count: '6', icon: Palette },
  { role: 'Менеджмент та логістика', count: '9', icon: Wrench },
];

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl pt-6">
          <nav className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Про нас</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-[60fr_40fr] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#037291]/10 text-[#037291] text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Про компанію
                </div>
                <h1 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight mb-5">
                  Фабрика друку та брендування <span className="text-[#037291]">PNG druk</span>
                </h1>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
                  Маємо понад десятиліття досвіду у виготовленні рекламної та брендованої продукції. Обʼєднуємо
                  сучасні технології друку, власне виробництво в Україні та людський підхід до кожного замовлення.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/catalog"
                    className="inline-flex items-center gap-2 bg-[#037291] text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-[#025a73] transition-colors"
                  >
                    Перейти в каталог <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/contacts"
                    className="inline-flex items-center gap-2 border border-border bg-card text-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-muted transition-colors"
                  >
                    Зв'язатися з нами
                  </Link>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden border shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1604881991720-f91add269458?w=900&q=85"
                  alt="Виробництво PNG druk"
                  className="w-full h-72 lg:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="pb-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="bg-card border rounded-2xl p-5 lg:p-6 text-center shadow-sm">
                  <div className="text-3xl lg:text-4xl font-bold text-[#037291] mb-1">{s.value}</div>
                  <div className="text-xs lg:text-sm text-muted-foreground font-medium">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-12 bg-muted/40 border-y">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-[35fr_65fr] gap-10 items-start">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#037291] text-white flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">Наша місія</h2>
                  <p className="text-sm text-muted-foreground mt-1">Те, заради чого ми працюємо щодня</p>
                </div>
              </div>
              <div className="space-y-4 text-base text-foreground/80 leading-relaxed">
                <p>
                  Допомагати бізнесу та авторам втілювати ідеї в якісну продукцію — без бюрократії, довгих узгоджень
                  та прихованих платежів. Робимо друк простим, зрозумілим і доступним.
                </p>
                <p>
                  Ми віримо, що якісний брендинг починається з деталей: від правильної підготовки макета до
                  акуратного пакування замовлення. Саме тому контролюємо кожен етап виробництва власноруч.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="max-w-2xl mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Цінності компанії</h2>
              <p className="text-muted-foreground text-base">Принципи, якими керуємося у роботі та стосунках із клієнтами.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="bg-card border rounded-2xl p-6 shadow-sm flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-[#037291]/10 text-[#037291] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1.5">{v.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-12 bg-muted/40 border-y">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="max-w-2xl mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Наш шлях</h2>
              <p className="text-muted-foreground text-base">Ключові етапи розвитку компанії.</p>
            </div>
            <div className="relative">
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border hidden md:block" />
              <div className="space-y-6 md:pl-10">
                {TIMELINE.map((t) => (
                  <div key={t.year} className="relative md:pl-0 pl-6">
                    <div className="absolute md:-left-[33px] left-0 top-1.5 w-4 h-4 rounded-full bg-[#037291] ring-4 ring-[#037291]/15" />
                    <div className="bg-card border rounded-2xl p-5 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1">
                        <span className="text-[#037291] font-bold text-lg">{t.year}</span>
                        <h3 className="font-bold text-foreground">{t.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{t.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="max-w-2xl mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Наша команда</h2>
              <p className="text-muted-foreground text-base">
                Понад 30 фахівців, які щодня працюють над вашими замовленнями.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {TEAM.map((t) => {
                const Icon = t.icon;
                return (
                  <div key={t.role} className="bg-card border rounded-2xl p-6 shadow-sm text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#037291]/10 text-[#037291] flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">{t.count}</div>
                    <div className="text-sm text-muted-foreground font-medium">{t.role}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="bg-[#037291] rounded-3xl p-8 lg:p-10 text-center text-white">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">Готові реалізувати вашу ідею?</h2>
              <p className="text-white/80 max-w-xl mx-auto mb-6">
                Розкажіть про ваше завдання — підберемо оптимальну технологію, матеріали та терміни виготовлення.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 bg-white text-[#037291] font-semibold text-sm px-5 py-3 rounded-xl hover:bg-white/90 transition-colors"
                >
                  Замовити друк <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contacts"
                  className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-white/10 transition-colors"
                >
                  <Users className="w-4 h-4" /> Контакти
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