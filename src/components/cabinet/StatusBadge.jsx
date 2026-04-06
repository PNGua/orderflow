import { Badge } from "@/components/ui/badge";
import { 
  Clock, Loader2, CreditCard, Factory, Truck, 
  PackageCheck, CheckCircle2, XCircle, Ban 
} from "lucide-react";

const statusConfig = {
  "Нове": { icon: Clock, className: "bg-blue-50 text-blue-700 border-blue-200" },
  "В обробці": { icon: Loader2, className: "bg-amber-50 text-amber-700 border-amber-200" },
  "Оплачено": { icon: CreditCard, className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  "Виробництво": { icon: Factory, className: "bg-purple-50 text-purple-700 border-purple-200" },
  "Відправлено": { icon: Truck, className: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  "Доставлено": { icon: PackageCheck, className: "bg-teal-50 text-teal-700 border-teal-200" },
  "Виконано": { icon: CheckCircle2, className: "bg-green-50 text-green-700 border-green-200" },
  "Не вдалося": { icon: XCircle, className: "bg-red-50 text-red-700 border-red-200" },
  "Скасовано": { icon: Ban, className: "bg-gray-50 text-gray-500 border-gray-200" },
};

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig["Нове"];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={`${config.className} gap-1.5 px-2.5 py-1 font-medium text-xs`}>
      <Icon className="w-3 h-3" />
      {status}
    </Badge>
  );
}