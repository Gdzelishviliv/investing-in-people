"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navItems } from "./navItems";
import { usePathname } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

interface MobileNavProps {
  expandedItem: string | null;
  setExpandedItem: (v: string | null) => void;
  closeMenu: () => void; // მთლიანად დახურვა
}

export function MobileNav({ expandedItem, setExpandedItem, closeMenu }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden overflow-hidden"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col space-y-1 py-4 bg-transparent"
      >
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            item.children?.some((c) => pathname.startsWith(c.href));

          const isExpanded = expandedItem === item.href;

          return (
            <div key={item.href}>
              {/* Parent Item */}
              <div
                className={`flex items-center justify-between px-4 py-3 text-sm md:text-base font-medium ${
                  isActive ? "text-[#8b1e1e]" : "text-[#dbb9b9]"
                }`}
              >
                {/* Parent Link */}
                <Link
                  href={item.href}
                  className="flex-1 text-left hover:text-[#8b1e1e] transition"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>

                {/* Toggle children */}
                {item.children && (
                  <button
                    onClick={() =>
                      setExpandedItem(isExpanded ? null : item.href)
                    }
                    aria-expanded={isExpanded}
                    aria-label="Toggle submenu"
                    className="w-10 h-10 bg-neutral-900/10 backdrop-blur-sm shadow-sm border border-white/20 transition-all duration-300 rounded-full flex items-center justify-center"
                  >
                    <motion.svg
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-4 w-4"
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
                  </button>
                )}
              </div>

              {/* Submenu */}
              <AnimatePresence>
                {item.children && isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-transparent"
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
                          onClick={closeMenu}
                          className="block px-8 py-3 text-sm text-[#dbb9b9] hover:text-[#8b1e1e] transition"
                        >
                          {child.label}
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </motion.div>
    </motion.nav>
  );
}
