import { useState } from "react";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import OrderDetails from "./OrderDetails";

const STATUS_COLORS = {
  "Нове":        "bg-blue-600 text-white",
  "В обробці":   "bg-amber-400 text-white",
  "Оплачено":    "bg-emerald-500 text-white",
  "Виробництво": "bg-purple-500 text-white",
  "Відправлено": "bg-indigo-500 text-white",
  "Доставлено":  "bg-teal-500 text-white",
  "Виконано":    "bg-green-500 text-white",
  "Не вдалося":  "bg-red-500 text-white",
  "Скасовано":   "bg-gray-400 text-white",
};

export default function OrderRow({ order }) {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = order.order_date
    ? format(new Date(order.order_date), "yyyy-MM-dd HH:mm")
    : "—";

  const badgeClass = STATUS_COLORS[order.status] || "bg-blue-600 text-white";

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
          className={`${badgeClass} rounded-full px-5 py-2 text-sm font-semibold w-36 text-center shrink-0`}
        >
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