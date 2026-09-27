"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./FabricReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

export function FabricReveal() {
  const sceneRef = useRef<HTMLElement>(null);
  const fabricRef = useRef<HTMLDivElement>(null);
  const garmentRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.set(garmentRef.current, { autoAlpha: 0, scale: 1.3 });
      gsap.set(modelRef.current, { autoAlpha: 0, scale: 1.08 });
      gsap.set(copyRef.current, { autoAlpha: 0, y: 24 });

      const mm = gsap.matchMedia();

      // Desktop/tablet: the full cinematic pinned distance.
      mm.add("(min-width: 768px)", () => {
        const tl = buildTimeline({ end: "+=300%", scrub: 0.8 });
        return () => tl.scrollTrigger?.kill();
      });

      // Mobile: same beats, roughly half the scroll distance and a
      // tighter scrub — less scroll-hijacking, still cinematic.
      mm.add("(max-width: 767px)", () => {
        const tl = buildTimeline({ end: "+=160%", scrub: 0.5 });
        return () => tl.scrollTrigger?.kill();
      });

      function buildTimeline({ end, scrub }: { end: string; scrub: number }) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sceneRef.current,
            start: "top top",
            end,
            scrub,
            pin: true,
          },
        });

        // 0–25%: extreme fabric detail, near-static, slow drift
        tl.to(fabricRef.current, { scale: 1.06, duration: 1, ease: "none" }, 0);

        // 25–50%: camera-like zoom picks up, copy appears
        tl.to(fabricRef.current, { scale: 1.4, duration: 1, ease: "none" }, 1);
        tl.to(copyRef.current, { autoAlpha: 1, y: 0, duration: 0.4, ease: "none" }, 1);

        // 50–75%: garment begins revealing under the fabric
        tl.to(fabricRef.current, { autoAlpha: 0, scale: 1.6, duration: 1, ease: "none" }, 2);
        tl.to(garmentRef.current, { autoAlpha: 1, scale: 1, duration: 1, ease: "none" }, 2);

        // 75–100%: pull back, reveal the person wearing it
        tl.to(garmentRef.current, { autoAlpha: 0, scale: 0.94, duration: 1, ease: "none" }, 3);
        tl.to(modelRef.current, { autoAlpha: 1, scale: 1, duration: 1, ease: "none" }, 3);
        tl.to(copyRef.current, { autoAlpha: 0, y: -16, duration: 0.4, ease: "none" }, 3);

        return tl;
      }
    }, sceneRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    // Static fallback: no pin, no scrub — just the end state, stacked.
    return (
      <section className={`scene ${styles.staticScene}`}>
        <div className={styles.staticImage}>
          <Image
            src="/images/looks/look-01.jpg"
            alt="Model wearing the structured wool jacket"
            fill
            sizes="100vw"
            className={styles.image}
          />
        </div>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>The Material</p>
          <p className={styles.meta}>Cotton / Wool / 02</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sceneRef} className={`scene ${styles.scene}`}>
      <div ref={fabricRef} className={styles.layer}>
        <Image
          src="/images/fabric/wool-macro-01.jpg"
          alt="Macro detail of woven wool fabric"
          fill
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div ref={garmentRef} className={styles.layer}>
        <Image
          src="/images/products/jacket-02.jpg"
          alt="Detail of the structured wool jacket"
          fill
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div ref={modelRef} className={styles.layer}>
        <Image
          src="/images/looks/look-01.jpg"
          alt="Model wearing the structured wool jacket"
          fill
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div ref={copyRef} className={styles.copy}>
        <p className={styles.eyebrow}>The Material</p>
        <p className={styles.meta}>Cotton / Wool / 02</p>
      </div>
    </section>
  );
}
