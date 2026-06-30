import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, Search, MessageCircle, Phone } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';

const CATEGORIES = [
  {
    id: 'order',
    label: 'Замовлення',
    color: 'bg-blue-100 text-blue-700',
    faqs: [
      { q: 'Яка мінімальна кількість для замовлення ДТФ друку?', a: 'Мінімальне замовлення — від 1 шт. Ми працюємо як з малими тиражами, так і з великими партіями для виробників.' },
      { q: 'Як оформити замовлення на сайті?', a: 'Оберіть послугу в каталозі або скористайтесь калькулятором для розрахунку вартості. Після цього заповніть форму замовлення або зв\'яжіться з менеджером — і ми візьмемо все в роботу.' },
      { q: 'Чи можна замовити зразки перед великим тиражем?', a: 'Так. Ви можете замовити тестовий зразок, щоб оцінити якість перед великою партією. Вартість зразка входить до вартості наступного замовлення.' },
      { q: 'Чи надаєте знижки постійним клієнтам?', a: 'Так! Для постійних клієнтів, рекламних агенцій і виробників одягу діє гнучка система знижок від 5% до 20% залежно від обсягу.' },
      { q: 'Чи можна замовити термінове виконання?', a: 'Так, є можливість термінового виконання за 24 години з доплатою +30% від вартості замовлення. Уточнюйте наявність у менеджера.' },
    ],
  },
  {
    id: 'files',
    label: 'Файли та макети',
    color: 'bg-purple-100 text-purple-700',
    faqs: [
      { q: 'Які формати файлів прийнятні для друку?', a: 'Приймаємо файли у форматах PNG, PDF, AI, PSD, CDR. Роздільна здатність — не менше 150 dpi для ДТФ, для УФ ДТФ — від 300 dpi.' },
      { q: 'Чи потрібен білий підшар у макеті для ДТФ?', a: 'Для стандартного ДТФ — ні, підшар формується автоматично нашим програмним забезпеченням. Для УФ ДТФ на прозорій плівці підшар не потрібен взагалі.' },
      { q: 'Який колірний профіль використовувати?', a: 'Рекомендуємо RGB (sRGB IEC61966-2.1). Якщо є CMYK-макет — надсилайте, ми конвертуємо. Але для точної передачі кольорів найкраще використовувати RGB.' },
      { q: 'Чи можете ви допомогти з підготовкою макету?', a: 'Так, наш дизайнер може підготувати або адаптувати макет до вимог друку. Вартість послуги уточнюється у менеджера.' },
    ],
  },
  {
    id: 'technology',
    label: 'Технології',
    color: 'bg-green-100 text-green-700',
    faqs: [
      { q: 'Що таке ДТФ друк і чим він відрізняється від інших?', a: 'DTF (Direct-to-Film) — це технологія друку на спеціальній плівці з подальшим термоперенесенням на тканину. Перевагою є висока якість, яскравість кольорів та сумісність з будь-якими тканинами — від бавовни до синтетики.' },
      { q: 'Що таке УФ ДТФ?', a: 'UV DTF — це технологія нанесення зображення на плівку за допомогою УФ-чорнил. Плівка клеїться на тверді поверхні: кружки, пластик, метал, скло. Ідеально для брендування сувенірів.' },
      { q: 'На які тканини підходить ДТФ?', a: 'DTF підходить для бавовни, поліестеру, змішаних тканин, шкіри, нейлону. Практично будь-яка тканина — жодних обмежень за складом.' },
      { q: 'Скільки прань витримує ДТФ перенесення?', a: 'За умови правильного нанесення та догляду (прання всередину при t° до 40°C) — від 50 прань і більше без суттєвої втрати якості.' },
      { q: 'Чи можна наносити ДТФ на темні тканини?', a: 'Так, ДТФ чудово лягає на темні та чорні тканини завдяки білому підшару. Це одна з головних переваг технології.' },
    ],
  },
  {
    id: 'delivery',
    label: 'Доставка та оплата',
    color: 'bg-orange-100 text-orange-700',
    faqs: [
      { q: 'Скільки часу займає виготовлення замовлення?', a: 'Стандартний термін виготовлення — 1–3 робочих дні залежно від складності та обсягу. Термінове виконання — 24 години (+30%).' },
      { q: 'Як відбувається доставка?', a: 'Доставляємо по всій Україні через Нову Пошту, Укрпошту або кур\'єром. Самовивіз доступний у Львові (вул. Городоцька, 242) та Києві (вул. Машинобудівна, 44).' },
      { q: 'Які способи оплати доступні?', a: 'Оплата безготівкою (на розрахунковий рахунок), карткою Visa/MasterCard через LiqPay, або готівкою при самовивозі. Можлива оплата частинами (передоплата 50%).' },
      { q: 'Чи є доставка за кордон?', a: 'На жаль, наразі ми працюємо тільки по Україні. Слідкуйте за оновленнями — можливо, незабаром розширимо географію.' },
    ],
  },
];

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover:bg-muted/30 transition-colors"
        onClick={onClick}
      >
        <span className="font-semibold text-foreground text-sm">{faq.q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
          {faq.a}
        </div>
      )}
    </div>
  );
}

