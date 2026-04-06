import { User, Wallet, Tag, CreditCard, Users, UserCog, ShoppingBag } from "lucide-react";

const MENU_ITEMS = [
  { key: "user",       label: "Користувач",    icon: User },
  { key: "balance",    label: "Баланс",         icon: Wallet },
  { key: "discounts",  label: "Знижки",         icon: Tag },
  { key: "payers",     label: "Платники",       icon: CreditCard },
  { key: "recipients", label: "Отримувачі",     icon: Users },
  { key: "managers",   label: "Менеджери",      icon: UserCog },
  { key: "orders",     label: "Мої замовлення", icon: ShoppingBag },
];

export default function CabinetSidebar({ active, onSelect }) {
  return (
    <aside className="w-full md:w-60 shrink-0">
      <nav className="bg-card border rounded-xl overflow-hidden shadow-sm">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b last:border-b-0 text-left
                ${isActive
                  ? "bg-teal-700 text-white font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}