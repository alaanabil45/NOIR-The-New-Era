"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";
import styles from "./ProductGallery.module.css";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <Image
          src={product.images[active].src}
          alt={product.images[active].alt}
          fill
          priority
          sizes="(min-width: 900px) 55vw, 100vw"
          className={styles.image}
        />
      </div>

      {product.images.length > 1 && (
        <div className={styles.thumbs}>
          {product.images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === active}
            >
              <Image src={image.src} alt="" fill sizes="80px" className={styles.thumbImage} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
