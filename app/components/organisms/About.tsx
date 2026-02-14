"use client";

import { motion } from "framer-motion";
import { Users, Heart, Zap } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Users,
      title: "Community Building",
      description: "Fostering cross-cultural connections and shared experiences"
    },
    {
      icon: Heart,
      title: "Holistic Support",
      description: "Comprehensive services for employment, learning, and integration"
    },
    {
      icon: Zap,
      title: "Empowerment",
      description: "Building on existing skills and talents for future success"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-neutral-950 to-neutral-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.3 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-sm font-semibold text-red-500 uppercase tracking-widest mb-4">
            About Our Mission
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Investing in People and Culture
          </h2>
          <p className="text-lg text-neutral-300">
            Empowering refugees and asylum seekers across the North East through education, employment, and community integration
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ amount: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-xl opacity-20 blur-xl"></div>
              <img
                src="https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg"
                alt="IPC community gathering"
                className="relative w-full h-80 md:h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ amount: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-neutral-200 text-lg leading-relaxed">
                Investing in People and Culture (IPC) is a registered charity dedicated to promoting the social and economic inclusion of refugees, asylum seekers, and emerging minority communities across the North East of England.
              </p>
              <p className="text-neutral-300 text-base leading-relaxed">
                We ensure everyone has the opportunity to build a fulfilling future through employability services, learning opportunities, and social integration programmes that celebrate their existing skills and talents.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <p className="text-neutral-200 font-semibold text-sm uppercase tracking-wide text-red-400">
                What we do
              </p>
              <ul className="space-y-2 text-neutral-300 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">→</span>
                  <span>Deliver employability and learning programmes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">→</span>
                  <span>Facilitate cultural and social integration events</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">→</span>
                  <span>Advocate for refugee rights and community needs</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ amount: 0.3 }}
                className="group"
              >
                <div className="bg-neutral-800/50 border border-neutral-700 hover:border-red-500/50 rounded-xl p-8 transition-all duration-300 h-full hover:shadow-lg hover:shadow-red-500/10">
                  <div className="w-12 h-12 bg-red-600/20 rounded-lg flex items-center justify-center mb-5 group-hover:bg-red-600/30 transition-colors">
                    <Icon className="w-6 h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
