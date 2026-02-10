"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-linear-to-br from-[#f4a5a5] via-[#f28a8a] to-[#e66b6b] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Heart className="w-20 h-20 sm:w-24 sm:h-24 text-white fill-white drop-shadow-2xl" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-white/30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8 text-white text-lg sm:text-xl font-semibold"
      >
        Investing in People and Culture
      </motion.p>
    </motion.div>
  );
}
