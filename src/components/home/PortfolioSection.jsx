import React, { useState } from 'react';
import { ZoomIn, X } from 'lucide-react';

const PORTFOLIO = [
  { id: 1, src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', label: 'ДТФ друк на футболці' },
  { id: 2, src: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&q=80', label: 'Сублімація на тканині' },
  { id: 3, src: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80', label: 'Широкоформатний банер' },
  { id: 4, src: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80', label: 'Термоперенос флекс' },
  { id: 5, src: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80', label: 'Друк на одязі' },
  { id: 6, src: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&q=80', label: 'Сублімація на кружках' },
];

export default function PortfolioSection() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section className="py-14 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <div className="text-center mb-10">
          <p className="text-xs text-[#037291] font-semibold uppercase tracking-widest mb-1">Наші роботи</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Галерея / Портфоліо</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PORTFOLIO.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-zoom-in rounded-xl overflow-hidden aspect-square border shadow-sm"
              onClick={() => setLightbox(item)}
            >
              <img src={item.src} alt={item.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 p-2">
                <ZoomIn className="w-5 h-5 text-white" />
                <span className="text-white text-xs text-center font-medium">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors">
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.label} className="w-full rounded-xl shadow-2xl" />
            <p className="text-white text-center mt-3 font-medium">{lightbox.label}</p>
          </div>
        </div>
      )}
    </section>
  );
}