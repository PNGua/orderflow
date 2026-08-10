import React, { useEffect, useState } from 'react';
import { X, CloudUpload, Shapes, Phone } from 'lucide-react';
import { CATEGORY_LABELS } from '@/components/catalog/products';

export default function LayoutUploadModal({ open, onClose, product, total, qty = 1, onSubmit }) {
  const [step, setStep] = useState(0);
  const [layoutUrl, setLayoutUrl] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setLayoutUrl('');
    setPhone('');
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const canSubmit = layoutUrl.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit?.({ layoutUrl: layoutUrl.trim(), phone: phone.trim() });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="relative w-full max-w-3xl bg-card rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors z-10"
          aria-label="Закрити"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 0 ? (
          <>
            <div className="px-6 pt-6 pb-2">
              <h2 className="text-xl font-bold text-foreground">Чи є у Вас макети до друку?</h2>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex flex-col items-center text-center gap-3 border-2 border-border rounded-2xl p-6 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <CloudUpload className="w-12 h-12 text-primary" />
                <span className="font-bold text-foreground">Так, у мене є макети</span>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  Завантажте посилання на файлообмінник з готовими макетами розкладок
                </span>
              </button>

              <a
                href="/contacts"
                className="flex flex-col items-center text-center gap-3 border-2 border-border rounded-2xl p-6 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <Shapes className="w-12 h-12 text-muted-foreground" />
                <span className="font-bold text-foreground">Немає готових розкладок макетів для друку</span>
                <span className="text-xs text-muted-foreground leading-relaxed">
                  Зверніться за допомогою до дизайнера
                </span>
              </a>
            </div>

            <div className="px-6 pb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 text-primary" />
              <a href="tel:+380739338895" className="font-semibold text-primary hover:underline">+38 073 933 88 95</a>
            </div>
          </>
        ) : (
          <>
            <div className="px-6 pt-6 pb-2 text-center">
              <h2 className="text-xl font-bold text-foreground">Чудово, завантажте макети в форму нижче</h2>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left: link input + instructions */}
              <div className="rounded-2xl border border-[#AABBC0] bg-[#F4F9FB] p-5">
                <label className="block font-bold text-foreground mb-3">Завантажте посилання на макет</label>
                <input
                  type="url"
                  value={layoutUrl}
                  onChange={(e) => setLayoutUrl(e.target.value)}
                  placeholder="Посилання на макет"
                  className="w-full h-11 px-4 rounded-xl border border-[#AABBC0] bg-white text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />

                <div className="mt-5 text-xs text-foreground/80 leading-relaxed">
                  <p className="font-bold mb-2">Інструкція:</p>
                  <ol className="space-y-1.5 list-decimal pl-4">
                    <li>
                      Завантажте Ваш макет на{' '}
                      <a href="https://fex.net" target="_blank" rel="noreferrer" className="text-primary underline">fex.net</a>,{' '}
                      <a href="https://drive.google.com" target="_blank" rel="noreferrer" className="text-primary underline">drive.google.com</a>{' '}
                      або інший файлообмінник
                    </li>
                    <li>Скопіюйте посилання на сторінці файлообмінника</li>
                    <li>Додайте посилання в поле для посилання.</li>
                  </ol>
                </div>
              </div>

              {/* Right: order summary + submit */}
              <div className="flex flex-col">
                <h3 className="font-bold text-foreground">{product.title}</h3>
                <div className="my-3 h-px bg-border" />
                <div className="flex items-center justify-between text-sm text-foreground/80">
                  <span>Тираж: {qty} шт.</span>
                  <span className="font-bold text-foreground">Вартість: {total} грн</span>
                </div>

                <label className="mt-4 mb-1.5 text-xs font-medium text-foreground/80">Телефон для зв'язку</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+38 (063)-015-24-37"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="mt-4 w-full bg-primary text-primary-foreground rounded-xl py-3 font-semibold text-base hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground transition-colors"
                >
                  В кошик
                </button>
                <p className="mt-2 text-xs text-muted-foreground text-center">
                  {canSubmit ? `Тариф: ${product.price} грн/м² · ${CATEGORY_LABELS[product.category]}` : 'Для продовження, будь ласка, завантажте макет'}
                </p>
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  );
}