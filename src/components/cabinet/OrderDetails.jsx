import { format } from "date-fns";
import { uk } from "date-fns/locale";
import StatusBadge from "./StatusBadge";
import OrderItems from "./OrderItems";
import {
  CreditCard, User, Phone, MapPin, Truck, 
  FileText, Link2, Hash, MessageSquare, UserCog
} from "lucide-react";

function DetailRow({ icon: Icon, label, value, isLink }) {
  if (!value || value === "-----") return null;
  return (
    <div className="flex items-start gap-2.5 text-sm">
      <Icon className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
      <span className="text-muted-foreground shrink-0">{label}:</span>
      {isLink ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary font-medium hover:underline truncate"
        >
          Переглянути
        </a>
      ) : (
        <span className="font-medium text-foreground break-all">{value}</span>
      )}
    </div>
  );
}

export default function OrderDetails({ order }) {
  const formattedDate = order.order_date
    ? format(new Date(order.order_date), "d MMMM yyyy, HH:mm", { locale: uk })
    : "—";

  return (
    <div className="bg-muted/30 border border-border/60 rounded-xl p-5 mt-1 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        {/* Left column */}
        <div className="space-y-3">
          <DetailRow icon={Hash} label="Номер замовлення" value={order.order_number} />
          <DetailRow
            icon={CreditCard}
            label="Сума замовлення"
            value={`${(order.total_amount || 0).toFixed(2)} грн`}
          />
          <DetailRow icon={CreditCard} label="Тип оплати" value={order.payment_type} />
          <DetailRow
            icon={User}
            label="Отримувач"
            value={
              order.recipient_name
                ? `${order.recipient_name}${order.recipient_phone ? ` ${order.recipient_phone}` : ""}`
                : null
            }
          />
          <div className="flex items-start gap-2.5 text-sm">
            <FileText className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
            <span className="text-muted-foreground shrink-0">Статус:</span>
            <StatusBadge status={order.status} />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-3">
          <DetailRow icon={FileText} label="Дата та час замовлення" value={formattedDate} />
          <DetailRow icon={Truck} label="Тип доставки" value={order.delivery_type} />
          <DetailRow icon={User} label="Платник" value={order.payer_name} />
          <DetailRow icon={UserCog} label="Менеджер" value={order.manager_name} />
          <DetailRow icon={Link2} label="Посилання на макети" value={order.layout_url} isLink={!!order.layout_url} />
        </div>
      </div>

      <div className="border-t pt-3 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
          <DetailRow icon={FileText} label="Рахунок фактура" value={order.invoice_url} isLink={!!order.invoice_url} />
          <DetailRow icon={Hash} label="ТТН замовлення" value={order.ttn} />
          <DetailRow icon={MapPin} label="Зона обслуговування" value={order.service_zone} />
          <DetailRow icon={MessageSquare} label="Коментар" value={order.comment} />
        </div>
      </div>

      <OrderItems items={order.items} />
    </div>
  );
}