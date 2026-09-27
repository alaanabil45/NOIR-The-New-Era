"use client";

import { useState } from "react";
import { Header } from "./Header";
import { NavigationOverlay } from "./NavigationOverlay";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider, useCart } from "@/lib/CartContext";
import { SmoothScrollProvider } from "@/components/animation/SmoothScrollProvider";

function ShellInner({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { count } = useCart();

  return (
    <>
      <Header
        onMenuOpen={() => setMenuOpen(true)}
        cartCount={count}
        onCartOpen={() => setCartOpen(true)}
      />
      <NavigationOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      {children}
    </>
  );
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <SmoothScrollProvider>
        <ShellInner>{children}</ShellInner>
      </SmoothScrollProvider>
    </CartProvider>
  );
}
