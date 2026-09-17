import { useQuery } from "@tanstack/react-query";
import { base44 } from "@/api/base44Client";
import { Award, Phone, Info, ShoppingBag, Heart, Clock } from "lucide-react";

const LEVELS = [
  { key: "blue",     name: "Блакитний",   threshold: 0,      color: "#4a8fb9", text: "#4a8fb9" },
  { key: "silver",   name: "Срібний",    threshold: 5001,   color: "#a0a0a0", text: "#6b7280" },
  { key: "gold",     name: "Золотий",    threshold: 15001,  color: "#d4af37", text: "#b8941f" },
  { key: "diamond",  name: "Діамантовий", threshold: 30001, color: "#7b68ee", text: "#7b68ee" },
  { key: "vip",      name: "VIP",        threshold: 50001,  color: "#1f2937", text: "#1f2937" },
];

const fmtUAH = (n) =>
  new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 }).format(n || 0) + " грн";

export default function LoyaltySection() {
  const { data: orders = [] } = useQuery({
    queryKey: ["my-orders-loyalty"],
    queryFn: () => base44.entities.Order.list("-order_date", 200),
  });

  const quarterlyTotal = orders
    .filter((o) => o.status !== "Скасовано")
    .reduce((sum, o) => sum + (Number(o.total_amount) || 0), 0);

  const currentLevel =
    [...LEVELS].reverse().find((l) => quarterlyTotal >= l.threshold) || LEVELS[0];
  const nextLevel = LEVELS.find((l) => l.threshold > quarterlyTotal);
  const progress = nextLevel
    ? Math.min(
        100,
        ((quarterlyTotal - currentLevel.threshold) /
          (nextLevel.threshold - currentLevel.threshold)) *
          100
      )
    : 100;

  const overallProgress = Math.min(
    100,
    (quarterlyTotal / LEVELS[LEVELS.length - 1].threshold) * 100
  );

  return (
    <div className="space-y-6">
      {/* Header card */}
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* Left: status */}
          <div className="p-6 lg:border-r border-b lg:border-b-0">
            <p className="text-xs font-semibold text-muted-foreground tracking-wider mb-1">
              ПРОГРАМА ЛОЯЛЬНОСТІ
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-muted-foreground">ВАШ РІВЕНЬ:</span>
              <span
                className="text-base font-bold px-2.5 py-0.5 rounded text-white"
                style={{ backgroundColor: currentLevel.color }}
              >
                {currentLevel.name.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Чим більше ви купуєте — тим більшу знижку отримуєте. Ваш рівень
              оновлюється автоматично за сумою замовлень за квартал.
            </p>
            {/* progress bar to next level */}
            <div className="w-full h-2 rounded-full bg-[#e0e0e0] overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${progress}%`, backgroundColor: currentLevel.color }}
              />
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">
              {nextLevel
                ? `Ви вже досягли суми для переходу на рівень «${nextLevel.name}»`
                : "Ви досягли максимального рівня — VIP. Дякуємо за довіру!"}
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
                  При купівлі тканини від 1 рул. (гурт) — до <b>-40%</b>
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">
                  Преміум-знижки на товари-новинки та ексклюзивні колекції
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
                <span className="ml-auto font-semibold text-foreground">
                  {orders.length}
                </span>
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

      {/* Notification banner */}
      <div className="bg-[#eef6f9] border border-[#4a8fb9]/20 rounded-xl px-5 py-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-[#4a8fb9] shrink-0 mt-0.5" />
        <p className="text-sm text-foreground leading-relaxed">
          До 15 числа наступного календарного кварталу буде проведено перерахунок.
          Щоб перейти на срібний рівень потрібно купити товарів на суму від{" "}
          <b>5 000 грн</b> до останнього дня календарного кварталу.
        </p>
      </div>

      {/* Status overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-card border rounded-xl shadow-sm p-5 flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shrink-0"
            style={{ backgroundColor: currentLevel.color }}
          >
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Ваш поточний рівень</p>
            <p className="text-lg font-bold" style={{ color: currentLevel.text }}>
              {currentLevel.name} рівень
            </p>
          </div>
        </div>
        <div className="bg-card border rounded-xl shadow-sm p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#eef6f9] flex items-center justify-center text-[#4a8fb9] font-bold shrink-0">
            ₴
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Сума замовлень за квартал</p>
            <p className="text-lg font-bold text-foreground">
              {fmtUAH(quarterlyTotal)}
            </p>
          </div>
        </div>
      </div>

      {/* Progress tracker */}
      <div className="bg-card border rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-sm text-muted-foreground">ВАШ РІВЕНЬ:</span>
          <span
            className="text-sm font-bold px-2 py-0.5 rounded text-white"
            style={{ backgroundColor: currentLevel.color }}
          >
            {currentLevel.name.toUpperCase()}
          </span>
        </div>

        {/* bar */}
        <div className="relative pt-1">
          <div className="w-full h-1.5 rounded-full bg-[#e0e0e0] overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${overallProgress}%`, backgroundColor: "#4a8fb9" }}
            />
          </div>
        </div>

        {/* levels */}
        <div className="grid grid-cols-5 gap-1 mt-4">
          {LEVELS.map((lvl) => {
            const reached = quarterlyTotal >= lvl.threshold;
            const isCurrent = lvl.key === currentLevel.key;
            return (
              <div
                key={lvl.key}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    isCurrent ? "ring-2 ring-offset-2" : ""
                  }`}
                  style={{
                    backgroundColor: reached ? lvl.color : "#fff",
                    color: reached ? "#fff" : "#9ca3af",
                    borderColor: lvl.color,
                    ...(isCurrent ? { "--tw-ring-color": lvl.color } : {}),
                  }}
                >
                  {reached ? "✓" : ""}
                </div>
                <p
                  className="text-[11px] font-semibold mt-2"
                  style={{ color: reached ? lvl.text : "#9ca3af" }}
                >
                  {lvl.name}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {fmtUAH(lvl.threshold)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}