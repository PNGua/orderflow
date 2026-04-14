import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Wallet, PlusCircle } from "lucide-react";
import { BalanceSectionSkeleton } from "./SectionSkeleton";

export default function BalanceSection() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.auth.me().then((u) => { setUser(u); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const balance = user?.balance || 0;

  if (loading) return <BalanceSectionSkeleton />;

  return (
    <div className="bg-card border rounded-xl shadow-sm p-6 space-y-4">
      {/* Balance banner */}
      <div className="flex items-center gap-3 bg-red-500 text-white rounded-lg px-5 py-3">
        <Wallet className="w-5 h-5 shrink-0" />
        <span className="text-base font-medium">
          У Вас на Балансі:{" "}
          <span className="font-bold">{balance.toFixed(2)} грн</span>
        </span>
      </div>

      {/* Top-up button */}
      <Button className="bg-teal-700 hover:bg-teal-800 text-white gap-2">
        <PlusCircle className="w-4 h-4" />
        Поповнити Внутрішній Баланс
      </Button>

      {/* History placeholder */}
      <div className="pt-2 border-t text-sm text-muted-foreground">
        Історія поповнень відсутня
      </div>
    </div>
  );
}