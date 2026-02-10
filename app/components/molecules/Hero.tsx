"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Welcome to Investing in People and Culture",
    subtitle:
      "Supporting refugees and people seeking asylum across the North East",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[600px] sm:min-h-[700px] lg:min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Animation */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{
          scale: {
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
          },
          opacity: {
            duration: 1,
            ease: "easeOut",
          },
        }}
        style={{
          backgroundImage: `url("https://i-p-c.org/wp-content/uploads/2022/03/footy-pic-4_ipc-scaled.jpeg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(100%) contrast(1.1) brightness(0.6)",
        }}
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10 flex items-center justify-center min-h-[600px] sm:min-h-[700px] lg:min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8"
          >
            {/* Glass container for text */}
            <div className="glass-dark rounded-3xl p-8 sm:p-10 lg:p-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white"
              >
                {slides[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mt-6 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "h-2 w-8 bg-white"
                  : "h-2 w-2 bg-white/50 hover:bg-white/75"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
