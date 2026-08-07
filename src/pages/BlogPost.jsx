import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  ChevronRight,
  PlayCircle,
  Share2,
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BLOG_POSTS } from './Blog';

/* Structured content per post. Supports: heading, paragraph, image, video, quote, list. */
const CONTENT = {
  'site-guide': [
    { type: 'paragraph', text: 'PNG druk — це зручний онлайн-сервіс для оформлення друку DTF та UV DTF в рулонах. Ця інструкція допоможе вам швидко розібратися з основними можливостями сайту та самостійно оформити замовлення без дзвінків менеджеру.' },
    { type: 'heading', text: 'Реєстрація та Особистий кабінет' },
    { type: 'paragraph', text: 'Натисніть «Вхід / Реєстрація» у правому upper куті. Після реєстрації вам стають доступними історія замовлень, баланс та платники, адреси доставки й деталі менеджера.' },
    { type: 'video', src: 'https://media.base44.com/images/public/69d39217874c6fe682eac60a/bcd44447f_image.png', caption: 'Коротке відео: як оформити перше замовлення' },
    { type: 'heading', text: 'Вибір послуги та калькулятор' },
    { type: 'paragraph', text: 'Оберіть послугу у розділі «Замовити друк». Для DTF та UV DTF у рулонах використовуйте онлайн-калькулятор: введіть розміри, кількість, тип плівки — вартість розрахується автоматично.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', alt: 'Калькулятор вартості друку', caption: 'Інтерфейс калькулятора вартості' },
    { type: 'heading', text: 'Оформлення та оплата' },
    { type: 'list', items: [
      'Додайте товар у кошик і перейдіть до оформлення.',
      'Заповніть контакти, оберіть доставку (Нова Пошта, Укрпошта, кур’єр або самовивіз).',
      'Оберіть спосіб оплати — безготівковий розрахунок або з внутрішнього балансу.',
      'Після підтвердження замовлення менеджер зв’яжеться з вами для уточнення деталей.',
    ] },
    { type: 'quote', text: 'Стандартний термін виконання — 1–3 робочих дні. Термінові замовлення виконуємо з націнкою 30%.' },
  ],
  'uv-dtf-film': [
    { type: 'paragraph', text: 'UV DTF — технологія ультрафіолетового друку на спеціальній плівці з подальшим перенесенням на тверду поверхню. Вона дає яскравий, стійкий до зношування зображення без обмежень за кольорами та формою.' },
    { type: 'heading', text: 'Принцип роботи' },
    { type: 'paragraph', text: 'УФ-принтер наносить зображення на прозору плівку, після чого наноситься адгезивний шар. Готовий принт переставляється на поверхню (скло, пластик, метал) і притискається.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&q=80', alt: 'UV DTF друк', caption: 'Процес друку на UV DTF плівці' },
    { type: 'heading', text: 'Підготовка файлів' },
    { type: 'list', items: [
      'Колірна модель — CMYK, бажано з профілем для УФ-друку.',
      'Роздільна здатність — не менше 300 dpi у реальному розмірі.',
      'Тексти переведіть у криві, шрифт — не тонший за 4 pt.',
      'Для кольорових ділянок додайте «білу підкладку» в окремому шарі.',
    ] },
  ],
  'gold-silver-film': [
    { type: 'paragraph', text: 'Металізовані (золота та срібна) плівки UV DTF вимагають особливої підготовки макету, оскільки основа сама по собі є кольоровим фоном.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1200&q=80', alt: 'Золота та срібна плівка' },
    { type: 'heading', text: 'Основні правила' },
    { type: 'list', items: [
      'Уникайте плашок світлих кольорів — вони «зливатимуться» з halo-ефектом.',
      'Чорні та насичені кольори виглядають найкраще на срібній плівці.',
      'Для золотої плівки різання краще замовляти лазером.',
    ] },
    { type: 'quote', text: 'Тестовий друк обов’язковий для першої партії — металізоване покриття лягає нерівномірно за площею.' },
  ],
  'dtf-printer-guide': [
    { type: 'paragraph', text: 'Вибір DTF-принтера залежить від ваших обсягів, бюджету та спектра матеріалів, на яких ви плануєте друкувати. Розглянемо ключові параметри.' },
    { type: 'heading', text: 'Ширина друку' },
    { type: 'paragraph', text: 'Для рулонного друку в продажу найпопулярніші формати 30, 42 та 60 см. Ширший формат зручний для великих макетів, але потребує більше місця.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1510519138101-570d1dca3d6b?w=1200&q=80', alt: 'DTF принтер' },
    { type: 'heading', text: 'Піч і тип чорнил' },
    { type: 'list', items: [
      'Піч — обов’язкова для автентичного DTF; ВВ-чорнила недостатньо.',
      'Білі качалки — рекомендуємо не менше двох, щоби біла фарба не забивалася.',
      'RIP-програма має виновно підтримувати підкладку й регулювання порядку шарів.',
    ] },
  ],
  'uv-dtf-business': [
    { type: 'paragraph', text: 'UV DTF відкриває нові можливості для невеликих друкарень та рекламних агентств: персоналізація, обмежений тираж і навіть одиничні вироби без виготовлення форм.' },
    { type: 'video', src: 'https://media.base44.com/images/public/69d39217874c6fe682eac60a/bcd44447f_image.png', caption: 'Як UV DTF розширює асортимент послуг' },
    { type: 'heading', text: 'Що можна пропонувати клієнту' },
    { type: 'list', items: [
      'Брендування скла та вікон у магазинах.',
      'Логотипи на техніці, авто та гаджетах.',
      'Сувенірну продукцію: кружки, флешки, брелоки.',
    ] },
    { type: 'quote', text: 'Окупність стартового комплекту UV DTF — від 4–6 місяців при стабільному потоці замовлень.' },
  ],
  'sublimation-5-reasons': [
    { type: 'paragraph', text: 'Сублімаційний друк залишається одним з найпопулярніших для синтетичних тканин та сувенірів. Ось п’ять причин обрати його.' },
    { type: 'heading', text: '1. Яскравість кольору' },
    { type: 'paragraph', text: 'Фарба проникає в структуру матеріалу, даючи насичене, фототипу зображення без відчутного шару на поверхні.' },
    { type: 'image', src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80', alt: 'Сублімаційний друк' },
    { type: 'heading', text: '2–5. Довговічність, гнучкість, екологічність, економічність' },
    { type: 'list', items: [
      'Не вигорає на сонці 2–3 роки при зовнішньому використанні.',
      'Дозволяє друкування фотографічних макетів без обмежень складності.',
      'Чорнила на водній основі — безпечні для людини та довкілля.',
      'Низька собівартість для середніх та малих тиражів.',
    ] },
  ],
};

const CATEGORY_COLORS = {
  'Інструкції': 'bg-blue-100 text-blue-700',
  'Технології': 'bg-purple-100 text-purple-700',
  'Матеріали': 'bg-yellow-100 text-yellow-700',
  'Обладнання': 'bg-green-100 text-green-700',
  'Бізнес': 'bg-orange-100 text-orange-700',
};

function Block({ block }) {
  switch (block.type) {
    case 'heading':
      return <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">{block.text}</h2>;
    case 'paragraph':
      return <p className="text-[15px] leading-7 text-muted-foreground mb-4">{block.text}</p>;
    case 'list':
      return (
        <ul className="space-y-2 mb-5 list-disc list-inside marker:text-primary">
          {block.items.map((it, i) => (
            <li key={i} className="text-[15px] leading-7 text-muted-foreground">{it}</li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote className="border-l-4 border-primary bg-primary/5 rounded-r-lg pl-5 pr-4 py-4 my-6 text-foreground italic text-[15px] leading-7">
          {block.text}
        </blockquote>
      );
    case 'image':
      return (
        <figure className="my-6 mx-auto max-w-xl rounded-xl overflow-hidden border border-border shadow-sm">
          <img src={block.src} alt={block.alt} className="w-full h-auto object-cover" />
          {block.caption && (
            <figcaption className="text-xs text-muted-foreground text-center py-2 bg-muted/40">{block.caption}</figcaption>
          )}
        </figure>
      );
    case 'video':
      return (
        <figure className="my-6 rounded-xl overflow-hidden border border-border shadow-sm">
          <video
            src={block.src}
            poster={block.poster}
            controls
            playsInline
            className="w-full h-auto bg-black"
          />
          {block.caption && (
            <figcaption className="text-xs text-muted-foreground text-center py-2 bg-muted/40">{block.caption}</figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const content = CONTENT[slug] || [{ type: 'paragraph', text: post.excerpt }];
  const catColor = CATEGORY_COLORS[post.category] || 'bg-gray-100 text-gray-700';

  const currentIdx = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const next = BLOG_POSTS[currentIdx + 1] || BLOG_POSTS[currentIdx - 1];

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-[#0a8fa8] text-white">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl py-10 lg:py-14">
          <nav className="flex items-center gap-1 text-xs text-white/70 mb-4">
            <Link to="/" className="hover:text-white">Головна</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/blog" className="hover:text-white">Блог</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium truncate">{post.title}</span>
          </nav>
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${catColor}`}>
            {post.category}
          </span>
          <h1 className="text-2xl lg:text-4xl font-bold leading-tight mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-white/80">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime} читання</span>
            {post.video && (
              <span className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full font-semibold">
                <PlayCircle className="w-3.5 h-3.5" /> Відео
              </span>
            )}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 lg:px-8 max-w-6xl py-10 flex-1">
        <article className="bg-card border border-border rounded-2xl p-6 sm:p-12 shadow-sm">
          <p className="text-lg leading-8 text-foreground font-medium mb-6">{post.excerpt}</p>
          <div>
            {post.video
              ? <Block block={{ type: 'video', src: post.video, poster: post.image, caption: 'Головне відео статті' }} />
              : <Block block={{ type: 'image', src: post.image, alt: post.title, caption: 'Ілюстрація до статті' }} />}
            {content.map((b, i) => <Block key={i} block={b} />)}
          </div>

          <div className="flex items-center justify-between border-t border-border pt-6 mt-8">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" /> Усі статті
            </Link>
            <button
              onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
              className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <Share2 className="w-4 h-4" /> Поділитися
            </button>
          </div>
        </article>

        {/* Next article */}
        {next && (
          <Link
            to={`/blog/${next.slug}`}
            className="group mt-8 flex items-center gap-4 bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative w-24 h-20 rounded-lg overflow-hidden shrink-0">
              <img src={next.image} alt={next.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              {next.video && <PlayCircle className="absolute inset-0 m-auto w-7 h-7 text-white drop-shadow" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-1">Читати далі</p>
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">{next.title}</h3>
            </div>
            <ArrowRight className="w-5 h-5 text-primary shrink-0" />
          </Link>
        )}
      </main>

      <Footer />
    </div>
  );
}