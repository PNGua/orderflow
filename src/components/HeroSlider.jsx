import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SLIDES = [
  {
    id: 1,
    badge: 'PART OF PNG GROUP · Фабрика друку',
    title: 'Друк, який',
    highlight: 'виділяє вас',
    text: 'ДТФ, сублімація, банери, термоперенос — швидко, якісно, по всій Україні. Від 175 грн.',
    bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=60',
    primaryLabel: 'Переглянути послуги',
    primaryLink: '/catalog',
    secondaryLabel: 'ДТФ друк',
    secondaryLink: '/dtf-print',
  },
  {
    id: 2,
    badge: 'ДТФ ДРУК · Преміум якість',
    title: 'ДТФ плівка',
    highlight: 'на будь-яку тканину',
    text: 'Яскраві кольори, стійкість до прання та хімчистки. Виготовлення від 1 дня.',
    bg: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1400&q=60',
    primaryLabel: 'Замовити ДТФ',
    primaryLink: '/dtf-print',
    secondaryLabel: 'Дізнатись ціну',
    secondaryLink: '/dtf-print',
  },
  {
    id: 3,
    badge: 'ШИРОКОФОРМАТНИЙ ДРУК · Реклама',
    title: 'Банери та',
    highlight: 'зовнішня реклама',
    text: 'Широкоформатний друк на банерній тканині будь-яких розмірів для реклами та брендування.',
    bg: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1400&q=60',
    primaryLabel: 'Замовити банер',
    primaryLink: '/catalog',
    secondaryLabel: 'Каталог послуг',
    secondaryLink: '/catalog',
  },
  {
    id: 4,
    badge: 'СУБЛІМАЦІЯ · Одяг та сувеніри',
    title: 'Сублімаційний',
    highlight: 'друк на одязі',
    text: 'Повноколірний друк на футболках, кружках, сублімаційних тканинах — без обмежень за кольорами.',
    bg: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=1400&q=60',
    primaryLabel: 'Переглянути послуги',
    primaryLink: '/catalog',
    secondaryLabel: 'Зв\'язатись з нами',
    secondaryLink: '/catalog',
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <section className="relative overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="relative flex-none w-full">
              {/* Background */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${slide.bg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#037291]/90 to-[#025a73]/85" />

              {/* Content */}
              <div className="relative container mx-auto px-4 lg:px-8 py-20 lg:py-28 max-w-6xl">
                <div className="max-w-2xl">
                  <span className="inline-block bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4 backdrop-blur-sm">
                    {slide.badge}
                  </span>
                  <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-5 text-white">
                    {slide.title}<br />
                    <span className="text-yellow-300">{slide.highlight}</span>
                  </h1>
                  <p className="text-white/80 text-lg mb-8 leading-relaxed max-w-lg">
                    {slide.text}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link to={slide.primaryLink}>
                      <Button size="lg" className="bg-white text-[#037291] hover:bg-white/90 font-bold px-6 shadow-lg">
                        {slide.primaryLabel}
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                    <Link to={slide.secondaryLink}>
                      <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 font-semibold px-6">
                        {slide.secondaryLabel}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows (desktop only) */}
      <button
        onClick={scrollPrev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-2 transition-all items-center justify-center"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`transition-all rounded-full ${
              i === selectedIndex ? 'bg-white w-6 h-2.5' : 'bg-white/50 w-2.5 h-2.5'
            }`}
          />
        ))}
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0" style={{ marginBottom: '-2px' }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" style={{ display: 'block' }}>
          <path d="M0 60L1440 60L1440 20C1200 60 900 0 720 20C540 40 240 0 0 20L0 60Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}