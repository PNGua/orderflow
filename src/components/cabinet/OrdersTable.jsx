import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import OrderRow from "./OrderRow";

const PAGE_SIZES = [10, 25, 50];

export default function OrdersTable({ orders, isLoading }) {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("order_date");
  const [sortDir, setSortDir] = useState(-1);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => d * -1);
    } else {
      setSortField(field);
      setSortDir(-1);
    }
    setPage(0);
  };

  const filtered = useMemo(() => {
    if (!orders) return [];
    const q = search.toLowerCase();
    return orders.filter(
      (o) =>
        o.order_number?.toLowerCase().includes(q) ||
        o.status?.toLowerCase().includes(q) ||
        o.recipient_name?.toLowerCase().includes(q)
    );
  }, [orders, search]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      const aVal = a[sortField] ?? "";
      const bVal = b[sortField] ?? "";
      if (typeof aVal === "number" && typeof bVal === "number") {
        return (aVal - bVal) * sortDir;
      }
      return String(aVal).localeCompare(String(bVal)) * sortDir;
    });
  }, [filtered, sortField, sortDir]);

  const totalPages = Math.ceil(sorted.length / pageSize);
  const pageData = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const SortHeader = ({ field, children, className = "" }) => (
    <button
      onClick={() => toggleSort(field)}
      className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors ${className}`}
    >
      {children}
      <ArrowUpDown className={`w-3 h-3 ${sortField === field ? "text-primary" : "text-muted-foreground/40"}`} />
    </button>
  );

  return (
    <div className="bg-card rounded-2xl border shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 border-b">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Показати</span>
          <Select
            value={String(pageSize)}
            onValueChange={(v) => {
              setPageSize(Number(v));
              setPage(0);
            }}
          >
            <SelectTrigger className="w-[72px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZES.map((s) => (
                <SelectItem key={s} value={String(s)}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>записів</span>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Пошук..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-9 h-9"
          />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-3 bg-gray-50 border-b text-xs font-semibold uppercase tracking-wider text-gray-400">
        <span className="w-24 shrink-0">Номер</span>
        <span className="w-40 shrink-0">Дата</span>
        <span className="flex-1" />
        <SortHeader field="total_amount" className="w-32 justify-end shrink-0">Сума</SortHeader>
        <span className="w-36 text-center shrink-0">Статус</span>
        <span className="w-4 shrink-0" />
      </div>

      {/* Body */}
      <div className="divide-y">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : pageData.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm">
            {search ? "Нічого не знайдено" : "У вас ще немає замовлень"}
          </div>
        ) : (
          pageData.map((order) => <OrderRow key={order.id} order={order} />)
        )}
      </div>

      {/* Footer */}
      {sorted.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-muted-foreground">
          <span>
            Показано {page * pageSize + 1}–
            {Math.min((page + 1) * pageSize, sorted.length)} з {sorted.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const start = Math.max(0, Math.min(page - 2, totalPages - 5));
              const pageNum = start + i;
              if (pageNum >= totalPages) return null;
              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8 text-xs"
                  onClick={() => setPage(pageNum)}
                >
                  {pageNum + 1}
                </Button>
              );
            })}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}