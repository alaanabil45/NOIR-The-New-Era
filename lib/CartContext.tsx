"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/products";

export interface CartLine {
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  addToCart: (product: Product, size: string) => void;
  removeLine: (productId: string, size: string) => void;
  setQuantity: (
    productId: string,
    size: string,
    quantity: number
  ) => void;
  subtotal: number;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "noir-cart";

export function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Important:
  // Start with the same value on server and client.
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load cart AFTER the component mounts in the browser.
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setLines(parsedCart);
        }
      }
    } catch (error) {
      console.error("Failed to load cart:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save cart whenever it changes,
  // but don't overwrite localStorage before we've loaded it.
  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(lines)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [lines, hydrated]);

  function addToCart(product: Product, size: string) {
    setLines((prev) => {
      const existing = prev.find(
        (line) =>
          line.product.id === product.id &&
          line.size === size
      );

      if (existing) {
        return prev.map((line) =>
          line === existing
            ? {
              ...line,
              quantity: line.quantity + 1,
            }
            : line
        );
      }

      return [
        ...prev,
        {
          product,
          size,
          quantity: 1,
        },
      ];
    });
  }

  function removeLine(productId: string, size: string) {
    setLines((prev) =>
      prev.filter(
        (line) =>
          !(
            line.product.id === productId &&
            line.size === size
          )
      )
    );
  }

  function setQuantity(
    productId: string,
    size: string,
    quantity: number
  ) {
    if (quantity < 1) {
      removeLine(productId, size);
      return;
    }

    setLines((prev) =>
      prev.map((line) =>
        line.product.id === productId &&
          line.size === size
          ? {
            ...line,
            quantity,
          }
          : line
      )
    );
  }

  const subtotal = useMemo(() => {
    return lines.reduce(
      (sum, line) =>
        sum +
        line.product.price * line.quantity,
      0
    );
  }, [lines]);

  const count = useMemo(() => {
    return lines.reduce(
      (sum, line) => sum + line.quantity,
      0
    );
  }, [lines]);

  return (
    <CartContext.Provider
      value={{
        lines,
        addToCart,
        removeLine,
        setQuantity,
        subtotal,
        count,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error(
      "useCart must be used within a CartProvider"
    );
  }

  return ctx;
}