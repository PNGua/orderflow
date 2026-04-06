import { useState } from "react";
import { format } from "date-fns";
import { uk } from "date-fns/locale";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import StatusBadge from "./StatusBadge";
import StatusStepper from "./StatusStepper";
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
        className={`w-full grid grid-cols-[auto_1fr_auto_auto_20px] items-center gap-3 px-4 py-3.5 text-sm transition-colors hover:bg-muted/50 ${
          expanded ? "bg-muted/40" : ""
        }`}
      >
        <div className="text-left min-w-[70px]">
          <span className="font-semibold text-foreground">#{order.order_number}</span>
          <div className="text-xs text-muted-foreground mt-0.5">{formattedDate}</div>
        </div>

        <div className="flex justify-center overflow-hidden">
          <StatusStepper status={order.status} />
        </div>

        <span className="text-right font-semibold text-foreground whitespace-nowrap">
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