export default function QnA() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [openItem, setOpenItem] = useState(null);

  const allFaqs = CATEGORIES.flatMap(cat => cat.faqs.map(faq => ({ ...faq, category: cat.label, categoryId: cat.id, color: cat.color })));

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (activeCategory === 'all' && !q) return null; // show by category
    const items = q
      ? allFaqs.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
      : allFaqs.filter(f => f.categoryId === activeCategory);
    return items;
  }, [search, activeCategory]);

  const handleToggle = (key) => setOpenItem(openItem === key ? null : key);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl text-center">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">Питання та відповіді</h1>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">Знайдіть відповідь на своє запитання або зв'яжіться з нами</p>
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Пошук по запитаннях..."
              value={search}
              onChange={e => { setSearch(e.target.value); setActiveCategory('all'); setOpenItem(null); }}
              className="pl-9 bg-white text-foreground border-transparent"
            />
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl pt-5 pb-2">
        <nav className="flex items-center gap-1 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">Головна</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground font-medium">Q&A</span>
        </nav>
      </div>

      <main className="container mx-auto px-4 lg:px-8 max-w-5xl py-8 flex-1">
        {/* Category tabs */}
        {!search && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => { setActiveCategory('all'); setOpenItem(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
            >
              Всі категорії
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenItem(null); }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Search results */}
        {filtered ? (
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-medium mb-2">Нічого не знайдено</p>
                <p className="text-sm">Спробуйте інший запит або зв'яжіться з нами напряму</p>
              </div>
            ) : (
              filtered.map((faq, i) => (
                <div key={i}>
                  {search && <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${faq.color} mb-1 inline-block`}>{faq.category}</span>}
                  <FAQItem faq={faq} isOpen={openItem === `search-${i}`} onClick={() => handleToggle(`search-${i}`)} />
                </div>
              ))
            )}
          </div>
        ) : (
          /* Category view */
          <div className="space-y-10">
            {CATEGORIES.map(cat => (
              <div key={cat.id}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${cat.color}`}>{cat.label}</span>
                  <div className="flex-1 border-t border-border" />
                </div>
                <div className="space-y-3">
                  {cat.faqs.map((faq, i) => {
                    const key = `${cat.id}-${i}`;
                    return <FAQItem key={key} faq={faq} isOpen={openItem === key} onClick={() => handleToggle(key)} />;
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-14 bg-muted/50 border rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Не знайшли відповідь?</h2>
          <p className="text-sm text-muted-foreground mb-6">Зв'яжіться з нами — менеджер відповість протягом 15 хвилин</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:+380739338895" className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors">
              <Phone className="w-4 h-4" /> Зателефонувати
            </a>
            <Link to="/contacts" className="flex items-center gap-2 border border-input bg-card text-foreground px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-muted/40 transition-colors">
              <MessageCircle className="w-4 h-4" /> Написати нам
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}