"use client";

import { useState } from "react";
import Link from "next/link";
import { Twitter, Facebook, Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

const navItems = [
  {
    label: "HOME",
    href: "/",
    children: [{ label: "Accessibility", href: "/accessibility" }],
  },
  {
    label: "TEESSIDE",
    href: "/pages/teesside",
    children: [
      {
        label: "International Centre",
        href: "/pages/teesside/international-centre",
      },
      { label: "Gardening Project", href: "/pages/teesside/gardening-project" },
      { label: "CYCLE RE-CYCLING", href: "/pages/teesside/recycling" },
    ],
  },
  {
    label: "TYNESIDE",
    href: "/tyneside",
  },
  { label: "OVERSEAS DOCTORS", href: "/overseas-doctors" },
  { label: "BEFRIENDING", href: "/befriending" },
  { label: "GALLERY", href: "/gallery" },
  { label: "CONTACT", href: "/contact" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 },
  },
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { scrollY } = useScroll();

  const headerWidth = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const headerPadding = useTransform(scrollY, [0, 100], ["16px", "4px"]);
  const headerY = useTransform(scrollY, [0, 100], [0, 8]);

  return (
    <motion.header
      style={{
        width: headerWidth,
        padding: headerPadding,
        y: headerY,
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="border-b m-auto sticky top-0 z-50 shadow-sm bg-white/5 backdrop-blur-xl rounded-lg sm:rounded-xl p-4 sm:p-6 border border-white/20 hover:border-red-300/50 hover:bg-red-300/10 transition-all duration-300"
    >
      <div>
        <div className="container mx-auto px-4">
          <div className="flex justify-end gap-4 py-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dbb9b9] hover:text-[#8b1e1e] transition"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dbb9b9] hover:text-[#8b1e1e] transition"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-[#dbb9b9]">
            IPC
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item, index) => {
              const isActive = index === 0;
              return (
                <div key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`
                      relative px-4 py-2 text-sm font-medium
                      transition-colors duration-300
                      ${isActive
                        ? "text-[#8b1e1e]"
                        : "text-[#dbb9b9] hover:text-[#8b1e1e]"
                      }
                    `}
                  >
                    {item.label}
                    <span
                      className={`absolute left-0 top-0 h-px bg-[#8b1e1e] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    />
                    <span
                      className={`absolute right-0 top-0 w-px bg-[#8b1e1e] transition-all duration-300 delay-100 ${isActive ? "h-full" : "h-0 group-hover:h-full"
                        }`}
                    />
                    <span
                      className={`absolute right-0 bottom-0 h-px bg-[#8b1e1e] transition-all duration-300 delay-200 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                    />
                    <span
                      className={`absolute left-0 bottom-0 w-px bg-[#8b1e1e] transition-all duration-300 delay-300 ${isActive ? "h-full" : "h-0 group-hover:h-full"
                        }`}
                    />
                  </Link>
                  {item.children && (
                    <div
                      className="
                        absolute left-0 top-full mt-2
                        backdrop-blur-xl
                        min-w-55
                        border border-white/20
                        bg-white/5  sm:rounded-xl hover:border-red-300/50 hover:bg-red-300/10 
                        rounded-md shadow-lg
                        opacity-0 invisible
                        translate-y-2
                        group-hover:opacity-100 group-hover:visible
                        group-hover:translate-y-0
                        transition-all duration-300
                        z-50
                      "
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="
                            block px-4 py-2 text-sm
                            text-[#dbb9b9]
                            hover:text-[#8b1e1e]
                            transition-colors
                          "
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#FF6B35] transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden border-t border-white/20 bg-white/40 backdrop-blur-sm"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col space-y-1 py-4"
              >
                {navItems.map((item) => (
                  <div key={item.href}>
                    <motion.button
                      variants={itemVariants}
                      onClick={() =>
                        setExpandedItem(
                          expandedItem === item.href ? null : item.href,
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:text-[#FF6B35] hover:bg-gray-50 transition"
                    >
                      <Link href={item.href} className="flex-1 text-left">
                        {item.label}
                      </Link>
                      {item.children && (
                        <motion.svg
                          animate={{
                            rotate: expandedItem === item.href ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          className="h-4 w-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                          />
                        </motion.svg>
                      )}
                    </motion.button>

                    {/* Submenu */}
                    <AnimatePresence>
                      {item.children && expandedItem === item.href && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-gray-50"
                        >
                          {item.children.map((child, idx) => (
                            <motion.div
                              key={child.href}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <Link
                                href={child.href}
                                className="block px-8 py-2 text-sm text-gray-600 hover:text-[#FF6B35] hover:bg-white transition"
                              >
                                {child.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
