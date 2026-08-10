import React, { useEffect } from 'react';
import { X, CloudUpload, Shapes, Phone } from 'lucide-react';

export default function LayoutUploadModal({ open, onClose, onUploadClick, uploading }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="relative w-full max-w-3xl bg-card rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted transition-colors"
          aria-label="Закрити"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-6 pt-6 pb-2">
          <h2 className="text-xl font-bold text-foreground">Чи є у Вас макети до друку?</h2>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={onUploadClick}
            disabled={uploading}
            className="flex flex-col items-center text-center gap-3 border-2 border-border rounded-2xl p-6 hover:border-primary hover:bg-primary/5 transition-colors disabled:opacity-50"
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
      </div>
    </div>
  );
}