"use client";

import { useEffect, useState } from "react";
import { motion, scale } from "framer-motion";
import { Network, Handshake, Users, ThumbsUp } from "lucide-react";

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
    <section id="stats-section" className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 bg-white/5 backdrop-blur-md rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 hover:border-red-300/50 hover:bg-red-300/10 transition-all duration-300"
          style={{
            borderColor: "rgba(255,255,255,0.15)",
            boxShadow: "0 0 0 rgba(242,166,166,0)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(230,195,195,0.6)";
            e.currentTarget.style.boxShadow =
              "0 0 24px rgba(242,166,166,0.35), 0 0 56px rgba(242,166,166,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            e.currentTarget.style.boxShadow = "0 0 0 rgba(242,166,166,0)";
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
                        `drop-shadow(0 0 0px ${stat.glow},0))`,
                        `drop-shadow(0 0 12px ${stat.glow},0.45))`,
                        `drop-shadow(0 0 0px ${stat.glow},0))`,
                      ],
                    }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    whileHover={{
                      scale: 1.25,
                      rotate: 360,
                      filter: `
                        drop-shadow(0 0 8px ${stat.glow},0.9))
                        drop-shadow(0 0 20px ${stat.glow},0.7))
                        drop-shadow(0 0 40px ${stat.glow},0.5))
                        `,
                    }}
                  >
                    <Icon
                      className="w-16 h-16 text-[#e6c3c3]"
                      strokeWidth={1.5}
                      style={{ color: stat.color }}
                    />
                  </motion.div>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-white/85 tabular-nums">
                  {counts[index].toLocaleString()}
                </div>
                <p className="text-sm text-white/65 max-w-xs mx-auto text-balance">
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
