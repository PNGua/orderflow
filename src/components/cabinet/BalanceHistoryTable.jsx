import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { BalanceSectionSkeleton } from "./SectionSkeleton";

export default function BalanceHistoryTable({ transactions = [], loading = false }) {
  if (loading) return <BalanceSectionSkeleton />;

  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border py-10 text-center text-sm text-muted-foreground">
        Історія змін балансу відсутня
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/60 text-muted-foreground text-xs uppercase tracking-wide">
            <th className="text-left font-semibold px-4 py-3 border-b border-border">Стан</th>
            <th className="text-left font-semibold px-4 py-3 border-b border-border">Зміна</th>
            <th className="text-left font-semibold px-4 py-3 border-b border-border">Тип зміни</th>
            <th className="text-left font-semibold px-4 py-3 border-b border-border">Дата</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {transactions.map((t) => {
            const positive = t.amount > 0;
            return (
              <tr key={t.id} className="hover:bg-muted/40 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                  {t.state.toLocaleString("uk-UA")} грн
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 font-semibold ${
                      positive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {positive ? (
                      <ArrowUpCircle className="w-4 h-4 shrink-0" />
                    ) : (
                      <ArrowDownCircle className="w-4 h-4 shrink-0" />
                    )}
                    {positive ? "+" : ""}
                    {t.amount.toLocaleString("uk-UA")} грн
                  </span>
                </td>
                <td className="px-4 py-3 text-foreground/80">{t.type}</td>
                <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                  {t.date}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}