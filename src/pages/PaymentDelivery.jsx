import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Truck, ArrowRight, MapPin, Clock, Wallet } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const DELIVERY_ROWS = [
  { method: 'Доставка на таксі по Києву та Львові', tariff: 'від 100 грн', time: 'в день готовності 13:00 – 18:00' },
  { method: 'На відділення Нової пошти', tariff: 'від 80 грн', time: 'в день готовності 17:00 – 20:00' },
  { method: 'Адресна доставка Нової пошти', tariff: 'від 90 грн', time: 'в день готовності 17:00 – 20:00' },
  { method: 'Самовивіз з виробництва', tariff: 'безкоштовно', time: 'в день готовності 13:00 – 18:00' },
];

const NOTES = [
  'Виконання дизайнерських робіт здійснюється після 100% передоплати або укладання договору.',
  'Виготовлення рекламної продукції починається після повної або 50% оплати за договором.',
  'Виключно у національній валюті.',
  'Можлива лише картками, випущеними на території України.',
  'Для нерезидентів виставляємо інвойс у потрібній валюті.',
];

export default function PaymentDelivery() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-5">
            <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Оплата і доставка</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Оплата і доставка</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* PAYMENT */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Оплата</h2>
              </div>

              <h3 className="text-sm font-semibold text-foreground mb-3">Способи оплати</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>Безготівковий розрахунок</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>Онлайн на баланс, згідно розрахункового рахунку.</span>
                </li>
              </ul>

              <Block title="Оплата онлайн">
                Оплата онлайн здійснюється через платіжну систему LiqPay. Підтримуються картки Visa та Mastercard, випущені на території України.
              </Block>

              <Block title="Додавання платників в Особистому кабінеті">
                У Особистому кабінеті можна додати кількох платників (юр. особу, ФОП чи фізичну особу) і обирати потрібного при оформленні замовлення.
              </Block>

              <h3 className="text-sm font-semibold text-foreground mb-2">Поповнення балансу та оплата замовлення з нього:</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                В особистому кабінеті у вкладці «Баланс» є можливість поповнити його на довільну суму. Необхідно обрати платника (юр. особу, ФОП
                (попередньо додані платники в Особистому кабінеті) чи фізичну особу. Наш менеджер зв'яжеться з Вами та надішле документи для оплати.
                Після проведення платежу сума надійде на баланс і її можна буде використовувати для оплати замовлень. Для цього, при оформленні
                замовлення необхідно обрати «Оплату з Внутрішнього балансу» і кошти автоматично спишуться.
              </p>

              <h3 className="text-sm font-semibold text-foreground mb-3">Примітки</h3>
              <ul className="space-y-2 mb-5">
                {NOTES.map((n) => (
                  <li key={n} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>

              <a href="#" className="text-sm text-primary font-medium hover:underline inline-flex items-center gap-1">
                Договір оферти <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </section>

            {/* DELIVERY */}
            <section className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground">Доставка</h2>
              </div>

              <h3 className="text-sm font-semibold text-foreground mb-3">Основна інформація</h3>
              <div className="overflow-hidden rounded-xl border border-border mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/60 text-left">
                      <th className="px-4 py-3 font-semibold text-foreground">Спосіб доставки</th>
                      <th className="px-4 py-3 font-semibold text-foreground">Тариф</th>
                      <th className="px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Відвантаження</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DELIVERY_ROWS.map((r, i) => (
                      <tr
                        key={r.method}
                        className={`${i % 2 ? 'bg-card' : 'bg-card'} hover:bg-primary/5 transition-colors border-t border-border`}
                      >
                        <td className="px-4 py-3 text-foreground">{r.method}</td>
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{r.tariff}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{r.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground sm:hidden mb-6 -mt-3">
                Відвантаження: у день готовності ( див. таблицю на десктопі).
              </p>

              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>Обов'язково повідомте менеджера про деталі доставки — час прибуття водія, номер авто та контактний номер (при можливості).</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>Оплата таксі здійснюється клієнтом самостійно згідно з тарифами сервісу.</span>
                </li>
              </ul>

              <SubHeading>Самовивіз з виробництва</SubHeading>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                Після отримання сповіщення про готовність замовлення, є можливість самостійно забрати замовлення з виробництва у Львові чи Києві.
              </p>

              <SubHeading icon={MapPin}>Адреси виробництва:</SubHeading>
              <ul className="space-y-1.5 mb-5">
                <li className="text-sm text-muted-foreground">м. Львів, вул. Городоцька, 242</li>
                <li className="text-sm text-muted-foreground">м. Київ, вул. Машинобудівна, 44</li>
              </ul>

              <SubHeading icon={Clock}>Графік роботи:</SubHeading>
              <ul className="space-y-1.5">
                <li className="text-sm text-muted-foreground">ПН – ПТ 10:00 – 18:00</li>
                <li className="text-sm text-muted-foreground">СБ – 10:00 – 16:00 (в суботу виробництво виконується лише в одному з міст, про чергування можна дізнатися у менеджера)</li>
                <li className="text-sm text-muted-foreground">НД – вихідні</li>
              </ul>
            </section>
          </div>

          {/* Promo banner */}
          <div className="relative mt-8 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=1200&q=80"
              alt="Одяг для брендування"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative bg-foreground/75 backdrop-blur-sm px-8 py-12 sm:py-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-5">Потрібен одяг для брендування?</h2>
              <Link to="/catalog">
                <Button size="lg" className="bg-primary hover:bg-primary/90 font-bold px-8">Детальніше</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Floating contact button */}
      <Link
        to="/contacts"
        className="fixed bottom-5 left-5 z-40 w-14 h-14 rounded-full bg-violet-600 text-white shadow-lg hover:bg-violet-700 flex items-center justify-center text-center text-[9px] font-bold leading-tight"
        title="Кнопка зв'язку"
      >
        <span className="px-1 text-center">КНОПКА<br />ЗВ'ЯЗКУ</span>
      </Link>

      <Footer />
    </div>
  );
}

function Block({ title, children }) {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold text-foreground mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
}

function SubHeading({ children, icon: Icon }) {
  return (
    <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
      {Icon && <Icon className="w-4 h-4 text-primary" />}
      {children}
    </h3>
  );
}