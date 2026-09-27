"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/lib/CartContext";
import styles from "./PurchasePanel.module.css";

export function PurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();

  function handleAdd() {
    if (!size) return;
    addToCart(product, size);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className={styles.panel}>
      <div>
        <p className={styles.eyebrow}>Color</p>
        <p className={styles.value}>{product.colors[0]}</p>
      </div>

      <div>
        <p className={styles.eyebrow}>Size</p>
        <div className={styles.sizes}>
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              className={`${styles.sizeButton} ${size === s ? styles.sizeActive : ""}`}
              onClick={() => setSize(s)}
              aria-pressed={size === s}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className={styles.addButton}
        onClick={handleAdd}
        disabled={!size}
      >
        {justAdded ? "Added" : "Add to bag"}
      </button>

      {!size && <p className={styles.hint}>Select a size</p>}
    </div>
  );
}
