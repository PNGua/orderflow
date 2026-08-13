import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, Play, ShieldCheck, Truck, Palette, Heart,
  ArrowRight, Users, Target, Calendar, Clock, Layers,
  Sparkles, Factory, Boxes, HandHeart, Award, Building2,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const STATS = [
  { icon: Users, value: '6 500+', label: 'Задоволених клієнтів' },
  { icon: Layers, value: '350 000+', label: 'Підготовлено макетів' },
  { icon: Boxes, value: '10', label: 'Методів нанесення' },
  { icon: Factory, value: '100 000+', label: 'Виконаних замовлень' },
  { icon: HandHeart, value: '2 500 000+', label: 'Донатів на ЗСУ' },
];

const VALUES = [
  { icon: Building2, title: 'Комплексність', text: 'Обʼєднуємо всі етапи брендування в один сервіс — від дизайну та підготовки макета до готової продукції з доставкою.' },
  { icon: ShieldCheck, title: 'Якість і відповідальність', text: 'Гарантуємо результат і беремо на себе ризики — якщо потрібно, переробимо за свій рахунок.' },
  { icon: Heart, title: 'Партнерство замість клієнтства', text: 'Будуємо відносини, у яких ростуть обидві сторони. Ваш результат — наш пріоритет.' },
  { icon: Award, title: 'Досвід і експертиза', text: 'Понад 10 років у дизайні, друці та брендуванні. Тиражі, кейси та помилки перетворилися у відточений процес.' },
];

const TIMELINE = [
  { year: '2015', title: 'Початок', text: 'Усе почалося з невеликого виробництва у Львові. Перші принти робили вручну — через праску та термоплівку. Тоді народилась ідея поєднати технології, креатив і підприємництво.' },
  { year: '2017', title: 'Переїзд та розвиток', text: 'Відкрили виробництво у Львові на виставці Бандери. Зʼявилися власне обладнання, досвід і перші великі клієнти.' },
  { year: '2019', title: 'Нові технології', text: 'Розширились у напрямках сублімації, флексу, шовкотрафарету. Переїхали в сучасний цех на вул. Городоцькій, 242.' },
  { year: '2022', title: 'Виклики та стійкість', text: 'Після повномасштабного вторгнення підтримували ЗСУ: донати, гуманітарна допомога, принти для військових. Модернізували виробництво та відмовились від російського ПЗ.' },
  { year: '2023', title: 'Створення PNG GROUP', text: 'Заснували PNG GROUP — управлінську компанію, що обʼєднала три напрями: PNG studio (дизайн і брендування), Kufaika (одяг) та PNG druk (друк).' },
  { year: '2026', title: 'Сьогодні', text: 'PNG druk — технологічний підрозділ групи із власним онлайн-кабінетом замовлень. Ростемо, автоматизуємо процеси й мислимо системно.' },
];

const GROUP = [
  { name: 'PNG studio', tag: 'Сервіс комплексного брендування', text: 'Креативний напрям групи: дизайн, брендинг і друк готової продукції. Створюємо рішення, які роблять бізнес впізнаваним.', url: 'https://pngstudio.com.ua/' },
  { name: 'Kufaika', tag: 'Бренд-виробник одягу', text: 'Власний бренд одягу PNG GROUP, створений для рекламних агенцій, брендів та компаній. Шиємо базові моделі під брендування.', url: 'https://kufaika.com.ua/' },
  { name: 'PNG druk', tag: 'Фабрика друку та брендування', text: 'Технологічний підрозділ групи, що забезпечує стабільний та якісний друк для B2B-клієнтів: агентств, швейних фабрик, брендів та дропшиперів.', url: null },
];

const TEAM = [
  { role: 'Виробництво', count: '18' },
  { role: 'Дизайн та препрес', count: '6' },
  { role: 'Менеджмент та логістика', count: '9' },
];

