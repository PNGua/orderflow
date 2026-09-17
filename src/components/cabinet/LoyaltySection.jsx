import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Award, Sparkles, Phone, CheckCircle2, HelpCircle, X } from "lucide-react";

function HowItWorksModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-card rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-lg font-bold text-foreground">Як працюють тарифи</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
            aria-label="Закрити"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-6 py-6 space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Чим більше ви замовляєте — тим вигідніша ціна. Ми автоматично
            враховуємо суму ваших завершених замовлень за поточний квартал і на
            її основі визначаємо тариф на наступні 3 місяці.
          </p>

          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[#037291] text-white text-xs font-bold flex items-center justify-center">1</span>
              <div>
                <p className="text-sm font-semibold text-foreground">Базовий</p>
                <p className="text-sm text-muted-foreground mt-0.5">Стартовий тариф без додаткових умов.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[#037291] text-white text-xs font-bold flex items-center justify-center">2</span>
              <div>
                <p className="text-sm font-semibold text-foreground">Бізнес</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Якщо сума завершених замовлень за поточний квартал становить від <b className="text-foreground">30 000 грн</b>, на наступний квартал автоматично застосовується тариф «Бізнес».
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-[#037291] text-white text-xs font-bold flex items-center justify-center">3</span>
              <div>
                <p className="text-sm font-semibold text-foreground">Партнерський</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Якщо сума завершених замовлень за поточний квартал становить від <b className="text-foreground">150 000 грн</b>, на наступний квартал автоматично застосовується «Партнерський» тариф. Отримати його можна одразу — проходити тариф «Бізнес» не потрібно.
                </p>
              </div>
            </li>
          </ol>

          <div className="border-t pt-5 space-y-4">
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Коли оновлюється тариф?</p>
              <p className="text-sm text-muted-foreground">1-го числа кожного нового кварталу система підсумовує завершені замовлення за попередній квартал і визначає тариф на наступні 3 місяці.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Що враховується?</p>
              <p className="text-sm text-muted-foreground">У розрахунок входить сума завершених замовлень за поточний квартал.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">Ваша вигода</p>
              <p className="text-sm text-muted-foreground">Тариф фіксується на весь наступний квартал, тому ви заздалегідь знаєте свої умови і можете планувати наступні замовлення.</p>
            </div>
          </div>

          <div className="border-t pt-5">
            <p className="text-sm font-bold text-foreground mb-3">Як змінюється тариф</p>
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/60">
                    <th className="text-left font-semibold text-foreground px-3 py-2.5 border-b border-border">Оборот за квартал</th>
                    <th className="text-left font-semibold text-foreground px-3 py-2.5 border-b border-border">Зараз</th>
                    <th className="text-left font-semibold text-foreground px-3 py-2.5 border-b border-border">Наступний квартал</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border last:border-0">
                    <td className="px-3 py-2.5 text-muted-foreground">До 30 000 грн</td>
                    <td className="px-3 py-2.5 text-muted-foreground">Поточний тариф продовжує діяти</td>
                    <td className="px-3 py-2.5 font-semibold text-foreground">Базовий</td>
                  </tr>
                  <tr className="border-b border-border last:border-0">
                    <td className="px-3 py-2.5 text-muted-foreground">Від 30 000 грн</td>
                    <td className="px-3 py-2.5 text-foreground">Бізнес активується одразу</td>
                    <td className="px-3 py-2.5 font-semibold text-foreground">Бізнес</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2.5 text-muted-foreground">Від 150 000 грн</td>
                    <td className="px-3 py-2.5 text-foreground">Партнерський активується одразу</td>
                    <td className="px-3 py-2.5 font-semibold text-foreground">Партнерський</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
              Досягли нового рівня — тариф змінюється одразу та зберігається на весь наступний квартал. Протягом поточного кварталу тариф не знижується.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [howOpen, setHowOpen] = useState(false);
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
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">
                Чим більше ви замовляєте — тим вигідніші умови отримуєте.
              </p>
              <button
                onClick={() => setHowOpen(true)}
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#037291] hover:underline"
              >
                <HelpCircle className="w-4 h-4" />
                Як це працює
              </button>
            </div>
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

      <HowItWorksModal open={howOpen} onClose={() => setHowOpen(false)} />
    </div>
  );
}