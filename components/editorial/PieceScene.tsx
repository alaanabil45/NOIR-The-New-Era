"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { getProductBySlug } from "@/data/products";
import styles from "./PieceScene.module.css";

gsap.registerPlugin(ScrollTrigger);

const jacket = getProductBySlug("structured-wool-jacket")!;

export function PieceScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const scene = sceneRef.current;
    const image = imageRef.current;

    if (!scene || !image) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        {
          yPercent: -6,
        },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: scene,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    }, scene);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sceneRef}
      className={`scene ${styles.scene}`}
    >
      <div className={styles.imageCol}>
        <div
          ref={imageRef}
          className={styles.imageWrap}
        >
          <Image
            src={jacket.images[0].src}
            alt={jacket.images[0].alt}
            fill
            sizes="(min-width: 900px) 60vw, 100vw"
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.textCol}>
        <p className={styles.eyebrow}>The Piece</p>

        <h2 className={styles.title}>
          {jacket.name}
        </h2>

        <p className={styles.description}>
          Structured. Minimal. Unapologetic.
        </p>

        <a
          href={`/product/${jacket.slug}`}
          className={styles.cta}
        >
          View piece
        </a>
      </div>
    </section>
  );
}