"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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
];

export function ProgramCards() {
  return (
    <div className="-mt-10 bg-background">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="relative h-64 overflow-hidden ">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-4 text-balance">
                    {program.title}
                  </h3>
                  <Link href={program.link}>
                    <Button
                      variant="link"
                      className="p-0 h-auto font-semibold group/btn"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
