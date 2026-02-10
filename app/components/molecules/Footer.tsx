"use client";

import { FOOTER_CONTACT, FOOTER_CTA, FOOTER_META } from "@/app/constants/footerData";
import { motion } from "framer-motion";
import { useState } from "react";

export function Footer() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <footer className="w-full bg-neutral-900 text-muted-foreground border-t border-white/10">
      {/* Main content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col w-62.5 gap-5"
          >
            <h2 className="text-3xl font-bold leading-snug max-w-md text-white">
              {FOOTER_CTA.title}
            </h2>
            <motion.button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative cursor-pointer inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-semibold uppercase tracking-wider text-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
              style={{
                animation: isHovered ? "glowPulse 1.6s ease-in-out infinite" : "none",
                background: "linear-gradient(135deg, #dbb9b9 0%, #a24b4b 100%)",
                boxShadow: isHovered
                  ? "0 12px 30px rgba(219, 185, 185, 0.5), 0 0 28px rgba(219, 185, 185, 0.6)"
                  : "0 6px 14px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                style={{
                  transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
                  transition: "transform 0.5s",
                }}
              />
              <span className="relative z-10 bg-white text-primary p-2 rounded-full">
                <FOOTER_CTA.button.icon size={18} fill="currentColor" />
              </span>
              <span className="relative z-10">{FOOTER_CTA.button.label}</span>
            </motion.button>
          </motion.div>
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-white">
              {FOOTER_CONTACT.title}
            </h3>

            <ul className="space-y-5">
              {FOOTER_CONTACT.items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={`flex gap-4 ${
                      index !== FOOTER_CONTACT.items.length - 1
                        ? "border-b border-white/10 pb-4"
                        : ""
                    }`}
                  >
                    <Icon className="text-accent mt-1 flex-shrink-0" size={20} />
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-muted-foreground hover:text-accent transition-colors duration-300"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{item.text}</span>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="border-t border-white/10 py-6 sm:py-8 bg-neutral-950">
        <div className="container text-center mx-auto px-4 text-xs sm:text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {FOOTER_META.charityName}. Charity Number{" "}
            {FOOTER_META.charityNumber}. Reg. Office: {FOOTER_META.registeredOffice}
          </p>
        </div>
      </div>
    </footer>
  );
}
