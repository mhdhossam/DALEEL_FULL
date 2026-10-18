import { useState, useEffect } from "react";

/**
 * Manages dark mode with localStorage persistence and system preference fallback.
 *
 * @returns { isDark, toggleDark } – current state and a toggle function
 */
export function useDarkMode() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved === "dark";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDark]);

    const toggleDark = () => setIsDark((prev) => !prev);

    return { isDark, toggleDark };
}
