import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Award, Phone, Info, ShoppingBag, Heart, Clock, Sparkles, CheckCircle2 } from "lucide-react";

// Tariff thresholds (UAH per quarter). "personal" is off the scale — separate block.
const TARIFFS = [
  { key: "basic",    name: "Базовий",      threshold: 0,      color: "#4a8fb9", discount: "до -10%" },
  { key: "business", name: "Бізнес",       threshold: 30000,  color: "#d4af37", discount: "до -25%" },
  { key: "partner",  name: "Партнерський", threshold: 150000, color: "#7b68ee", discount: "до -40%" },
];

const fmtUAH = (n) =>
  new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 }).format(Math.round(n || 0)) + " грн";

// current quarter bounds
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
      if (o.status === "Скасовано" || o.status === "Не вдалося") return false;
      const d = o.order_date ? new Date(o.order_date) : null;
      return d && d >= start && d < end;
    })
    .reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);

  // current tariff = highest threshold reached
  const currentTariff =
    [...TARIFFS].reverse().find((t) => quarterlyTotal >= t.threshold) || TARIFFS[0];
  const nextTariff = TARIFFS.find((t) => t.threshold > quarterlyTotal);

  const maxThreshold = TARIFFS[TARIFFS.length - 1].threshold;
  const overallProgress = Math.min(100, (quarterlyTotal / maxThreshold) * 100);

  const toNext = nextTariff ? nextTariff.threshold - quarterlyTotal : 0;
  const reachedNext = !!nextTariff && quarterlyTotal >= nextTariff.threshold;

  // Guaranteed tariff for next quarter = highest threshold reached this quarter
  const guaranteedTariff = currentTariff;

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Left: current tariff */}
          <div className="p-6 lg:border-r border-b lg:border-b-0">
            <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-1">
              ПРОГРАМА ЛОЯЛЬНОСТІ
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-muted-foreground">ВАШ ТАРИФ:</span>
              <span
                className="text-base font-bold px-2.5 py-0.5 rounded text-white"
                style={{ backgroundColor: currentTariff.color }}
              >
                {currentTariff.name.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Знижки на ДТФ у рулонах залежать від обороту за квартал. Чим більший
              оборот — тим вищий тариф і вигідніша ціна.
            </p>
            <div className="w-full h-2 rounded-full bg-[#e0e0e0] overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${overallProgress}%`, backgroundColor: currentTariff.color }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              {nextTariff
                ? `До переходу на тариф «${nextTariff.name}» залишилось ${fmtUAH(toNext)}`
                : "Ви на максимальному тарифі — Партнерський. Дякуємо за довіру!"}
            </p>
          </div>

          {/* Middle: benefits */}
          <div className="p-6 lg:border-r border-b lg:border-b-0">
            <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">
              ЩО ВИ ОТРИМУЄТЕ:
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#4a8fb9] shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  ДТФ у рулонах (гурт) — <b>{currentTariff.discount}</b>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  Пріоритетне виробництво та персональний менеджер
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm bg-[#eef6f9] rounded-lg px-3 py-2">
              <Phone className="w-4 h-4 text-[#4a8fb9] shrink-0" />
              <span className="text-foreground">
                Бажаєте максимальну знижку? Дзвоніть!{" "}
                <b className="text-[#4a8fb9]">0800 752 001</b>
              </span>
            </div>
          </div>

          {/* Right: info */}
          <div className="p-6">
            <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-3">
              ІНФОРМАЦІЯ:
            </p>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#4a8fb9]" />
                <span className="text-foreground">Мої замовлення</span>
                <span className="ml-auto font-semibold text-foreground">{orders.length}</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#4a8fb9]" />
                <span className="text-foreground">Мої обрані</span>
                <span className="ml-auto font-semibold text-foreground">0</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#4a8fb9]" />
                <span className="text-foreground">Лист очікування</span>
                <span className="ml-auto font-semibold text-foreground">0</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Notification banner: guaranteed tariff for next quarter */}
      <div className="bg-[#eef6f9] border border-[#4a8fb9]/20 rounded-xl px-5 py-4 flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 text-[#4a8fb9] shrink-0 mt-0.5" />
        <p className="text-sm text-foreground leading-relaxed">
          Ви вже гарантовано отримуєте тариф <b>«{guaranteedTariff.name}»</b> на
          наступний квартал. Якщо оборот до кінця поточного кварталу досягне
          вищого порогу — тариф буде автоматично підвищено.
        </p>
      </div>

      {/* Status overview: current tariff + quarterly turnover */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border rounded-xl shadow-sm p-5 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0"
            style={{ backgroundColor: currentTariff.color }}
          >
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Поточний тариф</p>
            <p className="text-lg font-bold" style={{ color: currentTariff.color }}>
              {currentTariff.name}
            </p>
          </div>
        </div>
        <div className="bg-card border rounded-xl shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#eef6f9] flex items-center justify-center text-[#4a8fb9] font-bold shrink-0">
            ₴
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Оборот за поточний квартал</p>
            <p className="text-lg font-bold text-foreground">{fmtUAH(quarterlyTotal)}</p>
          </div>
        </div>
      </div>

      {/* Progress tracker: Basic / Business / Partner (no Personal) */}
      <div className="bg-card border rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">ВАШ ТАРИФ:</span>
          <span
            className="text-sm font-bold px-2 py-0.5 rounded text-white"
            style={{ backgroundColor: currentTariff.color }}
          >
            {currentTariff.name.toUpperCase()}
          </span>
          {reachedNext && (
            <span className="text-xs text-[#d4af37] font-semibold ml-2">
              ✓ Поріг {nextTariff.name} досягнуто
            </span>
          )}
        </div>

        {/* progress bar with 3 stops */}
        <div className="relative pt-2">
          <div className="w-full h-2 rounded-full bg-[#e0e0e0] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${overallProgress}%`, backgroundColor: "#4a8fb9" }}
            />
          </div>
          {/* threshold markers */}
          <div className="absolute top-0 left-0 right-0 flex justify-between px-0 pointer-events-none">
            {TARIFFS.map((t) => (
              <span
                key={t.key}
                className="w-0.5 h-6 -mt-2"
                style={{
                  backgroundColor: "#cbd5e1",
                  marginLeft: t.key === "basic" ? 0 : undefined,
                  marginRight: t.key === "partner" ? 0 : undefined,
                }}
              />
            ))}
          </div>
        </div>

        {/* tariff stops */}
        <div className="grid grid-cols-3 gap-2 mt-5">
          {TARIFFS.map((t) => {
            const reached = quarterlyTotal >= t.threshold;
            const isCurrent = t.key === currentTariff.key;
            const isNext = nextTariff && t.key === nextTariff.key;
            return (
              <div key={t.key} className="flex flex-col items-center text-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    isCurrent ? "ring-2 ring-offset-2" : ""
                  }`}
                  style={{
                    backgroundColor: reached ? t.color : "#fff",
                    color: reached ? "#fff" : "#9ca3af",
                    borderColor: t.color,
                    ...(isCurrent ? { "--tw-ring-color": t.color } : {}),
                  }}
                >
                  {reached ? "✓" : ""}
                </div>
                <p
                  className="text-xs font-semibold mt-2"
                  style={{ color: reached ? t.color : "#9ca3af" }}
                >
                  {t.name}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  від {fmtUAH(t.threshold)}
                </p>
                {isCurrent && (
                  <span className="text-[10px] text-[#4a8fb9] font-semibold mt-1">
                    активний
                  </span>
                )}
                {isNext && !reached && (
                  <span className="text-[10px] text-muted-foreground mt-1">
                    ще {fmtUAH(toNext)}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Personal tariff — separate block, not on the progress bar */}
      <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] rounded-xl p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Sparkles className="w-6 h-6 text-[#d4af37]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold">Персональний тариф</h3>
              <span className="text-[10px] bg-[#d4af37] text-black px-2 py-0.5 rounded font-semibold">
                ІНДИВІДУАЛЬНІ УМОВИ
              </span>
            </div>
            <p className="text-sm text-white/70 mb-4 leading-relaxed">
              Для великих виробників та брендів із стабільним обсягом. Умови
              формуються індивідуально: фіксована ціна, відкладений платіж,
              резерв матеріалу, пріоритетний менеджер.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div className="bg-white/5 rounded-lg px-3 py-2">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Обсяг</p>
                <p className="text-sm font-semibold">від 300 000 грн/кв</p>
              </div>
              <div className="bg-white/5 rounded-lg px-3 py-2">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Знижка</p>
                <p className="text-sm font-semibold">за домовленістю</p>
              </div>
              <div className="bg-white/5 rounded-lg px-3 py-2">
                <p className="text-[10px] text-white/50 uppercase tracking-wider">Менеджер</p>
                <p className="text-sm font-semibold">персональний</p>
              </div>
            </div>
            <a
              href="tel:0800752001"
              className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#c4a030] text-black font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
            >
              <Phone className="w-4 h-4" />
              Обговорити умови: 0800 752 001
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}