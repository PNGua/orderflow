import React from 'react';
import { FileText, Settings, Truck, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    icon: FileText,
    step: '01',
    title: 'Залиште заявку',
    text: 'Заповніть форму замовлення або зв\'яжіться з менеджером. Вкажіть розміри, матеріал і бажаний термін.',
  },
  {
    icon: Settings,
    step: '02',
    title: 'Підготовка макету',
    text: 'Надішліть готовий макет або замовте розробку у нашого дизайнера. Перевіримо файл і підтвердимо.',
  },
  {
    icon: CheckCircle2,
    step: '03',
    title: 'Виготовлення',
    text: 'Друкуємо з використанням сучасного обладнання. Контроль якості на кожному етапі виробництва.',
  },
  {
    icon: Truck,
    step: '04',
    title: 'Доставка',
    text: 'Відправляємо по всій Україні або передаємо на самовивіз у Львові чи Києві. Надаємо ТТН для відстеження.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-14 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-xs text-[#037291] font-semibold uppercase tracking-widest mb-1">Просто і зрозуміло</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Як це працює</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop only) */}
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-[#037291]/20 z-0" />
          {STEPS.map(({ icon: Icon, step, title, text }, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#037291]/10 rounded-full flex flex-col items-center justify-center mb-4 border-2 border-[#037291]/20 relative">
                <Icon className="w-7 h-7 text-[#037291]" />
                <span className="absolute -top-2 -right-2 bg-[#037291] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}