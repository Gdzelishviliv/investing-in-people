"use client";

import { FOOTER_CONTACT, FOOTER_CTA, FOOTER_META } from "@/app/constants/footerData";
import { motion } from "framer-motion";
import { useState } from "react";

export function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <footer className="bg-[#2f2f2f] text-[#e3e4e4]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col w-62.5 gap-5"
          >
            <h2 className="text-3xl font-semibold leading-snug max-w-md">
              {FOOTER_CTA.title}
            </h2>
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}

              className="group relative cursor-pointer gap-1 inline-flex items-center justify-center px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold uppercase tracking-wider text-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ease-out"
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
              <div
                className="absolute inset-0 bg-linear-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ zIndex: -1 }}
              />
              <span className="bg-white text-red-500 p-2 rounded-full">
                <FOOTER_CTA.button.icon size={16} fill="currentColor" />
              </span>
              {FOOTER_CTA.button.label}
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">
              {FOOTER_CONTACT.title}
            </h3>
            <ul className="space-y-5 text-slate-300">
              {FOOTER_CONTACT.items.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.id}
                    className={`flex gap-4 ${index !== FOOTER_CONTACT.items.length - 1
                      ? "border-b border-white/10 pb-4"
                      : ""
                      }`}
                  >
                    <Icon className="text-[#8b1e1e] mt-1" size={18} />
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-[#dbb9b9] hover:text-[#8b1e1e] transition"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-[#dbb9b9]">{item.text}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="max-w-7xl text-center mx-auto px-6 text-sm text-[#e3e4e4]">
          <p>
            © {new Date().getFullYear()} {FOOTER_META.charityName}. Charity Number{" "}
            {FOOTER_META.charityNumber}. Reg. Office:{" "}
            {FOOTER_META.registeredOffice}
          </p>
        </div>
      </div>
    </footer>
  );
}
