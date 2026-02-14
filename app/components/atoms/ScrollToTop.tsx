"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const toggleVisibility = () => {
            // Clear any pending timeout
            clearTimeout(timeoutId);

            // Use a debounce to prevent rapid state changes
            timeoutId = setTimeout(() => {
                const shouldShow = window.scrollY > 400;
                setIsVisible(shouldShow);
            }, 50);
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed cursor-pointer bottom-8 right-8 z-50 p-3 sm:p-4 rounded-full bg-[#8b1e1e] hover:bg-[#631515] text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-y-1 transition-transform duration-300" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
