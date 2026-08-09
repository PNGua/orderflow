import React from 'react';
import { Youtube } from 'lucide-react';

export default function YoutubeVideoPlaceholder({ title }) {
  return (
    <div className="aspect-video rounded-2xl border bg-muted/40 flex flex-col items-center justify-center gap-3 p-6 text-center">
      <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
        <Youtube className="w-7 h-7 text-destructive" />
      </div>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground mt-1">Відео з YouTube буде додано незабаром</p>
      </div>
    </div>
  );
}