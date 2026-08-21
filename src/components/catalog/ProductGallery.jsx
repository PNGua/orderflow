import React, { useState } from 'react';

export default function ProductGallery({ product }) {
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  // Build a media list: images first, then optional video appended as a special item.
  const media = [
    ...images.map((src) => ({ type: 'image', src })),
    ...(product.video ? [{ type: 'video', src: product.video }] : []),
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const active = media[activeIndex] || media[0];

  return (
    <div className="flex flex-col">
      {/* Main media */}
      <div className="bg-muted border rounded-2xl overflow-hidden min-h-72 lg:min-h-[420px] flex items-center justify-center">
        {active.type === 'video' ? (
          <video
            src={active.src}
            controls
            className="w-full h-full min-h-72 lg:min-h-[420px] object-cover bg-black"
          />
        ) : (
          <img
            src={active.src}
            alt={product.title}
            className="w-full h-full min-h-72 lg:min-h-[420px] object-cover"
          />
        )}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
            {product.tag}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      <div className="mt-3 grid grid-cols-4 sm:grid-cols-5 gap-2.5">
        {media.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                isActive ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
              }`}
            >
              {item.type === 'video' ? (
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/80 text-primary-foreground">
                  <span className="w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center">
                    <span className="ml-0.5 border-y-5 border-y-transparent border-l-8 border-l-white" />
                  </span>
                </span>
              ) : (
                <img src={item.src} alt={`${product.title} ${idx + 1}`} className="w-full h-full object-cover" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}