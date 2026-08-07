import React from 'react';
import TechnologyLanding from '@/components/TechnologyLanding';

export default function UvDtfPrint() {
  return (
    <TechnologyLanding
      title="УФ ДТФ друк"
      subtitle="UV Direct-to-Film"
      badge="Об'ємний друк"
      image="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&q=85"
      description={
        "УФ ДТФ (UV Direct-to-Film) — інноваційна технологія ультрафіолетового друку на плівці з подальшим перенесенням на тверді поверхні. Завдяки шаруватій УФ-полімеризації фарби утворюють об'ємний рельєф із глянсовою, насиченою поверхнею, стійкою до зношування та вологи. Підходить для скла, металу, пластику, дерева та кераміки."
      }
      features={[
        { text: "Об'ємний 3D-рельєф" },
        { text: 'Глянцева поверхня' },
        { text: 'Скло, метал, пластик' },
        { text: 'Підвищена стійкість' },
      ]}
      notes={[
        'Перед завантаженням файлів переконайтесь, що макет відповідає <a href="#" class="text-primary hover:underline font-medium">технічним вимогам</a> до УФ-друку.',
      ]}
      pricePerSqm={750}
      minPrice={250}
      minWidth={0.4}
    />
  );
}