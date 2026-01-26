"use client";

import { useEffect, useState } from "react";
import { motion, scale } from "framer-motion";
import { Network, Handshake, Users, ThumbsUp } from "lucide-react";
import { filter } from "framer-motion/client";

const statistics = [
  { value: 898, label: "People supported this year", icon: Network },
  {
    value: 50,
    label: "Ukrainian families flown to UK and supported with integration",
    icon: Handshake,
  },
  { value: 61, label: "started first UK job this year", icon: Users },
  { value: 86, label: "Medics retraining for NHS", icon: ThumbsUp },
];

const DURATION = 1800;

export function Stats() {
  const [counts, setCounts] = useState(statistics.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animateCount = (index: number, target: number, startTime: number) => {
      const update = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / DURATION, 1);
        const eased = easeOutCubic(progress);

        setCounts((prev) => {
          const next = [...prev];
          next[index] = Math.round(eased * target);
          return next;
        });

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      };

      requestAnimationFrame(update);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);

          statistics.forEach((stat, index) => {
            animateCount(index, stat.value, performance.now());
          });
        }
      },
      { threshold: 0.5 },
    );

    const element = document.getElementById("stats-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="stats-section" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 hover:border-orange-300/50 hover:bg-orange-300/10 transition-all duration-300"
          style={{
            borderColor: "rgba(255,255,255,0.2)",
            boxShadow: "0 0 0 rgba(255,107,53,0)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,107,53,0.6)";
            e.currentTarget.style.boxShadow =
              "0 0 20px rgba(255,107,53,0.35), 0 0 45px rgba(255,107,53,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.boxShadow = "0 0 0 rgba(255,107,53,0)";
          }}
        >
          {statistics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 1 }}
                viewport={{ amount: 0.5 }}
                className="relative text-center space-y-4 rounded-xl p-4 group"
              >
                <div className="flex justify-center">
                  <motion.div
                    animate={{
                      filter: [
                        "drop-shadow(0 0 0px rgba(255,107,53,0))",
                        "drop-shadow(0 0 10px rgba(255,107,53,0.35))",
                        "drop-shadow(0 0 0px rgba(255,107,53,0))",
                      ],
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    whileHover={{
                      scale: 1.25,
                      rotate: 360,
                      filter:
                        "drop-shadow(0 0 6px rgba(255,107,53,0.8)) drop-shadow(0 0 16px rgba(255,107,53,0.6)) drop-shadow(0 0 32px rgba(255,107,53,0.4))",
                    }}
                  >
                    <Icon
                      className="w-16 h-16 text-[#FF6B35]"
                      strokeWidth={1.5}
                    />
                  </motion.div>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-white/75 tabular-nums">
                  {counts[index].toLocaleString()}
                </div>
                <p className="text-sm text-white/60 max-w-xs mx-auto text-balance">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
