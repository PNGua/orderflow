import React from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Олександр Коваль',
    company: 'Рекламна агенція "Арт-Медіа"',
    text: 'Замовляємо ДТФ плівку вже понад рік. Якість на висоті, терміни дотримуються. Менеджери завжди на зв\'язку — рекомендуємо всім партнерам.',
    rating: 5,
    avatar: 'ОК',
  },
  {
    name: 'Наталія Шевченко',
    company: 'Швейна майстерня "Стиль"',
    text: 'Перейшли на PNG Druk після довгих пошуків якісного постачальника. Принти яскраві, стійкі до прання. Клієнти задоволені — ми теж!',
    rating: 5,
    avatar: 'НШ',
  },
  {
    name: 'Ігор Бондаренко',
    company: 'Власний бізнес з мерчу',
    text: 'Замовляв банери та сублімацію. Все виконано вчасно і якісно. Буду замовляти ще — відмінна ціна за таку якість.',
    rating: 5,
    avatar: 'ІБ',
  },
  {
    name: 'Марина Дяченко',
    company: 'Друкарня "Колір"',
    text: 'Дуже задоволена співпрацею. УФ ДТФ в рулонах — це саме те, що нам потрібно для нашого виробництва. Швидко і без зайвих питань.',
    rating: 5,
    avatar: 'МД',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-14 bg-muted/40">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-xs text-[#037291] font-semibold uppercase tracking-widest mb-1">Що кажуть клієнти</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Відгуки клієнтів</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-card border rounded-xl p-5 shadow-sm flex flex-col gap-3">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <div className="w-9 h-9 rounded-full bg-[#037291]/10 text-[#037291] flex items-center justify-center text-xs font-bold shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}