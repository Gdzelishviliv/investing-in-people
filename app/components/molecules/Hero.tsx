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
    <section className="relative bg-black bg-blend-luminosity text-white overflow-hidden h-180 pt-20">
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1.20 }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        style={{
          backgroundImage: `url("https://i-p-c.org/wp-content/uploads/2022/03/footy-pic-4_ipc-scaled.jpeg")`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "grayscale(100%) contrast(1.1) brightness(0.7)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{amount:0.2}}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 text-balance">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
