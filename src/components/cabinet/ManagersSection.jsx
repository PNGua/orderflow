import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Save, Trash2 } from "lucide-react";
import { RecipientsSectionSkeleton } from "./SectionSkeleton";

const MAX_MANAGERS = 10;
const PHONE_PLHOLDER = "+38 (XXX) XXX-XX-XX";

function ManagerRow({ manager, onChange, onRemove }) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-start">
      <div className="flex-1 space-y-1">
        <label className="text-sm text-muted-foreground">Ім'я менеджера:</label>
        <Input
          value={manager.first_name || ""}
          onChange={(e) => onChange("first_name", e.target.value)}
          placeholder="Введіть ім'я"
        />
      </div>
      <div className="flex-1 space-y-1">
        <label className="text-sm text-muted-foreground">Прізвище менеджера:</label>
        <Input
          value={manager.last_name || ""}
          onChange={(e) => onChange("last_name", e.target.value)}
          placeholder="Введіть прізвище"
        />
      </div>
      <div className="flex-1 space-y-1">
        <label className="text-sm text-muted-foreground">Телефон менеджера:</label>
        <Input
          value={manager.phone || ""}
          onChange={(e) => onChange("phone", e.target.value)}
          placeholder={PHONE_PLHOLDER}
        />
      </div>
      <button
        onClick={onRemove}
        className="lg:mt-7 shrink-0 inline-flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        Видалити
      </button>
    </div>
  );
}

export default function ManagersSection() {
  const [managers, setManagers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    base44.auth.me().then((u) => {
      setManagers(u.managers || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <RecipientsSectionSkeleton />;

  const addManager = () => {
    if (managers.length >= MAX_MANAGERS) return;
    setManagers([...managers, { first_name: "", last_name: "", phone: "" }]);
  };

  const updateManager = (idx, field, value) => {
    setManagers(managers.map((m, i) => (i === idx ? { ...m, [field]: value } : m)));
  };

  const removeManager = (idx) => {
    setManagers(managers.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    await base44.auth.updateMe({ managers });
    setSaving(false);
    toast({ title: "Менеджерів збережено" });
  };

  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 space-y-6">
      <h2 className="text-base font-semibold text-foreground">
        Дані менеджерів (максимум {MAX_MANAGERS} менеджерів)
      </h2>

      <div className="space-y-5">
        {managers.map((manager, idx) => (
          <ManagerRow
            key={idx}
            manager={manager}
            onChange={(field, val) => updateManager(idx, field, val)}
            onRemove={() => removeManager(idx)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          onClick={addManager}
          disabled={managers.length >= MAX_MANAGERS}
          className="bg-gray-900 hover:bg-gray-800 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          Додати менеджера
        </Button>

        <Button
          onClick={handleSave}
          disabled={saving || managers.length === 0}
          className="bg-[#037291] hover:bg-[#025a73] text-white gap-2"
        >
          <Save className="w-4 h-4" />
          {saving ? "Збереження..." : "Зберегти зміни"}
        </Button>
      </div>
    </div>
  );
}