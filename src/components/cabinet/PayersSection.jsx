import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Trash2, Save } from "lucide-react";
import { PayersSectionSkeleton } from "./SectionSkeleton";

const MAX_PAYERS = 10;
const CYRILLIC_RE = /^[\u0400-\u04FF\s'"-]+$/;
const NUMERIC_RE = /^\d+$/;

function PayerRow({ payer, onChange, onRemove, showErrors }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start">
      <div className="flex-1 space-y-1">
        <label className="text-sm text-muted-foreground">Платник (на кого виставляти рахунок):</label>
        <Input
          value={payer.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Введіть платника (на кого виставляти)"
          className={showErrors && !CYRILLIC_RE.test(payer.name) ? "border-red-400" : ""}
        />
        {showErrors && (!payer.name || !CYRILLIC_RE.test(payer.name)) && (
          <p className="text-xs text-red-500">Поле 'Платник' є обов'язковим та повинно містити лише кириличні літери</p>
        )}
      </div>

      <div className="flex-1 space-y-1">
        <label className="text-sm text-muted-foreground">ІПН / ЄДРПОУ платника:</label>
        <Input
          value={payer.ipn}
          onChange={(e) => onChange("ipn", e.target.value)}
          placeholder="Введіть ІПН / ЄДРПОУ платника"
          className={showErrors && !NUMERIC_RE.test(payer.ipn) ? "border-red-400" : ""}
        />
        {showErrors && (!payer.ipn || !NUMERIC_RE.test(payer.ipn)) && (
          <p className="text-xs text-red-500">Значення ІПН / ЄДРПОУ має бути унікальним числом.</p>
        )}
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

export default function PayersSection() {
  const [payers, setPayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showErrors, setShowErrors] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    base44.auth.me().then((u) => {
      setPayers(u.payers || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <PayersSectionSkeleton />;

  const addPayer = () => {
    if (payers.length >= MAX_PAYERS) return;
    setPayers([...payers, { name: "", ipn: "" }]);
    setShowErrors(false);
  };

  const updatePayer = (idx, field, value) => {
    const updated = payers.map((p, i) => (i === idx ? { ...p, [field]: value } : p));
    setPayers(updated);
  };

  const removePayer = (idx) => {
    setPayers(payers.filter((_, i) => i !== idx));
  };

  const isValid = payers.every(
    (p) => p.name && CYRILLIC_RE.test(p.name) && p.ipn && NUMERIC_RE.test(p.ipn)
  );

  const handleSave = async () => {
    setShowErrors(true);
    if (!isValid) return;
    setSaving(true);
    await base44.auth.updateMe({ payers });
    setSaving(false);
    toast({ title: "Платників збережено" });
  };

  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 space-y-5">
      <h2 className="text-base font-semibold text-foreground">
        Дані платників (максимум {MAX_PAYERS} платників)
      </h2>

      <div className="space-y-5">
        {payers.map((payer, idx) => (
          <PayerRow
            key={idx}
            payer={payer}
            onChange={(field, val) => updatePayer(idx, field, val)}
            onRemove={() => removePayer(idx)}
            showErrors={showErrors}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          onClick={addPayer}
          disabled={payers.length >= MAX_PAYERS}
          className="bg-gray-900 hover:bg-gray-800 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          Додати платника
        </Button>

        <Button
          onClick={handleSave}
          disabled={saving || payers.length === 0}
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