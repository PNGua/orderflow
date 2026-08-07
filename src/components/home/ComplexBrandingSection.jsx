import React, { useState } from 'react';
import { CheckCircle2, Plus, X } from 'lucide-react';

const SERVICES = [
  {
    title: 'Друк на одязі',
    text: 'Брендуємо футболки, худі, світшоти, жилети, кепки та робочий одяг. Підбираємо оптимальну технологію: DTF, шовкотрафарет або вишивка — залежно від тиражу, матеріалу та дизайну.',
  },
  {
    title: 'Брендування сувенірки',
    text: 'Наносимо логотипи та зображення на чашки, пляшки, техніку, ручки, блокноти та інші аксесуари. Створюємо цілісні комплекти промо-матеріалів.',
  },
];

const WHY_US = [
  'Повний цикл робіт — від дизайну до друку, пакування й доставки.',
  'Гнучкі умови співпраці — від одиничних до великих тиражів.',
  'Персональний менеджер — супровід і консультація на всіх етапах.',
  'Сучасне обладнання — стабільна якість і точна передача кольору.',
];

const FAQ = [
  {
    q: 'Які послуги надаєте?',
    a: 'Ми закриваємо повний цикл брендування: брендування одягу, сувенірна продукція, аксесуари, пошив під замовлення, корпоративні та welcome-набори, комплектація, пакування та логістика.',
  },
  { q: 'Чим ви відрізняєтесь від інших?', a: '' },
  { q: 'Як проходить робота?', a: '' },
  { q: 'Чи допомагаєте з дизайном?', a: '' },
  { q: 'Чи можна замовити без чіткого ТЗ?', a: '' },
  { q: 'Чи є мінімальні тиражі?', a: '' },
  { q: 'Чи можна замовити корпоративні набори?', a: '' },
  { q: 'Як формується ціна?', a: '' },
];

export default function ComplexBrandingSection() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-14 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left: text (60%) */}
          <div className="lg:col-span-3 space-y-7">
            <header className="space-y-2">
              <p className="text-sm text-muted-foreground">Сервіс комплексного брендування</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                Комплексні рішення для друку та брендування
              </h2>
            </header>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Ми створюємо бренди, які запам'ятовуються. PNG studio — це команда фахівців із друку та дизайну.
                Ми допомагаємо компаніям, агентствам і виробникам реалізовувати завдання будь-якого масштабу —
                від персоналізованого одягу до повного комплексу брендованої продукції.
              </p>
              <p>
                Наш підхід — поєднання технологій, досвіду й уваги до деталей. Ми працюємо швидко,
                зручно і з гарантією стабільної якості.
              </p>
            </div>

            {/* Our services */}
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-foreground">Наші послуги</h3>
              <div className="space-y-5">
                {SERVICES.map((s) => (
                  <div key={s.title}>
                    <h4 className="font-semibold text-foreground mb-1">{s.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                  </div>
                ))}
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Корпоративні подарунки та мерч</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Розробляємо брендовану продукцію для подій, виставок чи заходів. Підбираємо товари,
                    оформлення та пакування для впізнаваного та професійного образу.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Комплексне брендування</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Створюємо повний набір матеріалів: одяг, сувенірку, пакування, промо-матеріали та наклейки.
                    Від ідеї до реалізації — формуємо цілісний образ вашого бренду.
                  </p>
                </div>
              </div>
            </div>

            {/* Why us */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-3">Чому саме PNG studio?</h3>
              <ul className="space-y-2.5">
                {WHY_US.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <CheckCircle2 className="w-5 h-5 text-[#2D8A45] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How to order */}
            <div>
              <h3 className="text-lg font-bold text-foreground mb-2">Як замовити?</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Залиште заявку на сайті або зверніться до менеджера — ми допоможемо з вибором технології,
                макетом і розрахунком вартості. Ми працюємо з клієнтами по всій Україні: Львів, Київ, Рівне,
                Чернівці, Івано-Франківськ, Тернопіль, Луцьк та інші міста.
              </p>
            </div>
          </div>

          {/* Right: FAQ (40%) */}
          <div className="lg:col-span-2">
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-4">Найпоширеніші питання</h2>
            <div className="border-t border-border">
              {FAQ.map((item, i) => {
                const isOpen = open === i;
                return (
                  <div key={item.q} className="border-b border-border">
                    <button
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between gap-3 py-4 text-left group"
                    >
                      <span className="text-sm font-medium text-foreground">{item.q}</span>
                      <span className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center bg-muted text-foreground/70 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        {isOpen ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </span>
                    </button>
                    {isOpen && item.a && (
                      <p className="pb-4 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    )}
                    {isOpen && !item.a && (
                      <p className="pb-4 text-sm text-muted-foreground/60 italic leading-relaxed">
                        Текст відповіді незабаром з'явиться.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}