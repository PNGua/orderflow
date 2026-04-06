import { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import { User, LogOut, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CabinetHeader({ orderCount }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
          Мій кабінет
        </h1>
        {user && (
          <p className="text-muted-foreground mt-1 text-sm">
            Вітаємо, <span className="font-medium text-foreground">{user.full_name || user.email}</span>
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-xl px-4 py-2">
          <ShoppingBag className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-primary">{orderCount}</span>
          <span className="text-sm text-muted-foreground">замовлень</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
          onClick={() => base44.auth.logout()}
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}