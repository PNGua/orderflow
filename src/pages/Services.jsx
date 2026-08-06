import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, ArrowRight, CheckCircle2, Phone, MessageCircle,
  Shirt, Flame, Maximize, Scissors, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SERVICES = [
  {
    id: 'sublimation',
    icon: Sparkles,
    title: 'Сублімаційний друк',
    tagline: 'Яскравий повноколірний друк на синтетичних тканинах та сувенірній продукції',
    description: 'Сублімаційний друк дозволяє переносити фотографічну якість зображення на синтетичні матеріали, кераміку та сувеніри. Барвисті, насичені кольори, що не вигорають і не тріскаються з часом.',
    features: [
      'Стійкість до прання та УФ-випромінювання',
      'Повноколірний фотографічний друк',
      'Дрібні деталі та плавні переходи кольорів',
      'Екологічні чорнила без запаху',
    ],
    items: ['Сублімація на тканині', 'Сублімація на кружках', 'Сублімація на футболках'],
    price: 'від 210 грн',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
  },
  {
    id: 'thermotransfer',
    icon: Flame,
    title: 'Термоперенос та флекс',
    tagline: 'Однотонні логотипи та написи з довговічним еластичним матеріалом',
    description: 'Класичний термоперенос і флекс — ідеальний вибір для нанесення чітких однотонних логотипів, написів та номерів на спортивний та робочий одяг. Матеріал стійкий до інтенсивних навантажень.',
    features: [
      'Еластичний і довговічний матеріал',
      'Однотонні та металізовані кольори',
      'Стійкість до високих температур прання',
      'Підходить для спортивного одягу',
    ],
    items: ['Термоперенос стандарт', 'Флекс термоперенос', 'Флекс металізований'],
    price: 'від 45 грн',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
  },
  {
    id: 'wide',
    icon: Maximize,
    title: 'Широкоформатний друк',
    tagline: 'Друк банерів та зовнішньої реклами будь-яких розмірів',
    description: 'Широкоформатний друк на банерній тканині, плівці та папері для зовнішньої і внутрішньої реклами. СТІ кадри, високі роздільні здатності та стійкі до погодних умов матеріали.',
    features: [
      'Друк на банері, плівці, папері',
      'Ламінування та обробка країв',
      'Стійкість до вологи та УФ',
      'Розміри від А1 до необмежених',
    ],
    items: ['Широкоформатний банер', 'Офсетні афіші', 'Постери та плакати'],
    price: 'від 180 грн',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
  },
  {
    id: 'vinyl',
    icon: Scissors,
    title: 'Плотерна різка вінілу',
    tagline: 'Точна різка вінілових плівок будь-якої форми та складності',
    description: 'Плотерна різка вінілу для наклейок, декору, трафаретів та вітрин. Високоточне обладнання забезпечує чисті лінії точного контуру з можливістю мікро-деталей.',
    features: [
      'Точна різка за контуром',
      'Наклейки будь-якої форми',
      'Плівки для інтер\'єру та екстер\'єру',
      'Стійкість до вологи та сонця',
    ],
    items: ['Наклейки', 'Декор для інтер\'єру', 'Трафарети'],
    price: 'від 30 грн',
    image: 'https://images.unsplash.com/photo-1620641788421-6a9c9c3c8b8c?w=800&q=80',
  },
  {
    id: 'apparel',
    icon: Shirt,
    title: 'Брендування одягу',
    tagline: 'Готовий одяг з вашим принтом від ескізу до готового виробу',
    description: 'Брендування готового одягу за допомогою DTF, сублімації, флексу та вишивки. Працюємо з приватними замовниками та корпоративним сегментом — від макету до готового виробу.',
    features: [
      'Друк на готових виробах',
      'Малі та великі тиражі',
      'Корпоративні та робочі форми',
      'Гнучка система знижок',
    ],
    items: ['Футболки', 'Худі та світшоти', 'Робочий одяг'],
    price: 'від 95 грн',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
  },
];

export default function Services() {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <nav className="flex items-center gap-1 text-xs text-primary-foreground/70 mb-5">
              <Link to="/" className="hover:text-white transition-colors">Головна</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white font-medium">Послуги</span>
            </nav>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">Послуги друку та брендування</h1>
            <p className="text-lg text-primary-foreground/85 max-w-2xl">
              Повний цикл друкарських послуг — від плівок в рулонах до брендування готового одягу.
              Виберіть послугу, щоб ознайомитись з деталями та замовити.
            </p>
          </div>
        </section>

        {/* Service tabs */}
        <section className="border-b border-border bg-card sticky top-0 z-10 shadow-sm">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="flex gap-1 overflow-x-auto py-2 -mb-px">
              {SERVICES.map((s, idx) => {
                const Icon = s.icon;
                const isActive = idx === active;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(idx)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                      isActive
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {s.title}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Active service landing */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="relative rounded-2xl overflow-hidden shadow-lg order-1 lg:order-1">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-80 object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-sm">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
              </div>

              <div className="order-2">
                <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-2">{service.price}</p>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{service.title}</h2>
                <p className="text-sm text-muted-foreground mb-4">{service.tagline}</p>
                <p className="text-sm text-foreground/80 leading-relaxed mb-5">{service.description}</p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mb-6">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Що входить:</p>
                  <div className="flex flex-wrap gap-2">
                    {service.items.map((item) => (
                      <span key={item} className="text-xs font-medium bg-muted text-foreground px-3 py-1.5 rounded-full">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Link to="/contacts">
                    <Button size="lg" className="font-bold px-7 shadow">
                      Замовити послугу <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                  <a href="tel:+380739338895">
                    <Button size="lg" variant="outline" className="font-semibold px-7">
                      <Phone className="w-4 h-4 mr-2" />
                      Подзвонити
                    </Button>
                  </a>
                </div>
                <a href="#" className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mt-4 font-medium">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Задати питання менеджеру в Telegram
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* All services grid */}
        <section className="py-12 bg-muted/40">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="text-center mb-8">
              <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">Повний перелік</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Всі послуги</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICES.map((s, idx) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => { setActive(idx); window.scrollTo({ top: 260, behavior: 'smooth' }); }}
                    className="group text-left bg-card border rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-3">{s.tagline}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border/60">
                      <span className="text-sm font-bold text-primary">{s.price}</span>
                      <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-background">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-10 text-primary-foreground text-center shadow-xl">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">Не знайшли потрібну послугу?</h2>
              <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
                Маємо ще більше технологій та матеріалів. Звертайтесь — підберемо рішення під ваш запит.
              </p>
              <Link to="/contacts">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-8 shadow">
                  Зв'язатись з нами
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}