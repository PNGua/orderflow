import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import OrderCard from "./OrderCard";

const ACTIVE_STATUSES = ["Нове", "В обробці", "Оплачено", "Виробництво", "Відправлено", "Доставлено"];
const ALL_STATUSES = ["Нове", "В обробці", "Оплачено", "Виробництво", "Відправлено", "Доставлено", "Виконано", "Не вдалося", "Скасовано"];
const PAGE_SIZE = 10;

export default function OrdersTable({ orders, isLoading }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);

  const activeCount = useMemo(
    () => (orders || []).filter((o) => ACTIVE_STATUSES.includes(o.status)).length,
    [orders]
  );

  const filtered = useMemo(() => {
    if (!orders) return [];
    const q = search.toLowerCase();
    return orders.filter((o) => {
      const matchSearch =
        !q ||
        o.order_number?.toLowerCase().includes(q) ||
        o.status?.toLowerCase().includes(q) ||
        o.recipient_name?.toLowerCase().includes(q);
      const matchStatus = statusFilter === "all" || o.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-bold text-foreground mr-2">Мої замовлення</h2>

        <Select value={statusFilter} onValueChange={(v) => { setStatusFilter(v); setPage(0); }}>
          <SelectTrigger className="w-40 h-9 text-sm">
            <SelectValue placeholder="Всі статуси" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Всі статуси</SelectItem>
            {ALL_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Пошук..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="pl-9 h-9 w-44"
          />
        </div>

        <div className="ml-auto flex items-center gap-2 text-sm">
          {activeCount > 0 && (
            <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {activeCount} активні
            </span>
          )}
          <span className="text-zinc-500">{filtered.length} замовлень загалом</span>
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      ) : pageData.length === 0 ? (
        <div className="bg-card border rounded-xl text-center py-16 text-muted-foreground text-sm">
          {search || statusFilter !== "all" ? "Нічого не знайдено" : "У вас ще немає замовлень"}
        </div>
      ) : (
        <div className="space-y-3">
          {pageData.map((order) => <OrderCard key={order.id} order={order} />)}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground pt-1">
          <span>
            {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filtered.length)} з {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const start = Math.max(0, Math.min(page - 2, totalPages - 5));
              const pageNum = start + i;
              if (pageNum >= totalPages) return null;
              return (
                <Button key={pageNum} variant={page === pageNum ? "default" : "ghost"} size="icon" className="h-8 w-8 text-xs" onClick={() => setPage(pageNum)}>
                  {pageNum + 1}
                </Button>
              );
            })}
            <Button variant="ghost" size="icon" className="h-8 w-8" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}