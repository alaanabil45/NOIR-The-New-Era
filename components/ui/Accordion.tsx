"use client";

import { useState } from "react";
import styles from "./Accordion.module.css";

export function Accordion({
  items,
}: {
  items: { title: string; content: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.title} className={styles.item}>
            <button
              type="button"
              className={styles.trigger}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{item.title}</span>
              <span aria-hidden>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <p className={styles.content}>{item.content}</p>}
          </div>
        );
      })}
    </div>
  );
}
