import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Яка мінімальна кількість для замовлення ДТФ друку?',
    a: 'Мінімальне замовлення — від 1 шт. Ми працюємо як з малими тиражами, так і з великими партіями.',
  },
  {
    q: 'Які формати файлів прийнятні для друку?',
    a: 'Приймаємо файли у форматах PNG, PDF, AI, PSD, CDR. Роздільна здатність — не менше 150 dpi для ДТФ.',
  },
  {
    q: 'Скільки часу займає виготовлення замовлення?',
    a: 'Стандартний термін виготовлення — 1–3 робочих дні. Є можливість термінового виконання за 24 години (+30%).',
  },
  {
    q: 'Як відбувається доставка готового замовлення?',
    a: 'Доставляємо по всій Україні через Нову Пошту, Укрпошту або кур\'єром. Самовивіз доступний у Львові та Києві.',
  },
  {
    q: 'Чи надаєте знижки постійним клієнтам?',
    a: 'Так! Для постійних клієнтів, рекламних агенцій і виробників одягу діє гнучка система знижок від 5% до 20%.',
  },
  {
    q: 'Чи можна замовити зразки перед великим тиражем?',
    a: 'Звичайно. Ви можете замовити тестовий зразок, щоб оцінити якість перед великою партією.',
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-14 bg-muted/40">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-xs text-[#037291] font-semibold uppercase tracking-widest mb-1">Маєте питання?</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Часті запитання</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-card border rounded-xl overflow-hidden shadow-sm">
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-muted/30 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-semibold text-foreground text-sm">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}