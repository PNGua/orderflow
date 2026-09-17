import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Award, Sparkles, Phone, CheckCircle2 } from "lucide-react";

const TARIFFS = [
  { key: "basic",    name: "Базовий",      threshold: 0,      color: "#037291" },
  { key: "business", name: "Бізнес",       threshold: 30000,  color: "#037291" },
  { key: "partner",  name: "Партнерський", threshold: 150000, color: "#037291" },
];

const REVENUE_STATUSES = ["Оплачено", "Виробництво", "Відправлено", "Доставлено", "Виконано"];

const fmtUAH = (n) =>
  new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 }).format(Math.round(n || 0)) + " грн";

const quarterBounds = () => {
  const now = new Date();
  const q = Math.floor(now.getMonth() / 3);
  const start = new Date(now.getFullYear(), q * 3, 1);
  const end = new Date(now.getFullYear(), q * 3 + 3, 1);
  return { start, end };
};

export default function LoyaltySection() {
  const { data: orders = [] } = useQuery({
    queryKey: ["my-orders-loyalty"],
    queryFn: () => base44.entities.Order.list("-order_date", 200),
  });

  const { start, end } = quarterBounds();
  const quarterlyTotal = orders
    .filter((o) => {
      if (!REVENUE_STATUSES.includes(o.status)) return false;
      const d = o.order_date ? new Date(o.order_date) : null;
      return d && d >= start && d < end;
    })
    .reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);

  const currentTariff =
    [...TARIFFS].reverse().find((t) => quarterlyTotal >= t.threshold) || TARIFFS[0];
  const nextTariff = TARIFFS.find((t) => t.threshold > quarterlyTotal);

  const maxThreshold = TARIFFS[TARIFFS.length - 1].threshold;
  const overallProgress = Math.min(100, (quarterlyTotal / maxThreshold) * 100);
  const toNext = nextTariff ? nextTariff.threshold - quarterlyTotal : 0;
  const reachedMax = !nextTariff;

  return (
    <div className="space-y-6">
      {/* 1. Top compact block */}
      <div className="bg-card border rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-2">
              ПРОГРАМА ЛОЯЛЬНОСТІ
            </p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">Ваш тариф:</span>
              <span className="text-base font-bold px-2.5 py-0.5 rounded text-white bg-[#037291]">
                {currentTariff.name.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Чим більше ви замовляєте — тим вигідніші умови отримуєте.
            </p>
          </div>

          <div className="md:text-right md:border-l md:pl-6 border-t md:border-t-0 pt-4 md:pt-0">
            <p className="text-xs text-muted-foreground mb-1">Оборот за поточний квартал</p>
            <p className="text-2xl font-bold text-foreground">{fmtUAH(quarterlyTotal)}</p>
          </div>
        </div>
      </div>

      {/* 3. Main progress block */}
      <div className="bg-card border rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">Ваш тариф:</span>
          <span className="text-sm font-bold px-2 py-0.5 rounded text-white bg-[#037291]">
            {currentTariff.name.toUpperCase()}
          </span>
        </div>

        {/* progress bar */}
        <div className="relative pt-2">
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full transition-all bg-[#037291]"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        {/* tariff stops */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {TARIFFS.map((t) => {
            const reached = quarterlyTotal >= t.threshold;
            const isCurrent = t.key === currentTariff.key;
            return (
              <div key={t.key} className="flex flex-col items-center text-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                    isCurrent ? "ring-2 ring-offset-2 ring-[#037291]" : ""
                  }`}
                  style={{
                    backgroundColor: reached ? "#037291" : "#fff",
                    color: reached ? "#fff" : "#9ca3af",
                    borderColor: "#037291",
                  }}
                >
                  {reached ? "✓" : ""}
                </div>
                <p className="text-xs font-semibold mt-2 text-foreground">{t.name}</p>
                <p className="text-[11px] text-muted-foreground">
                  від {fmtUAH(t.threshold)}
                </p>
              </div>
            );
          })}
        </div>

        {/* 4. Dynamic status lines */}
        <div className="mt-6 pt-5 border-t space-y-2.5">
          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-[#037291] shrink-0" />
            <span className="text-muted-foreground">Активний зараз:</span>
            <span className="font-semibold text-foreground">{currentTariff.name}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <CheckCircle2 className="w-4 h-4 text-[#037291] shrink-0" />
            <span className="text-muted-foreground">Гарантовано на наступний квартал:</span>
            <span className="font-semibold text-foreground">{currentTariff.name}</span>
          </div>

          {!reachedMax ? (
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">До тарифу «{nextTariff.name}»:</span>
              <span className="font-semibold text-[#037291]">{fmtUAH(toNext)}</span>
            </div>
          ) : (
            <div className="flex items-start gap-2 text-sm bg-muted/60 rounded-lg px-3 py-2.5">
              <CheckCircle2 className="w-4 h-4 text-[#037291] shrink-0 mt-0.5" />
              <span className="text-foreground">
                Ви досягли максимального автоматичного тарифу — <b>Партнерський</b>.
                Він діє до кінця поточного та весь наступний квартал.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* 5. Personal tariff — separate block, no scale */}
      <div className="bg-card border rounded-xl shadow-sm p-6">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#037291]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-base font-bold text-foreground">Персональний тариф</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Для вашого акаунта можуть діяти індивідуальні умови, призначені
              менеджером вручну. Цей тариф не входить у автоматичну шкалу та
              не залежить від обороту.
            </p>
            <a
              href="tel:0800752001"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#037291] hover:underline"
            >
              <Phone className="w-4 h-4" />
              Зв'язатися з менеджером
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}