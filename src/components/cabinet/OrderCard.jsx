import { useState } from "react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { ChevronDown, Clock, Loader2, CreditCard, Factory, Truck, PackageCheck, CheckCircle2, XCircle, Ban, FileText, Link2, MapPin, User, UserCog, Hash, MessageSquare, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OrderItems from "./OrderItems";

const STATUS_CONFIG = {
  "Нове":        { color: "bg-blue-900/60 text-blue-300 border-blue-700",        icon: Clock },
  "В обробці":   { color: "bg-amber-900/60 text-amber-300 border-amber-700",     icon: Loader2 },
  "Оплачено":    { color: "bg-emerald-900/60 text-emerald-300 border-emerald-700", icon: CreditCard },
  "Виробництво": { color: "bg-purple-900/60 text-purple-300 border-purple-700",  icon: Factory },
  "Відправлено": { color: "bg-indigo-900/60 text-indigo-300 border-indigo-700",  icon: Truck },
  "Доставлено":  { color: "bg-teal-900/60 text-teal-300 border-teal-700",        icon: PackageCheck },
  "Виконано":    { color: "bg-green-900/60 text-green-300 border-green-700",     icon: CheckCircle2 },
  "Не вдалося":  { color: "bg-red-900/60 text-red-300 border-red-700",           icon: XCircle },
  "Скасовано":   { color: "bg-zinc-800 text-zinc-400 border-zinc-600",           icon: Ban },
};

const STEPS = ["Нове", "В обробці", "Оплачено", "Виробництво", "Відправлено", "Доставлено", "Виконано"];

function StatusStepper({ status }) {
  const currentIdx = STEPS.indexOf(status);
  if (currentIdx === -1) return null;
  return (
    <div className="flex items-center gap-0.5 flex-wrap">
      {STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step} className="flex items-center gap-0.5">
            <span
              title={step}
              className={`h-1.5 rounded-full transition-all
                ${active ? "w-6 bg-amber-400" : done ? "w-3 bg-green-500" : "w-3 bg-zinc-600"}`}
            />
          </div>
        );
      })}
      <span className="ml-2 text-xs text-zinc-400">{status}</span>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, isLink }) {
  if (!value || value === "-----") return null;
  return (
    <div className="flex items-start gap-1.5 text-xs text-zinc-400">
      <Icon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
      <span className="shrink-0 font-semibold">{label}:</span>
      {isLink ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-medium truncate">
          Переглянути
        </a>
      ) : (
        <span className="text-zinc-200 font-medium break-words">{value}</span>
      )}
    </div>
  );
}

export default function OrderCard({ order }) {
  const [expanded, setExpanded] = useState(false);

  const config = STATUS_CONFIG[order.status] || STATUS_CONFIG["Нове"];
  const StatusIcon = config.icon;
  const formattedDate = order.order_date
    ? format(new Date(order.order_date), "d MMMM yyyy, HH:mm", { locale: uk })
    : "—";

  return (
    <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg hover:border-[#4a4a4a]">
      {/* Collapsed header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 flex flex-wrap items-start gap-3"
      >
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-amber-400 text-base">#{order.order_number}</span>
            {order.service_zone && (
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" />{order.service_zone}
              </span>
            )}
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${config.color} inline-flex items-center gap-1`}>
              <StatusIcon className="w-3 h-3" />
              {order.status}
            </span>
          </div>

          <StatusStepper status={order.status} />

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-400">
            <span>{formattedDate}</span>
            {order.payment_type && <span>Оплата: {order.payment_type}</span>}
            {order.delivery_type && <span>{order.delivery_type}</span>}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="font-bold text-lg text-white">
            {(order.total_amount || 0).toFixed(2)} грн
          </span>
          <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
        </div>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-[#3a3a3a] px-5 py-4 bg-[#222222] space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {/* Left column */}
                <div className="space-y-2">
                  <InfoRow icon={Hash} label="Номер замовлення" value={order.order_number} />
                  <InfoRow icon={CreditCard} label="Сума замовлення" value={`${(order.total_amount || 0).toFixed(2)} грн`} />
                  <InfoRow icon={CreditCard} label="Тип оплати" value={order.payment_type} />
                  <InfoRow
                    icon={User}
                    label="Отримувач"
                    value={[order.recipient_name, order.recipient_phone].filter(Boolean).join(" ")}
                  />
                  <InfoRow icon={FileText} label="Статус" value={order.status} />
                  <InfoRow icon={FileText} label="Рахунок-фактура" value={order.invoice_url} isLink={!!order.invoice_url} />
                  <InfoRow icon={MapPin} label="Зона обслуговування" value={order.service_zone} />
                  <InfoRow icon={MessageSquare} label="Коментар" value={order.comment} />
                </div>
                {/* Right column */}
                <div className="space-y-2">
                  <InfoRow
                    icon={Clock}
                    label="Дата та час замовлення"
                    value={order.order_date ? format(new Date(order.order_date), "d MMMM yyyy, HH:mm", { locale: uk }) : "—"}
                  />
                  <InfoRow icon={Truck} label="Тип доставки" value={order.delivery_type} />
                  <InfoRow icon={User} label="Платник" value={order.payer_name} />
                  <InfoRow icon={UserCog} label="Менеджер" value={order.manager_name} />
                  <div className="space-y-0.5">
                    <InfoRow icon={Link2} label="Посилання на макети" value={order.layout_url} isLink={!!order.layout_url} />
                    {order.layout_url && (
                      <div className="pl-5 text-xs text-amber-400/70 break-all">{order.layout_url}</div>
                    )}
                  </div>
                  <InfoRow icon={Hash} label="ТТН замовлення" value={order.ttn || "—"} />
                </div>
              </div>
              <OrderItems items={order.items} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}