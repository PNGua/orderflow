import { Clock, Loader2, CreditCard, Factory, Truck, PackageCheck, CheckCircle2, XCircle, Ban } from "lucide-react";

const STEPS = [
  { key: "Нове",        icon: Clock,         label: "Нове" },
  { key: "В обробці",   icon: Loader2,        label: "Обробка" },
  { key: "Оплачено",    icon: CreditCard,     label: "Оплата" },
  { key: "Виробництво", icon: Factory,        label: "Вироб." },
  { key: "Відправлено", icon: Truck,          label: "Відправ." },
  { key: "Доставлено",  icon: PackageCheck,   label: "Доставка" },
  { key: "Виконано",    icon: CheckCircle2,   label: "Виконано" },
];

const FAILED_STATUSES = ["Не вдалося", "Скасовано"];

const STEP_ORDER = STEPS.map((s) => s.key);

export default function StatusStepper({ status }) {
  const isFailed = FAILED_STATUSES.includes(status);
  const currentIndex = STEP_ORDER.indexOf(status);

  if (isFailed) {
    const Icon = status === "Не вдалося" ? XCircle : Ban;
    return (
      <div className="flex items-center gap-2 text-red-500">
        <Icon className="w-4 h-4" />
        <span className="text-xs font-medium">{status}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-0.5">
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const isDone = idx < currentIndex;
        const isActive = idx === currentIndex;
        const isFuture = idx > currentIndex;

        return (
          <div key={step.key} className="flex items-center">
            {/* connector */}
            {idx > 0 && (
              <div
                className={`h-px w-3 sm:w-4 transition-colors ${
                  isDone || isActive ? "bg-primary" : "bg-border"
                }`}
              />
            )}

            {/* step dot */}
            <div className="relative group/step">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                  isActive
                    ? "bg-primary border-primary text-primary-foreground scale-110 shadow-md shadow-primary/30"
                    : isDone
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-background border-border text-muted-foreground/40"
                }`}
              >
                <Icon className="w-3 h-3" />
              </div>

              {/* tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-[10px] rounded whitespace-nowrap opacity-0 group-hover/step:opacity-100 pointer-events-none transition-opacity z-10">
                {step.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}