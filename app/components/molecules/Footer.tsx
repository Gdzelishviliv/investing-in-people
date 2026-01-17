"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ amount: 0.2 }}
          className="text-center text-sm text-slate-400"
        >
          <p>
            &copy; {new Date().getFullYear()} Investing in People and Culture
            (IPC). All rights reserved.
          </p>
          <p className="mt-2">
            Registered Charity supporting refugees and asylum seekers in the
            North East of England
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
