import { useState } from "react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { ChevronDown, Clock, Loader2, CreditCard, Factory, Truck, PackageCheck, CheckCircle2, XCircle, Ban, FileText, Link2, MapPin, User, UserCog, Hash, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OrderItems from "./OrderItems";

const STATUS_CONFIG = {
  "Нове":        { color: "bg-blue-100 text-blue-700 border-blue-200",      icon: Clock },
  "В обробці":   { color: "bg-amber-100 text-amber-700 border-amber-200",   icon: Loader2 },
  "Оплачено":    { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CreditCard },
  "Виробництво": { color: "bg-purple-100 text-purple-700 border-purple-200", icon: Factory },
  "Відправлено": { color: "bg-indigo-100 text-indigo-700 border-indigo-200", icon: Truck },
  "Доставлено":  { color: "bg-teal-100 text-teal-700 border-teal-200",      icon: PackageCheck },
  "Виконано":    { color: "bg-green-100 text-green-700 border-green-200",   icon: CheckCircle2 },
  "Не вдалося":  { color: "bg-red-100 text-red-700 border-red-200",         icon: XCircle },
  "Скасовано":   { color: "bg-gray-100 text-gray-500 border-gray-200",      icon: Ban },
};

const STEPS = ["Нове", "В обробці", "Оплачено", "Виробництво", "Відправлено", "Доставлено", "Виконано"];

function StatusStepper({ status }) {
  const currentIdx = STEPS.indexOf(status);
  if (currentIdx === -1) return null;
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {STEPS.map((step, i) => {
        const done = i < currentIdx;
        const active = i === currentIdx;
        return (
          <div key={step} className="flex items-center gap-1">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium whitespace-nowrap
              ${active ? "bg-primary text-primary-foreground border-primary" :
                done ? "bg-green-100 text-green-700 border-green-200" :
                "bg-muted text-muted-foreground border-border"}`}>
              {step}
            </span>
            {i < STEPS.length - 1 && (
              <span className={`text-xs ${done || active ? "text-green-500" : "text-muted-foreground/40"}`}>—</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value, isLink }) {
  if (!value || value === "-----") return null;
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon className="w-3.5 h-3.5 shrink-0" />
      <span className="shrink-0">{label}:</span>
      {isLink ? (
        <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium truncate">
          Переглянути
        </a>
      ) : (
        <span className="text-foreground font-medium truncate">{value}</span>
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
    <div className={`bg-card border rounded-xl shadow-sm overflow-hidden transition-shadow hover:shadow-md`}>
      {/* Collapsed header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-4 flex flex-wrap items-start gap-3"
      >
        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-primary text-base">#{order.order_number}</span>
            {order.service_zone && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />{order.service_zone}
              </span>
            )}
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${config.color} inline-flex items-center gap-1`}>
              <StatusIcon className="w-3 h-3" />
              {order.status}
            </span>
          </div>

          <StatusStepper status={order.status} />

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>{formattedDate}</span>
            {order.payment_type && <span>Оплата: {order.payment_type}</span>}
            {order.delivery_type && <span>{order.delivery_type}</span>}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="font-bold text-lg text-foreground">
            {(order.total_amount || 0).toFixed(2)} грн
          </span>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
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
            <div className="border-t px-5 py-4 bg-muted/30 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                <InfoRow icon={User} label="Отримувач" value={order.recipient_name} />
                <InfoRow icon={User} label="Телефон" value={order.recipient_phone} />
                <InfoRow icon={User} label="Платник" value={order.payer_name} />
                <InfoRow icon={UserCog} label="Менеджер" value={order.manager_name} />
                <InfoRow icon={Hash} label="ТТН" value={order.ttn} />
                <InfoRow icon={MessageSquare} label="Коментар" value={order.comment} />
                <InfoRow icon={Link2} label="Макети" value={order.layout_url} isLink={!!order.layout_url} />
                <InfoRow icon={FileText} label="Рахунок-фактура" value={order.invoice_url} isLink={!!order.invoice_url} />
              </div>
              <OrderItems items={order.items} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}