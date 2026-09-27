"use client";

import { useEffect, useState } from "react";

/**
 * Reads prefers-reduced-motion once and subscribes to changes.
 * Every scroll-scrubbed or pinned scene should gate its GSAP setup
 * behind this — never build a full ScrollTrigger timeline and then
 * try to disable it after the fact.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}
