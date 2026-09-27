"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useCart } from "@/lib/CartContext";
import styles from "./CartDrawer.module.css";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const drawerRef = useRef<HTMLElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);

  const { lines, removeLine, setQuantity, subtotal } = useCart();

  useEffect(() => {
    const drawer = drawerRef.current;
    const scrim = scrimRef.current;

    if (!drawer || !scrim) return;

    // Stop any previous animation
    gsap.killTweensOf([drawer, scrim]);

    if (open) {
      // Make sure drawer is visible before animating
      gsap.set(drawer, {
        x: "0%",
        autoAlpha: 1,
      });

      gsap.set(scrim, {
        autoAlpha: 1,
        pointerEvents: "auto",
      });

      // Small entrance animation
      gsap.fromTo(
        drawer,
        {
          x: "100%",
        },
        {
          x: "0%",
          duration: 0.5,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(drawer, {
        x: "100%",
        duration: 0.4,
        ease: "power3.inOut",
      });

      gsap.to(scrim, {
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: "none",
      });
    }

    return () => {
      gsap.killTweensOf([drawer, scrim]);
    };
  }, [open]);

  // Prevent page scrolling while cart is open
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // Escape closes cart
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <>
      <div
        ref={scrimRef}
        className={styles.scrim}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        ref={drawerRef}
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>YOUR</span>
            <h2>Bag</h2>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        {lines.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.empty}>Your bag is empty.</p>

            <button
              type="button"
              className={styles.continueShopping}
              onClick={onClose}
            >
              Continue shopping
            </button>
          </div>
        ) : (
          <ul className={styles.lines}>
            {lines.map((line) => {
              const image = line.product.images?.[0];

              return (
                <li
                  key={`${line.product.id}-${line.size}`}
                  className={styles.line}
                >
                  <div className={styles.thumb}>
                    {image && (
                      <Image
                        src={image.src}
                        alt={image.alt || line.product.name}
                        fill
                        sizes="64px"
                        className={styles.thumbImage}
                      />
                    )}
                  </div>

                  <div className={styles.lineInfo}>
                    <span className={styles.productName}>
                      {line.product.name}
                    </span>

                    <span className={styles.lineMeta}>
                      Size {line.size} · ${line.product.price}
                    </span>

                    <div className={styles.quantityRow}>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(
                            line.product.id,
                            line.size,
                            line.quantity - 1
                          )
                        }
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>

                      <span>{line.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(
                            line.product.id,
                            line.size,
                            line.quantity + 1
                          )
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className={styles.remove}
                    onClick={() =>
                      removeLine(line.product.id, line.size)
                    }
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <footer className={styles.footer}>
          <div className={styles.subtotalRow}>
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>

          <a
            href="/checkout"
            className={`${styles.checkout} ${lines.length === 0 ? styles.checkoutDisabled : ""}`}
            aria-disabled={lines.length === 0}
            onClick={(e) => {
              if (lines.length === 0) e.preventDefault();
            }}
          >
            Checkout
          </a>
        </footer>
      </aside>
    </>
  );
}