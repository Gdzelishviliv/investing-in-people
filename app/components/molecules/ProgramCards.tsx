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
  },
  {
    title: "Overseas Doctors",
    image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_culting-1-scaled.jpg",
    link: "/repod",
  },
  {
    title: "Integration Activities",
    image: "https://i-p-c.org/wp-content/uploads/2022/03/ipc_internationalwomensday-scaled.jpg",
    link: "/integration",
  },
]

export function ProgramCards() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              viewport={{  amount: 0.2 }}
            >
              <Link href={program.link} className="group block">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 640px) 100vw,
                           (max-width: 1024px) 50vw,
                           33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />

                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight transition-all duration-500 group-hover:text-[#FF6B35] group-hover:-translate-y-1">
                        {program.title}
                      </h3>
                      <div className="h-0.5 bg-white/70 mt-3 w-1/3 transition-all duration-500 group-hover:w-full group-hover:bg-[#FF6B35]" />
                    </div>

                    <div className="flex justify-end">
                      <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all duration-300 group-hover:bg-[#FF6B35] group-hover:scale-110">
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
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
