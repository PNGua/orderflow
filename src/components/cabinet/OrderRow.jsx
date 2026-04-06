import { useState } from "react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StatusBadge from "./StatusBadge";
import OrderDetails from "./OrderDetails";

export default function OrderRow({ order }) {
  const [expanded, setExpanded] = useState(false);

  const formattedDate = order.order_date
    ? format(new Date(order.order_date), "dd.MM.yyyy HH:mm")
    : "—";

  return (
    <div className="group">
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-full grid grid-cols-[1fr_1fr_1fr_1fr_36px] md:grid-cols-[1fr_1.2fr_1.2fr_0.8fr_36px] items-center gap-2 px-4 py-3.5 text-sm transition-colors hover:bg-muted/50 ${
          expanded ? "bg-muted/40" : ""
        }`}
      >
        <span className="text-left font-semibold text-foreground">
          {order.order_number}
        </span>
        <span className="text-left text-muted-foreground">{formattedDate}</span>
        <div className="text-left">
          <StatusBadge status={order.status} />
        </div>
        <span className="text-right font-semibold text-foreground">
          {(order.total_amount || 0).toFixed(2)} грн
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
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
            className="overflow-hidden px-4 pb-4"
          >
            <OrderDetails order={order} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}