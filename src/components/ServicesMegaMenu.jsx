import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Printer,
  Sun,
  Shirt,
  Maximize2,
  Flame,
  BookOpen,
  ChevronRight,
} from 'lucide-react';

const SERVICE_CATEGORIES = [
  {
    title: 'ДТФ друк',
    icon: Printer,
    description: 'Преміум друк на плівці для будь-яких тканин',
    link: '/dtf-print',
    subcategories: [
      { label: 'ДТФ друк в рулонах', link: '/dtf-print' },
      { label: 'Преміум ДТФ плівка', link: '/dtf-print' },
      { label: 'Золота фольга ДТФ', link: '/dtf-print' },
      { label: 'Срібло глітер ДТФ', link: '/dtf-print' },
    ],
  },
  {
    title: 'УФ ДТФ друк',
    icon: Sun,
    description: 'Друк високої стійкості для твердих поверхонь',
    link: '/catalog',
    subcategories: [
      { label: 'Преміум УФ ДТФ плівка', link: '/catalog' },
      { label: 'Золота УФ ДТФ плівка', link: '/catalog' },
      { label: 'Срібна УФ ДТФ плівка', link: '/catalog' },
    ],
  },
  {
    title: 'Сублімаційний друк',
    icon: Shirt,
    description: 'Яскраві кольори на тканинах та сувенірах',
    link: '/catalog',
    subcategories: [
      { label: 'На футболках', link: '/catalog' },
      { label: 'На кружках', link: '/catalog' },
      { label: 'На кепках', link: '/catalog' },
    ],
  },
  {
    title: 'Широкоформатний друк',
    icon: Maximize2,
    description: 'Банери, плакати, вивіски будь-яких розмірів',
    link: '/catalog',
    subcategories: [
      { label: 'Банери', link: '/catalog' },
      { label: 'Самоклеючі плівки', link: '/catalog' },
      { label: 'Плакати', link: '/catalog' },
    ],
  },
  {
    title: 'Термоперенос',
    icon: Flame,
    description: 'Нанесення логотипів та зображень на тканину',
    link: '/catalog',
    subcategories: [
      { label: 'Флекс плівки', link: '/catalog' },
      { label: 'Флок плівки', link: '/catalog' },
    ],
  },
  {
    title: 'Взірці',
    icon: BookOpen,
    description: 'Замовте зразки для оцінки якості',
    link: '/catalog',
    subcategories: [
      { label: 'Папка з взірцями DTF та UV DTF', link: '/catalog' },
      { label: 'Взірці УФ ДТФ плівки', link: '/catalog' },
      { label: 'Взірці ДТФ плівки', link: '/catalog' },
    ],
  },
];

export default function ServicesMegaMenu({ onClose }) {
  const [activeCategory, setActiveCategory] = useState(SERVICE_CATEGORIES[0]);

  return (
    <div className="absolute top-full left-0 mt-1 w-[680px] rounded-2xl overflow-hidden shadow-2xl z-50 bg-[#025a73]/95 backdrop-blur-md border border-white/10 text-white">
      <div className="flex">
        {/* Left: category list */}
        <div className="w-56 bg-black/20 p-3 flex flex-col gap-1">
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory.title === cat.title;
            return (
              <button
                key={cat.title}
                onMouseEnter={() => setActiveCategory(cat)}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
                  isActive
                    ? 'bg-white/15 text-white'
                    : 'hover:bg-white/10 text-white/70 hover:text-white'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isActive ? 'bg-yellow-400/20' : 'bg-white/5 group-hover:bg-white/10'
                }`}>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-yellow-400' : 'text-white/60 group-hover:text-white'}`} />
                </div>
                <span className="text-sm font-medium leading-tight">{cat.title}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-yellow-400" />}
              </button>
            );
          })}
        </div>

        {/* Right: subcategories panel */}
        <div className="flex-1 p-5">
          {activeCategory && (
            <>
              <div className="mb-4 pb-3 border-b border-white/10">
                <h3 className="font-bold text-white text-base">{activeCategory.title}</h3>
                <p className="text-white/60 text-xs mt-0.5">{activeCategory.description}</p>
              </div>
              <ul className="space-y-1">
                {activeCategory.subcategories.map((sub) => (
                  <li key={sub.label}>
                    <Link
                      to={sub.link}
                      onClick={onClose}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/50 group-hover:bg-yellow-400 transition-colors shrink-0" />
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to={activeCategory.link}
                onClick={onClose}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
              >
                Переглянути всі <ChevronRight className="w-3 h-3" />
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}