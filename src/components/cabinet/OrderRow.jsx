import { useState } from "react";
import { format } from "date-fns";
import { ChevronDown, Clock, Loader2, CreditCard, Factory, Truck, PackageCheck, CheckCircle2, XCircle, Ban } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OrderDetails from "./OrderDetails";

const STATUS_CONFIG = {
  "Нове":        { color: "bg-blue-600 text-white",    icon: Clock },
  "В обробці":   { color: "bg-amber-400 text-white",   icon: Loader2 },
  "Оплачено":    { color: "bg-emerald-500 text-white", icon: CreditCard },
  "Виробництво": { color: "bg-purple-500 text-white",  icon: Factory },
  "Відправлено": { color: "bg-indigo-500 text-white",  icon: Truck },
  "Доставлено":  { color: "bg-teal-500 text-white",    icon: PackageCheck },
  "Виконано":    { color: "bg-green-600 text-white",   icon: CheckCircle2 },
  "Не вдалося":  { color: "bg-red-500 text-white",     icon: XCircle },
  "Скасовано":   { color: "bg-gray-400 text-white",    icon: Ban },
};

export default function OrderRow({ order }) {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = order.order_date
    ? format(new Date(order.order_date), "yyyy-MM-dd HH:mm")
    : "—";

  const config = STATUS_CONFIG[order.status] || STATUS_CONFIG["Нове"];
  const StatusIcon = config.icon;

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full flex items-center gap-4 px-6 py-4 text-sm transition-colors hover:bg-gray-50 ${
          expanded ? "bg-gray-50" : ""
        }`}
      >
        {/* Order number */}
        <span className="font-semibold text-blue-600 w-24 text-left shrink-0">
          #{order.order_number}
        </span>

        {/* Date */}
        <span className="text-gray-700 w-40 text-left shrink-0">
          {formattedDate}
        </span>

        {/* Spacer */}
        <span className="flex-1" />

        {/* Amount */}
        <span className="font-semibold text-gray-800 w-32 text-right shrink-0">
          {(order.total_amount || 0).toFixed(2)} грн
        </span>

        {/* Status badge */}
        <span
          className={`${config.color} rounded-full pl-2.5 pr-3.5 py-1.5 text-xs font-semibold inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap`}
        >
          <StatusIcon className="w-3 h-3 shrink-0" />
          {order.status}
        </span>

        {/* Chevron */}
        <ChevronDown
          className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden px-6 pb-4"
          >
            <OrderDetails order={order} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}