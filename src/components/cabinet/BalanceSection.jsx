import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { PlusCircle, Wallet, History } from "lucide-react";
import { BalanceSectionSkeleton } from "./SectionSkeleton";
import BalanceHistoryTable from "./BalanceHistoryTable";

const STATUS_REFUND = "Скасовано";

export default function BalanceSection() {
  const [user, setUser] = useState(null);

  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["balance-orders"],
    queryFn: () => base44.entities.Order.list("-order_date", 100),
  });

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const balance = user?.balance || 0;

  // Build a balance history from the user's orders.
  // Newest first; each row shows the running balance after the change.
  const transactions = (() => {
    // running balance computed backward from the current balance
    const sorted = [...orders].sort(
      (a, b) => new Date(b.order_date) - new Date(a.order_date)
    );
    let running = balance;
    const rows = sorted.map((o, idx) => {
      const refunded = o.status === STATUS_REFUND;
      const change = refunded
        ? Math.abs(o.total_amount || 0)
        : -(Math.abs(o.total_amount || 0));
      const stateBefore = running - change;
      const row = {
        id: o.id || idx,
        state: Math.round(stateBefore * 100) / 100,
        amount: Math.round(change * 100) / 100,
        type: `${refunded ? "Скасування" : "Оплата за"} замовлення #${o.order_number || o.id}`,
        date: o.order_date
          ? new Date(o.order_date).toLocaleString("uk-UA", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
          : "—",
      };
      running = stateBefore;
      return row;
    });
    return rows;
  })();

  if (ordersLoading && !user) return <BalanceSectionSkeleton />;

  return (
    <div className="space-y-6">
      {/* Balance card */}
      <div className="bg-[#1A1A1A] rounded-2xl p-6 md:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
          <div className="flex items-center gap-3 text-white">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-white/60 font-medium">У Вас на Балансі:</p>
              <p className="text-2xl md:text-3xl font-bold">
                {Number(balance).toLocaleString("uk-UA", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                грн
              </p>
            </div>
          </div>
          <Button className="bg-[#037291] hover:bg-[#025a73] text-white gap-2 self-start sm:self-auto">
            <PlusCircle className="w-4 h-4" />
            Поповнити Внутрішній Баланс
          </Button>
        </div>
      </div>

      {/* History */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Історія змін балансу</h2>
        </div>
        <BalanceHistoryTable
          transactions={transactions}
          loading={ordersLoading && orders.length === 0}
        />
      </div>
    </div>
  );
}