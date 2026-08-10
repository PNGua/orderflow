import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'pngdruk-cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const saveItems = (next) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addItem = (item) => saveItems([...items, { ...item, cartId: `${item.id}-${Date.now()}` }]);
  const updateQty = (cartId, delta) => saveItems(items.map((item) => item.cartId === cartId ? { ...item, qty: Math.max(0, item.qty + delta) } : item).filter((item) => item.qty > 0));
  const removeItem = (cartId) => saveItems(items.filter((item) => item.cartId !== cartId));
  const clearCart = () => saveItems([]);

  const value = useMemo(() => ({ items, addItem, updateQty, removeItem, clearCart, count: items.reduce((sum, item) => sum + item.qty, 0) }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}