"use client";

import { useEffect, useState } from "react";
import { motion, scale } from "framer-motion";
import { Network, Handshake, Users, ThumbsUp } from "lucide-react";
import { filter } from "framer-motion/client";

const statistics = [
  {
    value: 898,
    label: "People supported this year",
    icon: Network,
    color: "#7dd3fc", // soft blue
    glow: "rgba(125,211,252",
  },
  {
    value: 50,
    label: "Ukrainian families flown to UK and supported with integration",
    icon: Handshake,
    color: "#facc15", // warm yellow
    glow: "rgba(250,204,21",
  },
  {
    value: 61,
    label: "started first UK job this year",
    icon: Users,
    color: "#86efac", // soft green
    glow: "rgba(134,239,172",
  },
  {
    value: 86,
    label: "Medics retraining for NHS",
    icon: ThumbsUp,
    color: "#e6c3c3", // rose
    glow: "rgba(230,195,195",
  },
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
    <section id="stats-section" className="w-full py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 bg-white/8 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 lg:p-10 border border-white/20 transition-all duration-300 hover:border-accent/50 hover:bg-white/12"
          style={{
            boxShadow: "0 0 24px rgba(0, 0, 0, 0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 0 32px rgba(219, 185, 185, 0.25), 0 0 64px rgba(139, 30, 30, 0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 24px rgba(0, 0, 0, 0.2)";
          }}
        >
          {statistics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: index * 0.12, 
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                viewport={{ once: true, amount: 0.5 }}
                className="flex flex-col items-center text-center space-y-3 p-4 sm:p-6 rounded-lg hover:bg-white/5 transition-colors duration-300 group"
              >
                <motion.div
                  animate={{
                    filter: [
                      `drop-shadow(0 0 0px ${stat.glow},0))`,
                      `drop-shadow(0 0 12px ${stat.glow},0.45))`,
                      `drop-shadow(0 0 0px ${stat.glow},0))`,
                    ],
                  }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                  whileHover={{
                    scale: 1.2,
                  }}
                >
                  <Icon
                    className="w-12 h-12 sm:w-16 sm:h-16 transition-colors duration-300"
                    strokeWidth={1.5}
                    style={{ color: stat.color }}
                  />
                </motion.div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tabular-nums">
                  {counts[index].toLocaleString()}
                </div>
                <p className="text-xs sm:text-sm text-gray-300 text-balance max-w-xs">
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
