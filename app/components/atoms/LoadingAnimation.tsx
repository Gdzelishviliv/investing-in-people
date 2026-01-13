"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white flex items-center justify-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Heart className="w-16 h-16 text-[#FF6B35] fill-[#FF6B35]" />
      </motion.div>
    </motion.div>
  )
}
