"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/data/products";
import styles from "./ProductCard.module.css";

export function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const secondImage = product.images[1] ?? product.images[0];

  return (
    <a
      href={`/product/${product.slug}`}
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.imageWrap}>
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className={`${styles.image} ${hovered ? styles.imageHidden : ""}`}
        />
        <Image
          src={secondImage.src}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className={`${styles.image} ${hovered ? "" : styles.imageHidden}`}
        />
        {product.newArrival && <span className={styles.badge}>New</span>}
      </div>

      <div className={styles.info}>
        <span>{product.name}</span>
        <span>${product.price}</span>
      </div>
    </a>
  );
}
