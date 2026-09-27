"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useReducedMotion } from "@/lib/useReducedMotion";
import styles from "./EditorialStory.module.css";

gsap.registerPlugin(ScrollTrigger);

export function EditorialStory() {
  const sceneRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const imageARef = useRef<HTMLDivElement>(null);
  const imageBRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const words = wordRefs.current.filter(Boolean) as HTMLSpanElement[];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sceneRef.current,
          start: "top 70%",
          end: "bottom 40%",
          scrub: 0.8,
        },
      });

      // Each word moves on its own axis — none of them fade-and-slide-up
      // in unison, which is what would read as a generic entrance.
      tl.fromTo(words[0], { xPercent: -30, opacity: 0.15 }, { xPercent: 0, opacity: 1, ease: "none" }, 0);
      tl.fromTo(words[1], { scale: 0.85, opacity: 0.15 }, { scale: 1, opacity: 1, ease: "none" }, 0.1);
      tl.fromTo(words[2], { xPercent: 30, opacity: 0.15 }, { xPercent: 0, opacity: 1, ease: "none" }, 0.2);

      tl.fromTo(imageARef.current, { yPercent: 12 }, { yPercent: -6, ease: "none" }, 0);
      tl.fromTo(imageBRef.current, { yPercent: -8 }, { yPercent: 10, ease: "none" }, 0);
    }, sceneRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sceneRef} className={`scene ${styles.scene}`}>
      <div ref={imageARef} className={styles.imageA}>
        <Image
          src="/images/editorial/story-01.jpg"
          alt="Editorial photograph, frame one"
          fill
          sizes="(min-width: 900px) 45vw, 80vw"
          className={styles.image}
        />
      </div>

      <div ref={imageBRef} className={styles.imageB}>
        <Image
          src="/images/editorial/story-02.jpg"
          alt="Editorial photograph, frame two"
          fill
          sizes="(min-width: 900px) 32vw, 60vw"
          className={styles.image}
        />
      </div>

      <h2 className={styles.words}>
        <span
          ref={(el) => {
            wordRefs.current[0] = el;
          }}
          className={styles.word}
        >
          Wear
        </span>{" "}
        <span
          ref={(el) => {
            wordRefs.current[1] = el;
          }}
          className={styles.word}
        >
          your
        </span>{" "}
        <span
          ref={(el) => {
            wordRefs.current[2] = el;
          }}
          className={styles.word}
        >
          identity.
        </span>
      </h2>
    </section>
  );
}
