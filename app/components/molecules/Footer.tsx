"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2f2f2f] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold leading-snug max-w-md">
              Your donations <br />
              can change <br />
              someone's life
            </h2>
            <button className="mt-8 inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 transition text-white font-semibold px-6 py-3 rounded-full">
              <span className="bg-white text-green-500 p-2 rounded-full">
                <Heart size={16} fill="currentColor" />
              </span>
              DONATE NOW
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Contact</h3>
            <ul className="space-y-5 text-slate-300">
              <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Mail className="text-green-500" size={18} />
                <span>info@i-p-c.org</span>
              </li>
              <li className="flex items-center gap-4 border-b border-white/10 pb-4">
                <Phone className="text-green-500" size={18} />
                <span>+44 7411157589</span>
              </li>
              <li className="flex items-start gap-4 border-b border-white/10 pb-4">
                <MapPin className="text-green-500 mt-1" size={18} />
                <span>
                  Unit 5, Cruddas Park Centre, Westmorland Rd, Newcastle upon
                  Tyne, NE4 7RW
                </span>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="text-green-500 mt-1" size={18} />
                <span>
                  International Centre, 7 Abingdon Rd, Middlesbrough TS1 2DP
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-4 text-sm text-slate-400 flex flex-col md:flex-row justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Investing in People and Culture. Charity
            Number 1160482. Reg. Office: Unit 5, Cruddas Park Centre, Westmorland Road, Newcastle
            upon Tyne, NE4 7RW
          </p>
        </div>
      </div>
    </footer>
  );
}
