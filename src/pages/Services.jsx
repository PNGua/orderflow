import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, CheckCircle2, Phone, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SERVICES = [
  {
    id: 'dtf',
    title: 'ДТФ друк',
    tagline: 'Преміальний повноколірний друк на плівці для перенесення на будь-які тканини',
    description: 'Професійний DTF друк у рулонах для подальшого перенесення на вашому обладнанні. Преміум-плівки, ексклюзивні ефекти (глітер, фольга, хамелеон, люмінесцентна) — для друкарень, швейних підприємств та рекламних агенцій.',
    features: [
      'Повноколірний фотодрук на білому тлі',
      'Ексклюзивні плівки: золото, глітер, хамелеон',
      'Стійкість до прання та розтягнення',
      'Продаж у рулонах та виконання під ключ',
    ],
    price: 'від 175 грн',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    landing: '/dtf-print',
  },
  {
    id: 'uv-dtf',
    title: 'УФ ДТФ друк',
    tagline: 'Об’ємний 3D-друк на плівці без термонанесення',
    description: 'UV DTF друк створює рельєфне покриття, яке переноситься на тверду поверхню — скло, пластик, метал, деревину — без праски. Ідеально для сувенірів, бирок, упаковки та декору.',
    features: [
      'Високий рельєф та глянцева поверхня',
      'Перенесення без нагрівання',
      'Стійкість до подряпин і вологи',
      'Преміум УФ плівки: прозора, золота, срібна',
    ],
    price: 'від 220 грн',
    image: 'https://images.unsplash.com/photo-1611532736597-2af5c1c9bb19?w=800&q=80',
    landing: '/contacts',
  },
  {
    id: 'sublimation',
    title: 'Сублімаційний друк',
    tagline: 'Яскравий повноколірний друк на синтетичних тканинах та сувенірах',
    description: 'Сублімація переносить фотографічну якість на synthetic тканини, кераміку та сувеніри. Барвисті, насичені кольори, що не вигорають і не тріскаються з часом.',
    features: [
      'Стійкість до прання та УФ',
      'Повноколірний фотографічний друк',
      'Дрібні деталі та плавні переходи',
      'Екологічні чорнила без запаху',
    ],
    price: 'від 210 грн',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80',
    landing: '/contacts',
  },
  {
    id: 'thermotransfer',
    title: 'Термоперенос та флекс',
    tagline: 'Однотонні логотипи та написи з довговічним еластичним матеріалом',
    description: 'Класичний термоперенос і флекс — ідеальний вибір для чітких однотонних логотипів, написів та номерів на спортивний та робочий одяг. Стійкий до інтенсивних навантажень.',
    features: [
      'Еластичний і довговічний матеріал',
      'Однотонні та металізовані кольори',
      'Стійкість до високих температур прання',
      'Підходить для спортивного одягу',
    ],
    price: 'від 45 грн',
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=80',
    landing: '/contacts',
  },
  {
    id: 'wide',
    title: 'Широкоформатний друк',
    tagline: 'Друк банерів та зовнішньої реклами будь-яких розмірів',
    description: 'Широкоформатний друк на банерній тканині, плівці та папері для зовнішньої і внутрішньої реклами. Стійкі до погодних умов матеріали та високі роздільні здатності.',
    features: [
      'Друк на банері, плівці, папері',
      'Ламінування та обробка країв',
      'Стійкість до вологи та УФ',
      'Розміри від А1 до необмежених',
    ],
    price: 'від 180 грн',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
    landing: '/contacts',
  },
  {
    id: 'apparel',
    title: 'Брендування одягу',
    tagline: 'Готовий одяг з вашим принтом від ескізу до готового виробу',
    description: 'Брендування готового одягу за допомогою DTF, сублімації, флексу та вишивки. Працюємо з приватними замовниками та корпоративним сегментом — від макету до готового виробу.',
    features: [
      'Друк на готових виробах',
      'Малі та великі тиражі',
      'Корпоративні та робочі форми',
      'Гнучка система знижок',
    ],
    price: 'від 95 грн',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80',
    landing: '/contacts',
  },
];

export default function Services() {
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
              Повний цикл друкарських послуг — від плівок у рулонах до брендування готового одягу.
              Оберіть послугу, щоб перейти на її сторінку з деталями та замовленням.
            </p>
          </div>
        </section>

        {/* Service blocks */}
        <section className="py-14">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {SERVICES.map((s) => (
                <article
                  key={s.id}
                  className="group bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                >
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                      <span className="text-sm font-bold text-primary">{s.price}</span>
                    </div>
                    <h2 className="absolute bottom-4 left-5 right-5 text-2xl font-bold text-white drop-shadow-sm">
                      {s.title}
                    </h2>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-muted-foreground mb-3">{s.tagline}</p>
                    <p className="text-sm text-foreground/80 leading-relaxed mb-4">{s.description}</p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-6">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground/80">{f}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto flex flex-wrap items-center gap-3">
                      <Link to={s.landing}>
                        <Button className="font-semibold px-6 shadow group-hover:gap-2 transition-all">
                          Перейти на сторінку послуги
                          <ArrowRight className="w-4 h-4 ml-1.5 transition-all" />
                        </Button>
                      </Link>
                      <a href="tel:+380739338895" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5 font-medium">
                        <Phone className="w-3.5 h-3.5" />
                        Консультація
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 bg-muted/40">
          <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-10 text-primary-foreground text-center shadow-xl">
              <h2 className="text-2xl lg:text-3xl font-bold mb-3">Не знайшли потрібну послугу?</h2>
              <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
                Маємо ще більше технологій та матеріалів. Звертайтесь — підберемо рішення під ваш запит.
              </p>
              <Link to="/contacts">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-8 shadow">
                  Зв'язатись з нами <ArrowUpRight className="w-4 h-4 ml-1.5" />
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