const TEAM_MEMBERS = [
  { name: 'Сергій Демко', role: 'Засновник', img: 'https://images.unsplash.com/photo-1560250097-0b93528c534e?w=500&h=600&fit=crop' },
  { name: 'Андрій Мельник', role: 'Executive Director', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop' },
  { name: 'Вікторія Кондратюк', role: 'Тім-лідерка відділу брендування', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=600&fit=crop' },
  { name: 'Костянтин Ковалишин', role: 'Дизайнер', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=600&fit=crop' },
  { name: 'Надія Баранецька', role: 'Дизайнерка', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=600&fit=crop' },
  { name: 'Марта Ткаченко', role: 'Senior маркетолог', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=600&fit=crop' },
  { name: 'Іванна Шкурлей', role: 'Менеджерка з брендування', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=600&fit=crop' },
  { name: 'Оксана Бучак', role: 'Менеджерка з брендування', img: 'https://images.unsplash.com/photo-1614128478865-44d685e2f1b8?w=500&h=600&fit=crop' },
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

        {/* Hero with intro + video */}
        <section className="py-10 lg:py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Про компанію
                </div>
                <h1 className="text-3xl lg:text-[2.7rem] font-bold text-foreground leading-tight mb-5">
                  PNG druk — фабрика друку та брендування
                </h1>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-6">
                  Ми створюємо продукти, що підсилюють бренди. Від ідеї до готового результату —
                  все в одному місці: дизайн, друк та логістика. Допомагаємо компаніям ставати
                  впізнаваними та ефективно комунікувати через брендовану продукцію.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/catalog"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-primary/90 transition-colors"
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

              {/* Video placeholder */}
              <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3] group cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1604881991720-f91add269458?w=1100&q=85"
                  alt="Виробництво PNG druk"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-white/95 text-primary flex items-center justify-center mb-4 shadow-xl group-hover:scale-105 transition-transform">
                    <Play className="w-7 h-7 ml-0.5 fill-current" />
                  </div>
                  <div className="text-white font-semibold text-sm tracking-wide">PNG druk</div>
                  <div className="text-white/80 text-[11px] uppercase tracking-widest mt-0.5">Part of PNG Group</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About blocks: Хто ми / Місія / Підтримка ЗСУ */}
        <section className="py-10 border-y bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div>
                <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" /> Хто ми
                </h2>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  PNG druk — частина екосистеми <a href="https://www.pnggroup.com.ua/" target="_blank" rel="noreferrer" className="text-primary font-semibold">PNG GROUP</a>,
                  що обʼєднує дизайн, друк та виробництво. Створюємо комплексні рішення для бізнесу:
                  від розробки дизайну до готової продукції з доставкою. Наша команда робить процес простим,
                  а результат — професійним.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5" /> Наша місія
                </h2>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Підсилюємо впізнаваність через брендовану продукцію. Робимо друк простим,
                  зрозумілим і доступним — без бюрократії, довгих узгоджень та прихованих платежів.
                  Віримо, що якісний брендинг починається з деталей.
                </p>
              </div>
              <div>
                <h2 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                  <HandHeart className="w-5 h-5" /> Підтримка ЗСУ та країни
                </h2>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  Системно допомагаємо українській армії та долучаємось до зборів. За час роботи на
                  потреби ЗСУ передано <span className="text-primary font-semibold">понад 2 500 000 грн</span> —
                  донатами, гуманітарною допомогою та брендуванням для військових.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats counters */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="bg-card border rounded-2xl p-5 text-center shadow-sm">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{s.value}</div>
                    <div className="text-xs text-muted-foreground font-medium leading-snug">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-14 bg-muted/30 border-y">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="max-w-2xl mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Наші цінності</h2>
              <p className="text-muted-foreground text-base">Принципи, якими керуємося у роботі та стосунках із клієнтами.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <div key={v.title} className="bg-card border rounded-2xl p-6 shadow-sm flex gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
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
        <section className="py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="max-w-2xl mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Наш шлях</h2>
              <p className="text-muted-foreground text-base">Ключові етапи розвитку компанії.</p>
            </div>
            <div className="relative">
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-border hidden md:block" />
              <div className="space-y-5 md:pl-10">
                {TIMELINE.map((t) => (
                  <div key={t.year} className="relative md:pl-0 pl-6">
                    <div className="absolute md:-left-[33px] left-0 top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-primary/15" />
                    <div className="bg-card border rounded-2xl p-5 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1.5 sm:gap-3 mb-1">
                        <span className="text-primary font-bold text-lg">{t.year}</span>
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

        {/* PNG GROUP ecosystem */}
        <section className="py-14 bg-muted/30 border-y">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="max-w-2xl mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">PNG GROUP</h2>
              <p className="text-muted-foreground text-base">
                Екосистема брендів, що працюють у сфері дизайну, друку та виробництва.
                Ми обʼєднали три напрями, щоб бізнес міг отримати повний цикл брендування.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {GROUP.map((g) => (
                <div key={g.name} className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col">
                  <h3 className="text-lg font-bold text-foreground">{g.name}</h3>
                  <div className="text-primary text-xs font-semibold uppercase tracking-wider mb-3">{g.tag}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{g.text}</p>
                  {g.url ? (
                    <a href={g.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:gap-2.5 transition-all">
                      Перейти <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-foreground/50 text-sm font-medium">
                      <Factory className="w-3.5 h-3.5" /> Ви тут
                    </span>
                  )}
                </div>
              ))}
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
              {TEAM.map((t) => (
                <div key={t.role} className="bg-card border rounded-2xl p-6 shadow-sm flex items-center gap-4">
                  <div className="text-4xl font-bold text-primary leading-none">{t.count}</div>
                  <div className="text-sm font-semibold text-foreground leading-snug">{t.role}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team portraits */}
        <section className="pb-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {TEAM_MEMBERS.map((m) => (
                <div key={m.name} className="group bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative aspect-[5/6] overflow-hidden bg-muted">
                    <img
                      src={m.img}
                      alt={m.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      PNG druk
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-foreground text-sm leading-tight">{m.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="bg-primary rounded-3xl p-8 lg:p-10 text-center text-primary-foreground">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">Готові реалізувати вашу ідею?</h2>
              <p className="text-primary-foreground/80 max-w-xl mx-auto mb-6">
                Розкажіть про ваше завдання — підберемо оптимальну технологію, матеріали та терміни виготовлення.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  to="/catalog"
                  className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-5 py-3 rounded-xl hover:bg-white/90 transition-colors"
                >
                  Замовити друк <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contacts"
                  className="inline-flex items-center gap-2 border border-white/40 text-primary-foreground font-semibold text-sm px-5 py-3 rounded-xl hover:bg-white/10 transition-colors"
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