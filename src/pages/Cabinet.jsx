import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import CabinetHeader from "../components/cabinet/CabinetHeader";
import OrdersTable from "../components/cabinet/OrdersTable";

export default function Cabinet() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => base44.entities.Order.list("-order_date"),
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <CabinetHeader orderCount={orders.length} />
        <OrdersTable orders={orders} isLoading={isLoading} />
      </div>
    </div>
  );
}