import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MapPin } from 'lucide-react';

const DELIVERY = [
  { id: 'Нова Пошта', label: 'Доставка службою Нова пошта' },
  { id: "Кур'єр", label: "Кур'єрська доставка на таксі" },
  { id: 'Самовивіз', label: 'Самовивіз' },
];

const ZONES = [
  { id: 'Львів', label: 'Львів' },
  { id: 'Київ', label: 'Київ' },
];

export default function DeliverySection({ form, setField }) {
  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">2</span>
        Доставка
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Delivery method */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Спосіб доставки</p>
          <RadioGroup
            value={form.delivery_type}
            onValueChange={(v) => setField('delivery_type', v)}
            className="space-y-2"
          >
            {DELIVERY.map((d) => (
              <div key={d.id} className="flex items-center gap-2.5 rounded-lg border border-input p-3 cursor-pointer hover:border-primary/40 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <RadioGroupItem value={d.id} id={`dlv-${d.id}`} />
                <Label htmlFor={`dlv-${d.id}`} className="text-sm cursor-pointer flex-1">{d.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Service zone */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            Вкажіть бажану зону обслуговування
          </p>
          <RadioGroup
            value={form.service_zone}
            onValueChange={(v) => setField('service_zone', v)}
            className="grid grid-cols-2 gap-2"
          >
            {ZONES.map((z) => (
              <div key={z.id} className="flex items-center gap-2.5 rounded-lg border border-input p-3 cursor-pointer hover:border-primary/40 transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                <RadioGroupItem value={z.id} id={`zone-${z.id}`} />
                <Label htmlFor={`zone-${z.id}`} className="text-sm cursor-pointer flex-1">{z.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <Label className="text-sm text-foreground">Вкажіть адресу доставки</Label>
        <Input
          value={form.address}
          onChange={(e) => setField('address', e.target.value)}
          placeholder="Відділення / адреса доставки"
        />
      </div>
    </div>
  );
}