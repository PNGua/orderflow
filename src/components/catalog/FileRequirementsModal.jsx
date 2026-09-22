import React, { useState, useEffect } from 'react';
import { FileCheck, ListChecks, X } from 'lucide-react';

const TABS = [
  { key: 'requirements', label: 'Технічні вимоги', icon: FileCheck },
  { key: 'instructions', label: 'Інструкція з підготовки', icon: ListChecks },
];

const REQUIREMENTS = [
  { label: 'Формати файлів', value: 'TIFF, PSD, PDF, PNG, JPG' },
  { label: 'Колірна модель', value: 'CMYK (не RGB)' },
  { label: 'Роздільна здатність', value: '150–300 dpi для оригінального розміру' },
  { label: 'Випуск під обріз (bleed)', value: '2–5 мм з кожного боку' },
  { label: 'Шрифти', value: 'Перетворені в криві (outlines)' },
  { label: 'Масштаб', value: '1:1 до фактичного розміру друку' },
  { label: 'Товщина ліній', value: 'не менше 0,25 pt' },
  { label: 'Фон', value: 'Прозорий (PNG/TIFF) для принтів на тканині' },
];

const INSTRUCTIONS = [
  'Створіть макет у професійному редакторі (Illustrator, Photoshop, CorelDRAW) у потрібному форматі.',
  'Переведіть колірну модель у CMYK — це запобіжить зсуву кольорів після друку.',
  'Перетворіть усі шрифти в криві (outlines), щоб текст зберігся коректно.',
  'Додайте випуск під обріз (2–5 мм) з кожного боку за межами робочої області.',
  'Перевірте роздільну здатність: 150–300 dpi для оригінального розміру друку.',
  'Збережіть файл у форматі TIFF, PSD, PDF або PNG (прозорий фон — для принтів на тканині).',
  'Завантажте готовий макет через форму «Завантажити макет» або надішліть посилання на хмарне сховище.',
];

export default function FileRequirementsModal({ open, initialTab = 'requirements', onClose }) {
  const [tab, setTab] = useState(initialTab);

  useEffect(() => setTab(initialTab), [initialTab, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-card rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b sticky top-0 bg-card z-10">
          <div className="flex items-center gap-3">
            {TABS.map((t) => {
              const Icon = t.icon;
              const active = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-[#037291] text-white'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {t.label}
                </button>
              );
            })}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted shrink-0"
            aria-label="Закрити"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-6">
          {tab === 'requirements' ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Макет має відповідати наведеним вимогам. Якщо файл не відповідає —
                ми повідомимо та допоможемо скоригувати його перед друку.
              </p>
              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm border border-border rounded-lg">
                  <tbody>
                    {REQUIREMENTS.map((r, i) => (
                      <tr key={i} className={i % 2 ? 'bg-muted/40' : ''}>
                        <td className="px-3.5 py-2.5 font-semibold text-foreground border-b border-border last:border-0 align-top w-2/5">{r.label}</td>
                        <td className="px-3.5 py-2.5 text-muted-foreground border-b border-border last:border-0">{r.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Покрокова підготовка файлу перед завантаженням.
              </p>
              <ol className="space-y-3">
                {INSTRUCTIONS.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-[#037291] text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="text-sm text-foreground leading-relaxed pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}