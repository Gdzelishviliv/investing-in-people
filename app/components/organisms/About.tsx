"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg"
                alt="IPC Charity community"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/20" />
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="order-1 lg:order-2 flex flex-col justify-center space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <motion.p
                className="text-sm font-semibold text-primary uppercase tracking-widest"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.2,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                About Our Charity
              </motion.p>
              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.3,
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                Investing in People and Culture
              </motion.h2>
              <div className="h-1 w-12 bg-primary" />
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 text-foreground/80 leading-relaxed"
            >
              <p className="text-base sm:text-lg">
                Investing in People and Culture (IPC) is a registered charity that promotes the social and economic inclusion of people who are seeking asylum, refugees, and other new and emerging minority communities in the North East of England.
              </p>
              <p className="text-base sm:text-lg">
                Our aim is to ensure that everyone who comes to Teesside and Tyneside as a refugee or seeking asylum has the opportunity to envisage their future in the North East. We deliver employability services and opportunities for learning that build on existing skills and talents.
              </p>
              <p className="text-base sm:text-lg">
                Many of our programmes bring people together through shared activities such as befriending, sport, and gardening. We advocate for refugees and new communities, providing services and information that help people engage in life in the UK.
              </p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary-dark transition-colors duration-300"
              >
                Learn More
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
