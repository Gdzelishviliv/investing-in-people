"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Stats } from "../atoms/Stats";

export const Support = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 justify-center items-center text-center max-w-4xl mx-auto">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-accent text-sm sm:text-base lg:text-lg font-semibold uppercase tracking-widest">
              Making a Difference
            </p>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight text-balance">
              Support the Causes{" "}
              <span className="bg-linear-to-r from-accent to-red-300 bg-clip-text text-transparent">
                You Care About
              </span>
            </h2>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-2xl leading-relaxed">
              Every donation makes a real impact on the lives of refugees, asylum seekers, and communities we serve. Join us in making a difference.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative cursor-pointer inline-flex items-center justify-center px-8 sm:px-10 lg:px-12 py-4 sm:py-5 text-sm sm:text-base font-semibold uppercase tracking-wider text-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ease-out"
              style={{
                animation: isHovered ? "glowPulse 1.6s ease-in-out infinite" : "none",
                background: "linear-gradient(135deg, #dbb9b9 0%, #a24b4b 100%)",
                boxShadow: isHovered
                  ? "0 12px 30px rgba(219, 185, 185, 0.5), 0 0 28px rgba(219, 185, 185, 0.6)"
                  : "0 6px 14px rgba(0, 0, 0, 0.2)",
                transform: isHovered ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              <div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                style={{
                  transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
                  transition: "transform 0.5s",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Give What You Can
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="pt-6 sm:pt-8"
          >
            <Stats />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
