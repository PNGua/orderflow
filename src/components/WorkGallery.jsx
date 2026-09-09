import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

export default function WorkGallery({ title = 'Галерея робіт', subtitle, images = [] }) {
  const [active, setActive] = useState(null);

  if (!images.length) return null;

  const close = () => setActive(null);
  const prev = (e) => {
    e.stopPropagation();
    setActive((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e.stopPropagation();
    setActive((i) => (i + 1) % images.length);
  };

  return (
    <section className="py-14">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-2">
          <Images className="w-6 h-6 text-primary" />
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{title}</h2>
        </div>
        {subtitle && <p className="text-muted-foreground mb-8 max-w-2xl">{subtitle}</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border bg-muted shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={src}
                alt={`Робота ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/15 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Закрити"
          >
            <X className="w-5 h-5" />
          </button>
          <button
            onClick={prev}
            className="absolute left-2 sm:left-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Попереднє"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <img
            src={images[active]}
            alt={`Робота ${active + 1}`}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            onClick={next}
            className="absolute right-2 sm:right-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Наступне"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-white/10 px-3 py-1 rounded-full">
            {active + 1} / {images.length}
          </span>
        </div>
      )}
    </section>
  );
}