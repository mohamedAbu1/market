"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Cart = Record<number, number>;
type CartContextValue = { cart: Cart; add: (id: number) => void; remove: (id: number) => void; clearCart: () => void; count: number };
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({});
  const [ready, setReady] = useState(false);
  useEffect(() => { try { const saved = JSON.parse(localStorage.getItem("malek-cart") || "{}"); if (saved && typeof saved === "object") setCart(saved); } catch { /* recover with empty cart */ } setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem("malek-cart", JSON.stringify(cart)); }, [cart, ready]);
  const value = useMemo(() => ({ cart, add: (id: number) => setCart(current => ({ ...current, [id]: (current[id] ?? 0) + 1 })), remove: (id: number) => setCart(current => { const next = Math.max((current[id] ?? 0) - 1, 0); if (next === 0) { const { [id]: _removed, ...rest } = current; return rest; } return { ...current, [id]: next }; }), clearCart: () => setCart({}), count: Object.values(cart).reduce((total, quantity) => total + quantity, 0) }), [cart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
