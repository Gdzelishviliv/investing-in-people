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
    <section className="py-20 md:py-32 bg-[#e3e4e4]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.3 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-sm font-semibold text-[#8b1e1e] uppercase tracking-widest mb-4">
            About Our Mission
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 leading-tight">
            Investing in People and Culture
          </h2>
          <p className="text-lg text-gray-700">
            Empowering refugees and asylum seekers across the North East through education, employment, and community integration
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-20 overflow-hidden">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ amount: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-[#a24b4b] to-[#dbb9b9] rounded-xl opacity-30 blur-xl"></div>
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
              <p className="text-gray-800 text-lg leading-relaxed">
                Investing in People and Culture (IPC) is a registered charity dedicated to promoting the social and economic inclusion of refugees, asylum seekers, and emerging minority communities across the North East of England.
              </p>
              <p className="text-gray-700 text-base leading-relaxed">
                We ensure everyone has the opportunity to build a fulfilling future through employability services, learning opportunities, and social integration programmes that celebrate their existing skills and talents.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <p className="text-gray-800 font-semibold text-sm uppercase tracking-wide">
                What we do
              </p>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-[#a24b4b] mt-1">→</span>
                  <span>Deliver employability and learning programmes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a24b4b] mt-1">→</span>
                  <span>Facilitate cultural and social integration events</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#a24b4b] mt-1">→</span>
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
                <div className="bg-white border border-gray-300 hover:border-[#a24b4b] rounded-xl p-8 transition-all duration-300 h-full hover:shadow-lg hover:shadow-[#a24b4b]/10">
                  <div className="w-12 h-12 bg-[#dbb9b9] rounded-lg flex items-center justify-center mb-5 group-hover:bg-[#a24b4b] transition-colors">
                    <Icon className="w-6 h-6 text-[#8b1e1e]" />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
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
