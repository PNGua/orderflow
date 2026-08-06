import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Printer, ChevronRight, ChevronDown } from 'lucide-react';

const SERVICE_CATEGORIES = [
  {
    title: 'ДТФ друк',
    cat: 'dtf',
    icon: Printer,
    link: '/catalog?cat=dtf',
    groups: [
      {
        title: 'ДТФ друк в рулонах',
        link: '/catalog?cat=dtf',
        items: [
          { label: 'ДТФ плівка преміум', link: '/dtf-print' },
          { label: 'ДТФ плівка золота фольга', link: '/dtf-print', highlight: true },
          { label: 'ДТФ плівка золото глітер', link: '/dtf-print' },
          { label: 'ДТФ плівка срібло глітер', link: '/dtf-print' },
          { label: 'ДТФ плівка хамелеон/глітер', link: '/dtf-print' },
          { label: 'ДТФ плівка люмінісцентна', link: '/dtf-print' },
          { label: 'ДТФ плівка рефлектив', link: '/dtf-print' },
        ],
      },
    ],
  },
  {
    title: 'УФ ДТФ друк',
    cat: 'uv_dtf',
    icon: Printer,
    link: '/catalog?cat=uv_dtf',
    groups: [
      {
        title: 'УФ ДТФ друк в рулонах',
        link: '/catalog?cat=uv_dtf',
        items: [
          { label: 'Преміум УФ ДТФ плівка', link: '/dtf-print' },
          { label: 'Золота УФ ДТФ плівка', link: '/dtf-print' },
          { label: 'Срібна УФ ДТФ плівка', link: '/dtf-print' },
        ],
      },
    ],
  },
  {
    title: 'Взірці',
    cat: 'samples',
    icon: Printer,
    link: '/catalog?cat=samples',
    groups: [
      {
        title: 'Взірці',
        link: '/catalog?cat=samples',
        items: [
          { label: 'Папка з взірцями DTF та UV DTF', link: '/dtf-print' },
          { label: 'Взірці УФ ДТФ друку та плівки', link: '/dtf-print' },
          { label: 'Взірці DTF друку та плівки', link: '/dtf-print' },
        ],
      },
    ],
  },
];

export default function ServicesMegaMenu({ onClose }) {
  const [openCategory, setOpenCategory] = useState(SERVICE_CATEGORIES[0]);

  return (
    <div className="absolute top-full left-0 mt-1 w-full sm:w-[720px] sm:max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl z-50 bg-white border border-slate-200 text-foreground">
      {/* Mobile / vertical accordion layout */}
      <div className="sm:hidden">
        {SERVICE_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isOpen = openCategory?.title === cat.title;
          return (
            <div key={cat.title} className="border-b border-slate-100 last:border-b-0">
              <button
                onClick={() => setOpenCategory(isOpen ? null : cat)}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left transition-colors ${
                  isOpen ? 'bg-primary/10 text-primary' : 'hover:bg-slate-50 text-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isOpen ? 'bg-primary/15' : 'bg-slate-100'}`}>
                  <Icon className={`w-4 h-4 ${isOpen ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <span className="text-sm font-medium flex-1">{cat.title}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-4 pb-3 bg-slate-50/60">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wide text-primary">{cat.title}</span>
                    <Link
                      to={cat.link}
                      onClick={onClose}
                      className="inline-flex items-center gap-1 text-xs text-primary hover:underline font-medium"
                    >
                      Переглянути всі <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                  {cat.groups.map((group) => (
                    <div key={group.title} className="mt-2">
                      <Link
                        to={group.link}
                        onClick={onClose}
                        className="block text-[11px] font-bold uppercase tracking-wide text-primary hover:underline mb-1.5"
                      >
                        {group.title}
                      </Link>
                      <ul className="space-y-0.5">
                        {group.items.map((item) => (
                          <li key={item.label}>
                            <Link
                              to={item.link}
                              onClick={onClose}
                              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-all ${
                                item.highlight
                                  ? 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
                                  : 'text-muted-foreground hover:text-foreground hover:bg-white'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${item.highlight ? 'bg-cyan-500' : 'bg-slate-300'} shrink-0`} />
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Desktop: two-column layout */}
      <div className="hidden sm:flex">
        {/* Left: category list */}
        <div className="w-52 bg-slate-50 p-3 flex flex-col gap-1 border-r border-slate-200">
          {SERVICE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = openCategory?.title === cat.title;
            return (
              <button
                key={cat.title}
                onMouseEnter={() => setOpenCategory(cat)}
                onClick={() => setOpenCategory(cat)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-slate-100 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isActive ? 'bg-primary/15' : 'bg-slate-200 group-hover:bg-slate-300'
                }`}>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <span className="text-sm font-medium leading-tight">{cat.title}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-primary" />}
              </button>
            );
          })}
        </div>

        {/* Right: items */}
        <div className="flex-1 p-5 min-h-[340px]">
          {openCategory && (
            <>
              <div className="mb-4 pb-3 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-foreground text-base">{openCategory.title}</h3>
                  <p className="text-muted-foreground text-xs mt-0.5">Оберіть продукцію</p>
                </div>
                <Link
                  to={openCategory.link}
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium transition-colors"
                >
                  Переглянути всі <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-1 gap-x-5 gap-y-1">
                {openCategory.groups.map((group) => (
                  <div key={group.title}>
                    <Link
                      to={group.link}
                      onClick={onClose}
                      className="block text-xs font-bold uppercase tracking-wide text-primary hover:underline mb-2 transition-colors"
                    >
                      {group.title}
                    </Link>
                    <ul className="space-y-0.5">
                      {group.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.link}
                            onClick={onClose}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-all ${
                              item.highlight
                                ? 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100'
                                : 'text-muted-foreground hover:text-foreground hover:bg-slate-100'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${item.highlight ? 'bg-cyan-500' : 'bg-slate-300'} shrink-0`} />
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}