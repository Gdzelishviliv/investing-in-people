"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const programs = [
  {
    title: "Befriend a Refugee",
    image: "https://i-p-c.org/wp-content/uploads/2022/03/0_ATR_MGA_300421mgaBini.jpg",
    link: "/befriending",
    accent: "#7dd3fc", // soft blue
  },
  {
    title: "Overseas Doctors",
    image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg",
    link: "/repod",
    accent: "#86efac", // soft green
  },
  {
    title: "Integration Activities",
    image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_internationalwomensday-scaled.jpg",
    link: "/integration",
    accent: "#facc15", // warm gold
  },
]

export function ProgramCards() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">
            Our Programs
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Supporting Communities
          </h2>
          <div className="h-1 w-12 bg-primary mx-auto" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.7, 
                delay: index * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              viewport={{ once: true, amount: 0.2 }}
              style={{ "--accent": program.accent } as React.CSSProperties}
              className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Link href={program.link}>
                <div className="relative aspect-4/5 overflow-hidden">
                  {/* Image */}
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale brightness-75 contrast-110"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/20 to-black/70 transition-all duration-500 group-hover:from-black/60 group-hover:via-black/30 group-hover:to-black/80" />

                  {/* Content Container */}
                  <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between">
                    {/* Title */}
                    <div className="space-y-3">
                      <h3 className="text-2xl sm:text-3xl font-bold leading-tight text-white transition-all duration-500 group-hover:-translate-y-1">
                        {program.title}
                      </h3>
                      <motion.div
                        className="h-1 w-1/2 bg-white/70 transition-all duration-500 group-hover:w-full group-hover:bg-accent"
                        initial={{ width: "50%" }}
                        whileHover={{ width: "100%" }}
                      />
                    </div>

                    {/* Arrow Button */}
                    <motion.div
                      className="flex justify-end"
                      whileHover={{ y: -4 }}
                    >
                      <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary group-hover:shadow-lg">
                        <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
