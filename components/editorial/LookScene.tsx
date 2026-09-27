"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/lib/useReducedMotion";
import { looks, products } from "@/data/products";
import styles from "./LookScene.module.css";

gsap.registerPlugin(ScrollTrigger);

const look = looks[0];
const lookProducts = look.productIds
  .map((id) => products.find((p) => p.id === id))
  .filter(Boolean) as typeof products;

export function LookScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 32 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sceneRef.current,
            start: "top 20%",
          },
        }
      );
    }, sceneRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sceneRef} className={`scene ${styles.scene}`}>
      <div className={styles.imageWrap}>
        <div ref={imageRef} className={styles.imageScale}>
          <Image
            src={look.image.src}
            alt={look.image.alt}
            fill
            sizes="100vw"
            className={styles.image}
          />
        </div>
      </div>

      <div ref={panelRef} className={styles.panel}>
        <p className={styles.label}>{look.name}</p>
        <ul className={styles.items}>
          {lookProducts.map((product) => (
            <li key={product.id}>
              <span>{product.name}</span>
              <span>${product.price}</span>
            </li>
          ))}
        </ul>
        <a href={`/look/${look.slug}`} className={styles.cta}>
          Shop the look
        </a>
      </div>
    </section>
  );
}
