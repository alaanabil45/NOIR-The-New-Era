"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./NavigationOverlay.module.css";

interface NavigationOverlayProps {
  open: boolean;
  onClose: () => void;
}

const LINKS = [
  { label: "Issue 001", href: "/#cover" },
  { label: "Collection", href: "/#collection" },
  { label: "Shop", href: "/#shop" },
  { label: "About", href: "/about" },
];

export function NavigationOverlay({ open, onClose }: NavigationOverlayProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const links = linkRefs.current.filter(Boolean) as HTMLLIElement[];

    if (open) {
      gsap.set(panel, { display: "flex" });
      gsap.fromTo(
        panel,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.out" }
      );
      gsap.fromTo(
        links,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(panel, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(panel, { display: "none" });
        },
      });
    }
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className={styles.panel}
      style={{ display: "none" }}
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <button type="button" className={styles.close} onClick={onClose}>
        Close
      </button>

      <nav>
        <ul className={styles.links}>
          {LINKS.map((link, i) => (
            <li
              key={link.href}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
            >
              <a href={link.href} onClick={onClose}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className={styles.meta}>NØIR — Issue 001, The New Era</p>
    </div>
  );
}
