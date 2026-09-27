"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./CoverScene.module.css";

gsap.registerPlugin(ScrollTrigger);

export function CoverScene() {
  const sceneRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const issueRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      })
        .to(imageRef.current, { scale: 1.15, ease: "none" }, 0)
        .to(issueRef.current, { x: "-8vw", opacity: 0, ease: "none" }, 0)
        .to(titleRef.current, { x: "6vw", opacity: 0, ease: "none" }, 0);
    }, sceneRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="cover" ref={sceneRef} className={`scene ${styles.scene}`}>
      <div ref={imageRef} className={styles.imageWrap}>
        <Image
          src="/images/editorial/cover-01.jpg"
          alt="NØIR Issue 001 — editorial cover photograph"
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <p ref={issueRef} className={styles.issue}>
          Issue 001
        </p>
        <h1 ref={titleRef} className={styles.title}>
          The New Era
        </h1>
      </div>
    </section>
  );
}
