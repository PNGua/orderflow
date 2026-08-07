import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

export default function SummarySection({ form, setField, total, submitting }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">4</span>
        Додаткова інформація
      </h2>

      <div className="space-y-1.5">
        <Label className="text-sm text-foreground">Нотатки до замовлення (необов'язково)</Label>
        <Textarea
          value={form.comment}
          onChange={(e) => setField('comment', e.target.value)}
          placeholder="Нотатки до вашого замовлення, наприклад спеціальні нотатки для доставки."
          rows={4}
        />
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="confirm"
          checked={form.confirmed}
          onCheckedChange={(v) => setField('confirmed', !!v)}
          className="mt-0.5"
        />
        <Label htmlFor="confirm" className="text-xs text-foreground/90 leading-relaxed cursor-pointer">
          Підтверджую, що макет мною перевірений і не містить помилок. Розумію, що надрукована продукція точно відповідатиме цьому макету. Правила використання сайту мною прочитані. <span className="text-destructive">*</span>
        </Label>
      </div>

      {/* Total + CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4 pt-2">
        <div className="flex items-center gap-3 mr-auto sm:mr-0 sm:ml-auto">
          <ShoppingBag className="w-5 h-5 text-primary/50 hidden sm:block" />
          <span className="text-sm text-muted-foreground">До сплати</span>
          <span className="text-2xl font-bold text-foreground">{total.toFixed(2)} грн</span>
        </div>
        <Button
          type="submit"
          disabled={submitting}
          className="bg-primary hover:bg-primary/90 font-bold h-12 px-10 text-base rounded-full shadow-sm"
        >
          {submitting ? 'Оформлення...' : 'Оформити'}
        </Button>
      </div>
    </div>
  );
}