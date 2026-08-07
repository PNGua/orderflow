import React from 'react';
import TechnologyLanding from '@/components/TechnologyLanding';

export default function WideFormatPrint() {
  return (
    <TechnologyLanding
      title="Широкоформатний друк"
      subtitle="Large Format"
      badge="Будь-які розміри"
      image="https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=900&q=85"
      description={
        "Широкоформатний друк — рішення для зовнішньої та внутрішньої реклами будь-яких розмірів. Друк на банерній тканині, самоклейній плівці, Backlit та папері з високою стійкістю до ультрафіолету та атмосферних впливів. Застосовується для білбордів, світлових коробів, вітрин, виставок та оформлення інтер'єрів."
      }
      features={[
        { text: 'Будь-які розміри' },
        { text: 'Внутрішня та зовнішня реклама' },
        { text: 'Стійкість до УФ' },
        { text: 'Банер, плівка, Backlit' },
      ]}
      notes={[
        'Доступні ламінування та підсилення країв. Типи носіїв підбираються за експлуатаційними умовами (вулична/внутрішня).',
      ]}
      pricePerSqm={180}
      minPrice={175}
      minWidth={0.5}
    />
  );
}