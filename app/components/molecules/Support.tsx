"use client";

import React, { useState } from "react";
import { Stats } from "../atoms/Stats";

export const Support = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute bg-black bg-blend-luminosity inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/35 to-black/50" />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-32">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 justify-center items-center text-center max-w-4xl mx-auto">
          {/* Subtitle */}
          <div className="animate-fade-in">
            <p className="text-red-300 text-sm sm:text-base lg:text-lg font-semibold uppercase tracking-wider">
              Making a Difference
            </p>
          </div>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Fundraising for the People and{" "}
              <span className="bg-linear-to-r from-red-400 to-red-300 bg-clip-text text-transparent">
                Causes You Care About
              </span>
            </h1>
          </div>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-2xl leading-relaxed">
              Support the movements and causes that matter to you. Every
              donation makes a real impact.
            </p>
          </div>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              
              className="group relative cursor-pointer inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-wider text-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ease-out"
              style={{
                animation: isHovered ? "glowPulse 1.6s ease-in-out infinite" : "none",
                background: "linear-gradient(135deg, #dbb9b9 0%, #a24b4b 100%)",
                boxShadow: isHovered
                  ? "0 12px 30px rgba(230,195,195,0.45), 0 0 18px rgba(230,195,195,0.6)"
                  : "0 6px 14px rgba(0,0,0,0.15)",
                transform: isHovered ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              <div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                style={{
                  transform: isHovered
                    ? "translateX(100%)"
                    : "translateX(-100%)",
                  transition: "transform 0.5s",
                }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Give What You Can Now
                <svg
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
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
              <div
                className="absolute inset-0 bg-linear-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ zIndex: -1 }}
              />
            </button>
          </div>
          <Stats />
        </div>
      </div>
    </section>
  );
};
