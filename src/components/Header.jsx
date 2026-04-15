import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Facebook, Instagram, Youtube, Search, ShoppingCart, Menu, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto flex flex-wrap items-center justify-between text-xs px-4 lg:px-8 gap-2">
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3" />
            <span>+38 073 933 88 95</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <a href="#" className="hover:opacity-80"><Facebook className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:opacity-80"><Instagram className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:opacity-80"><Youtube className="w-3.5 h-3.5" /></a>
            </div>
            <Link to="/calculator" className="px-3 py-1 rounded-full border border-white/60 hover:bg-white/20 transition-colors">Калькулятор</Link>
            <Link to="/qna" className="hover:opacity-80">Q&A</Link>
            <Link to="/delivery" className="hover:opacity-80">Оплата і доставка</Link>
            <Link to="/blog" className="hover:opacity-80">Блог</Link>
            <Link to="/contacts" className="hover:opacity-80">Контакти</Link>
            <Link to="/cabinet" className="flex items-center gap-1 hover:opacity-80">
              <User className="w-3 h-3" />
              Усік Андрій
            </Link>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="container mx-auto flex items-center justify-between py-3 px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex flex-col items-start leading-tight">
            <div className="flex items-end gap-1">
              <span className="text-2xl font-bold text-primary border border-primary px-1">PNG</span>
              <span className="text-lg font-bold text-foreground">druk</span>
            </div>
            <span className="text-[9px] text-muted-foreground font-medium">Фабрика друку та брендування</span>
            <span className="bg-primary text-primary-foreground text-[8px] px-1 rounded">PART OF PNG GROUP</span>
          </Link>
          <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
            <Menu className="w-4 h-4" />
            Замовити друк
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Я шукаю..."
              className="pl-4 pr-10 py-2 rounded-full border border-input w-56 lg:w-72"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full p-1.5">
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-foreground" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">0</span>
            </div>
            <span className="text-xs text-muted-foreground">Кошик</span>
          </div>
        </div>
      </div>
    </header>
  );
}