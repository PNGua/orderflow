import React from 'react';
import TechnologyLanding from '@/components/TechnologyLanding';

export default function HeatTransferPrint() {
  return (
    <TechnologyLanding
      title="Термоперенос"
      subtitle="Heat Transfer"
      badge="Швидкий тираж"
      image="https://images.unsplash.com/photo-1562157873-818bc0726f68?w=900&q=85"
      description={
        "Термоперенос — класична технологія нанесення зображення та однотонних логотипів на текстиль за допомогою термоплівки (флекс, флок, металік). Швидке виготовлення, чіткі лінії та висока стійкість до прання роблять її оптимальною для невеликих та середніх тиражів: клуби, командна форма, корпоративний одяг, номери."
      }
      features={[
        { text: 'Однотонні принти' },
        { text: 'Швидкий тираж' },
        { text: 'Флекс, флок, металік' },
        { text: 'Стійкість до прання' },
      ]}
      notes={[
        'Для багатокольорових малюнків рекомендуємо ДТФ. Термоперенос оптимальний для 1–3 кольорів.',
      ]}
      pricePerSqm={280}
      minPrice={175}
      minWidth={0.3}
    />
  );
}