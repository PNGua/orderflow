import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { FileText, Banknote, CreditCard, Building2 } from 'lucide-react';

const METHODS = [
  {
    id: 'Рахунок-фактура',
    label: 'Рахунок-фактура',
    icon: FileText,
    notice: 'УВАГА! Змінені реквізити від 22.10.2025 року! Оплата на розрахунковий рахунок ФОП через рахунок фактуру. Ви можете додати платників в персональному кабінеті за посиланням.',
  },
  { id: 'Баланс', label: 'Оплата з Внутрішнього балансу', icon: Banknote },
  { id: 'LiqPay', label: 'Оплата карткою через LiqPay', icon: CreditCard },
  { id: 'Рахунок на ТОВ', label: 'Рахунок на ТОВ', icon: Building2 },
];

export default function PaymentSection({ form, setField }) {
  const active = METHODS.find((m) => m.id === form.payment_type);

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">3</span>
        Метод оплати
      </h2>

      <RadioGroup
        value={form.payment_type}
        onValueChange={(v) => setField('payment_type', v)}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        {METHODS.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.id}
              className="relative flex flex-col gap-2 rounded-xl border border-input p-4 cursor-pointer hover:border-primary/40 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5"
            >
              <div className="flex items-start justify-between">
                <Icon className="w-6 h-6 text-foreground" />
                <RadioGroupItem value={m.id} id={`pay-${m.id}`} className="mt-0.5" />
              </div>
              <Label htmlFor={`pay-${m.id}`} className="text-sm font-medium cursor-pointer leading-tight">
                {m.label}
              </Label>
            </div>
          );
        })}
      </RadioGroup>

      {active?.notice && (
        <div className="rounded-lg bg-[#ece9f0] p-4 text-xs text-foreground/80 leading-relaxed">
          {active.notice.split('за посиланням')[0]}
          <a href="/cabinet" className="text-primary font-medium hover:underline">за посиланням</a>.
        </div>
      )}
    </div>
  );
}