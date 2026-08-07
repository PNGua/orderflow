import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';

export default function ContactSection({ form, setField, showPass, setShowPass }) {
  const set = (k) => (e) => setField(k, e.target.value);

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">1</span>
        Контакти замовника
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label className="text-sm text-foreground">Ім'я<span className="text-destructive">*</span></Label>
          <Input value={form.first_name} onChange={set('first_name')} placeholder="Введіть ім'я" required />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-foreground">Прізвище<span className="text-destructive">*</span></Label>
          <Input value={form.last_name} onChange={set('last_name')} placeholder="Введіть прізвище" required />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-foreground">Телефон<span className="text-destructive">*</span></Label>
          <Input type="tel" value={form.phone} onChange={set('phone')} placeholder="+380 __ ___ __ __" required />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm text-foreground">Адреса електронної пошти<span className="text-destructive">*</span></Label>
          <Input type="email" value={form.email} onChange={set('email')} placeholder="email@example.com" required />
        </div>
      </div>

      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-2">
          <Checkbox
            id="other-recipient"
            checked={form.other_recipient}
            onCheckedChange={(v) => setField('other_recipient', !!v)}
          />
          <Label htmlFor="other-recipient" className="text-sm text-foreground cursor-pointer">
            Отримуватиме інша людина? (необов'язково)
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="create-account"
            checked={form.create_account}
            onCheckedChange={(v) => setField('create_account', !!v)}
          />
          <Label htmlFor="create-account" className="text-sm text-foreground cursor-pointer">
            Створити обліковий запис?
          </Label>
        </div>
      </div>

      {form.create_account && (
        <div className="space-y-1.5 max-w-sm">
          <Label className="text-sm text-foreground">Пароль<span className="text-destructive">*</span></Label>
          <div className="relative">
            <Input
              type={showPass ? 'text' : 'password'}
              value={form.password}
              onChange={set('password')}
              placeholder="Введіть пароль"
              className="border-destructive pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPass((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Показати пароль"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}