import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { UserSectionSkeleton } from "./SectionSkeleton";

const CITIES = ["Київ", "Харків", "Одеса", "Дніпро", "Львів", "Запоріжжя", "Кривий Ріг", "Миколаїв", "Вінниця", "Херсон"];

export default function UserSection() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ first_name: "", last_name: "", phone: "", city: "", branch: "" });
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    base44.auth.me().then((u) => {
      setUser(u);
      const nameParts = (u.full_name || "").split(" ");
      setForm({
        first_name: u.first_name || nameParts[0] || "",
        last_name: u.last_name || nameParts[1] || "",
        phone: u.phone || "",
        city: u.city || "",
        branch: u.branch || "",
      });
      setLoading(false);
    });
  }, []);

  const initials = ((form.first_name?.[0] || "") + (form.last_name?.[0] || "")).toUpperCase() || (user?.email?.[0] || "U").toUpperCase();

  if (loading) return <UserSectionSkeleton />;

  const handleSave = async () => {
    setSaving(true);
    await base44.auth.updateMe(form);
    setSaving(false);
    toast({ title: "Зміни збережено" });
  };

  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Avatar */}
        <div className="flex flex-col items-center gap-3 shrink-0">
          <div className="w-32 h-32 rounded-lg bg-purple-500 flex items-center justify-center text-white text-5xl font-bold select-none">
            {initials}
          </div>
          <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
            <Camera className="w-3.5 h-3.5" />
            Змінити зображення
          </Button>
          <button className="text-xs text-teal-600 hover:underline">Змінити пароль?</button>
        </div>

        {/* Form */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Ім'я:</label>
            <Input
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              placeholder="Ім'я"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Прізвище:</label>
            <Input
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              placeholder="Прізвище"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Телефон:</label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+38 (0__) ___-__-__"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Місто:</label>
            <Input
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Місто"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">E-mail:</label>
            <Input value={user?.email || ""} disabled className="bg-muted/40" />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-muted-foreground">Обрати філію:</label>
            <Select value={form.branch} onValueChange={(v) => setForm({ ...form, branch: v })}>
              <SelectTrigger>
                <SelectValue placeholder="Оберіть філію" />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2 flex justify-end pt-2">
            <Button onClick={handleSave} disabled={saving} className="bg-teal-700 hover:bg-teal-800 text-white gap-2">
              <Save className="w-4 h-4" />
              {saving ? "Збереження..." : "Зберегти зміни"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}