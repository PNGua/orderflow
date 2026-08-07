import React from 'react';
import TechnologyLanding from '@/components/TechnologyLanding';

export default function SublimationPrint() {
  return (
    <TechnologyLanding
      title="Сублімаційний друк"
      subtitle="Dye Sublimation"
      badge="Фотоякість"
      image="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=900&q=85"
      description={
        "Сублімаційний друк — це технологія перенесення фарб у газоподібний стан під дією високої температури та тиску. Дає яскраве, фотореалістичне зображення, що проникає в структуру матеріалу та не вигорає з часом. Ідеально підходить для синтетичних тканин, сувенірної та промо-продукції: кружки, тарілки, панелі."
      }
      features={[
        { text: 'Фотореалістична якість' },
        { text: 'Без вигорання' },
        { text: 'Для синтетичних матеріалів' },
        { text: 'Сувеніри та промо' },
      ]}
      notes={[
        'Сублімація наноситься на світлі синтетичні тканини (мінімум 65% поліестеру). Темні вироби потребують попереднього покрытия.',
      ]}
      pricePerSqm={380}
      minPrice={175}
      minWidth={0.3}
    />
  );
}