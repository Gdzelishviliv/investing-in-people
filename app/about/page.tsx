"use client";

import { motion } from "framer-motion";
import { Heart, Users, Globe, Award } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "Supporting refugees and asylum seekers with empathy and understanding",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building connections and fostering integration in the North East",
    },
    {
      icon: Globe,
      title: "Inclusion",
      description: "Promoting social and economic inclusion for all communities",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Delivering high-quality services and support programs",
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-28 lg:py-36 bg-gradient-to-br from-[#8b1e1e] to-[#631515] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">About IPC</h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90">
              Investing in People and Culture
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-8 text-foreground">
              Our Mission
            </h2>
            <div className="prose prose-lg max-w-none space-y-6 text-muted">
              <p>
                Investing in People and Culture (IPC) is a registered charity that promotes the
                social and economic inclusion of people who are seeking asylum, refugees, and
                other new and emerging minority communities in the North East of England.
              </p>
              <p>
                Our aim is to ensure that everyone who comes to Teesside and Tyneside as a
                refugee or seeking asylum has the opportunity to envisage their future in the
                North East.
              </p>
              <p>
                We deliver employability services and opportunities for learning that build on
                existing skills and talents, and assist in adjusting to life within a new
                country. We also organise and facilitate social and cultural events that promote
                cross-cultural integration.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Our Values
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              The principles that guide our work every day
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8b1e1e] text-white mb-4">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{value.title}</h3>
                <p className="text-muted">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
