import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CabinetSidebar from "@/components/cabinet/CabinetSidebar";
import OrdersTable from "@/components/cabinet/OrdersTable";
import PlaceholderSection from "@/components/cabinet/PlaceholderSection";
import UserSection from "@/components/cabinet/UserSection";
import BalanceSection from "@/components/cabinet/BalanceSection";
import PayersSection from "@/components/cabinet/PayersSection";
import RecipientsSection from "@/components/cabinet/RecipientsSection";

const SECTION_TITLES = {
  user:       "Користувач",
  balance:    "Баланс",
  discounts:  "Знижки",
  payers:     "Платники",
  recipients: "Отримувачі",
  managers:   "Менеджери",
};

export default function Cabinet() {
  const [section, setSection] = useState("orders");

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => base44.entities.Order.list("-order_date"),
    enabled: section === "orders",
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Головна</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">Особистий кабінет</span>
          </nav>

          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
            Особистий кабінет
          </h1>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            <CabinetSidebar active={section} onSelect={setSection} />

            <div className="flex-1 min-w-0">
              {section === "orders" ? (
                <OrdersTable orders={orders} isLoading={isLoading} />
              ) : section === "user" ? (
                <UserSection />
              ) : section === "balance" ? (
                <BalanceSection />
              ) : section === "payers" ? (
                <PayersSection />
              ) : section === "recipients" ? (
                <RecipientsSection />
              ) : (
                <PlaceholderSection title={SECTION_TITLES[section]} />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}