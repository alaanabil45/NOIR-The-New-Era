"use client";

import styles from "./Header.module.css";

interface HeaderProps {
  onMenuOpen: () => void;
  cartCount: number;
  onCartOpen: () => void;
}

export function Header({ onMenuOpen, cartCount, onCartOpen }: HeaderProps) {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.wordmark}>
        NØIR
      </a>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.bag}
          onClick={onCartOpen}
          aria-label={`Bag, ${cartCount} item${cartCount === 1 ? "" : "s"}`}
        >
          Bag
          {cartCount > 0 && <span className={styles.count}>{cartCount}</span>}
        </button>

        <button
          type="button"
          className={styles.menu}
          onClick={onMenuOpen}
          aria-haspopup="true"
        >
          Menu
        </button>
      </div>
    </header>
  );
}
