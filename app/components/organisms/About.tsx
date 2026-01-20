"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container xl:flex gap-15 mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.2 }}
        >
          <img
            src="https://i-p-c.org/wp-content/uploads/2022/03/ipc_webcover-1-e1687948316485.jpg"
            alt="about image"
            className="max-w-full object-cover rounded-lg shadow-lg xl:mr-12"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.2 }}
          className=" xl:w-1/2 flex flex-col justify-center items-center xl:mt-0 mt-10"
        >
          <div className="text-center mb-8">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
              Welcome to IPC Charity
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Investing in People and Culture
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ amount: 0.2 }}
            className="prose prose-lg max-w-none text-muted-foreground leading-relaxed space-y-4"
          >
            <p>
              Investing in People and Culture (IPC) is a registered charity that
              promotes the social and economic inclusion of people who are
              seeking asylum, refugees, and other new and emerging minority
              communities in the North East of England.
            </p>
            <p>
              Our aim is to ensure that everyone who comes to Teesside and
              Tyneside as a refugee or seeking asylum has the opportunity to
              envisage their future in the North East. We deliver employability
              services and opportunities for learning that build on existing
              skills and talents, and assist in adjusting to life within a new
              country. We also organise and facilitate social and cultural
              events that promote cross-cultural integration.
            </p>
            <p>
              Many of our programmes bring people together through shared
              activities such as befriending, sport and gardening. We advocate
              for refugees and new communities, providing services and
              information that help people engage in life in the UK. We also
              help service providers adapt their services to the needs of these
              communities.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ amount: 0.2 }}
            className="mt-12 text-center"
          ></motion.div>
        </motion.div>
      </div>
    </section>
  );
}
