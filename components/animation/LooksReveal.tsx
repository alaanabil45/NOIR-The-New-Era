"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

/**
 * Renders nothing. Finds every [data-look] block on the page and gives it
 * a single, quiet reveal: the photo opens with a soft clip-path while easing
 * down from a slight zoom, then the text follows with a small rise.
 * One-shot (plays once, no scrubbing), so it stays light.
 */
export function LooksReveal() {
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion) return;

        const ctx = gsap.context(() => {
            gsap.from("[data-looks-header] > *", {
                autoAlpha: 0,
                y: 16,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
            });

            gsap.utils.toArray<HTMLElement>("[data-look]").forEach((block) => {
                const frame = block.querySelector<HTMLElement>("[data-look-frame]");
                const image = block.querySelector<HTMLElement>("img");
                const info = block.querySelectorAll("[data-look-info] > *");

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: block,
                        start: "top 80%",
                        once: true,
                    },
                });

                if (frame) {
                    tl.fromTo(
                        frame,
                        { clipPath: "inset(10% 0 0 0)", autoAlpha: 0 },
                        {
                            clipPath: "inset(0% 0 0 0)",
                            autoAlpha: 1,
                            duration: 1.1,
                            ease: "power3.out",
                        },
                        0
                    );
                }

                if (image) {
                    tl.fromTo(
                        image,
                        { scale: 1.06 },
                        { scale: 1, duration: 1.4, ease: "power2.out" },
                        0
                    );
                }

                if (info.length) {
                    tl.from(
                        info,
                        {
                            autoAlpha: 0,
                            y: 18,
                            duration: 0.7,
                            stagger: 0.08,
                            ease: "power3.out",
                        },
                        0.25
                    );
                }
            });
        });

        return () => ctx.revert();
    }, [reducedMotion]);

    return null;
}