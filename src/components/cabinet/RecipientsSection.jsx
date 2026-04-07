import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Save } from "lucide-react";

const MAX_RECIPIENTS = 10;

function RecipientRow({ recipient, onChange, onRemove }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start">
      <div className="flex-1 space-y-1">
        <label className="text-sm text-muted-foreground">Ім'я отримувача замовлення:</label>
        <Input
          value={recipient.first_name}
          onChange={(e) => onChange("first_name", e.target.value)}
          placeholder="Введіть ім'я отримувача"
        />
      </div>
      <div className="flex-1 space-y-1">
        <label className="text-sm text-muted-foreground">Прізвище отримувача замовлення:</label>
        <Input
          value={recipient.last_name}
          onChange={(e) => onChange("last_name", e.target.value)}
          placeholder="Введіть Прізвище отримувача"
        />
      </div>
      <div className="flex-1 space-y-1">
        <label className="text-sm text-muted-foreground">Телефон отримувача замовлення:</label>
        <Input
          value={recipient.phone}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder="Введіть Телефон отримувача"
        />
      </div>
      <button
        onClick={onRemove}
        className="mt-6 sm:mt-7 shrink-0 bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
      >
        Видалити
      </button>
    </div>
  );
}

export default function RecipientsSection() {
  const [recipients, setRecipients] = useState([]);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    base44.auth.me().then((u) => {
      setRecipients(u.recipients || []);
    });
  }, []);

  const addRecipient = () => {
    if (recipients.length >= MAX_RECIPIENTS) return;
    setRecipients([...recipients, { first_name: "", last_name: "", phone: "" }]);
  };

  const updateRecipient = (idx, field, value) => {
    setRecipients(recipients.map((r, i) => (i === idx ? { ...r, [field]: value } : r)));
  };

  const removeRecipient = (idx) => {
    setRecipients(recipients.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    await base44.auth.updateMe({ recipients });
    setSaving(false);
    toast({ title: "Отримувачів збережено" });
  };

  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 space-y-5">
      <h2 className="text-base font-semibold text-foreground">
        Дані отримувачів (максимум {MAX_RECIPIENTS} отримувачів)
      </h2>

      <div className="space-y-5">
        {recipients.map((recipient, idx) => (
          <RecipientRow
            key={idx}
            recipient={recipient}
            onChange={(field, val) => updateRecipient(idx, field, val)}
            onRemove={() => removeRecipient(idx)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          onClick={addRecipient}
          disabled={recipients.length >= MAX_RECIPIENTS}
          className="bg-gray-900 hover:bg-gray-800 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          Додати отримувача
        </Button>

        <Button
          onClick={handleSave}
          disabled={saving || recipients.length === 0}
          variant="outline"
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          {saving ? "Збереження..." : "Зберегти зміни"}
        </Button>
      </div>
    </div>
  );
}