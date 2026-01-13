"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Network, Handshake, Users, ThumbsUp } from "lucide-react";

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
      { threshold: 0.5 }
    );

    const element = document.getElementById("stats-section");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="stats-section" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {statistics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 1 }}
                viewport={{ once: true }}
                className="text-center space-y-4"
              >
                <div className="flex justify-center">
                  <Icon
                    className="w-16 h-16 text-[#FF6B35]"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="text-5xl md:text-6xl font-bold text-gray-900 tabular-nums">
                  {counts[index].toLocaleString()}
                </div>

                <p className="text-sm text-gray-600 max-w-xs mx-auto text-balance">
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
