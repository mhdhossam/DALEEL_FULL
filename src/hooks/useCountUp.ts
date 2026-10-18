import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "framer-motion";

/**
 * Animates a number from 0 → target when the element scrolls into view.
 *
 * @param target  – the final numeric value to count up to
 * @param duration – animation duration in seconds (default 2)
 * @returns { ref, count } – attach `ref` to the element, read `count` for display
 */
export function useCountUp(target: number, duration = 2) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        const controls = animate(0, target, {
            duration,
            ease: "easeOut",
            onUpdate: (v) => setCount(Math.round(v)),
        });
        return () => controls.stop();
    }, [isInView, target, duration]);

    return { ref, count };
}
