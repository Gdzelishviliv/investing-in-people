"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Twitter, Facebook, Menu, X } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

/* -------------------- NAV DATA -------------------- */

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
  { label: "TYNESIDE", href: "/tyneside" },
  { label: "OVERSEAS DOCTORS", href: "/overseas-doctors" },
  { label: "BEFRIENDING", href: "/befriending" },
  { label: "GALLERY", href: "/gallery" },
  { label: "CONTACT", href: "/contact" },
];

/* -------------------- ANIMATION VARIANTS -------------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

/* -------------------- MEDIA QUERY HOOK -------------------- */

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

    const handler = () => setIsMobile(mq.matches);
    handler();

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

/* -------------------- HEADER COMPONENT -------------------- */

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const isMobile = useIsMobile();
  const { scrollY } = useScroll();

  /* Layout transforms */
  const headerWidth = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  const headerPadding = useTransform(scrollY, [0, 100], ["16px", "16px"]);

  /* Y offset */
  const headerYDesktop = useTransform(scrollY, [0, 100], [0, 0]);
  const headerYMobile = useTransform(scrollY, [0, 100], [0, 8]);
  const headerY = isMobile ? headerYMobile : headerYDesktop;

  /* Desktop-only bottom radius */
  const desktopRadius = useTransform(scrollY, [0, 80], ["0px", "16px"]);

  return (
    <motion.header
      style={{
        width: headerWidth,
        padding: headerPadding,
        y: headerY,
        borderBottomLeftRadius: isMobile ? "12px" : desktopRadius,
        borderBottomRightRadius: isMobile ? "12px" : desktopRadius,
        borderTopLeftRadius: isMobile ? "12px" : "0px",
        borderTopRightRadius: isMobile ? "12px" : "0px",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        flex flex-col gap-3 md:gap-4
        m-auto sticky top-0 z-50
        bg-neutral-900/80 backdrop-blur-xl
        shadow-sm
        border border-t-0 border-white/20
        hover:border-red-300/50
        transition-all duration-300
        px-4 py-3 md:px-6 md:py-4
      "
    >
      {/* Social Icons - Desktop only */}
      <div className="hidden lg:block mb-4">
        <div className="container mx-auto px-0">
          <div className="flex justify-end gap-4">
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
      
      {/* Main Navigation Container */}
      <div className="w-full">
        <div className="container mx-auto px-0">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-2xl md:text-3xl font-bold text-[#dbb9b9] flex-shrink-0">
              IPC
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = index === 0;
                return (
                  <div key={item.href} className="relative group">
                    <Link
                      href={item.href}
                      className={`
                        relative px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium whitespace-nowrap
                        transition-colors duration-300
                        ${isActive
                          ? "text-[#8b1e1e]"
                          : "text-[#dbb9b9] hover:text-[#8b1e1e]"
                        }
                      `}
                    >
                      {item.label}
                      <span
                        className={`absolute left-0 bottom-0 h-0.5 bg-linear-to-r from-red-300 to-red-400 transition-all duration-300 ease-out origin-left rounded-full ${isActive ? "w-full" : "w-0 group-hover:w-full"
                          }`}
                      />
                    </Link>
                    {item.children && (
                      <div
                        className="
                    absolute left-0 top-full pt-4
                    min-w-60
                    opacity-0 invisible translate-y-2
                    group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                    transition-all duration-300 ease-out
                    z-50
                  "
                      >
                        <div className="bg-neutral-900/95 backdrop-blur-xl border border-white/10 hover:border-red-300/50 duration-300 rounded-xl shadow-2xl overflow-hidden p-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="
                          block px-4 py-3 text-sm font-medium rounded-lg
                          text-gray-300 hover:text-white hover:bg-white/10
                          transition-all duration-200
                        "
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile and Tablet: Social Icons + Menu Button */}
            <div className="flex items-center gap-3 lg:hidden">
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
              
              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[#dbb9b9] hover:text-[#8b1e1e] transition ml-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
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
                {navItems.map((item) => (
                  <div key={item.href}>
                    <motion.button
                      variants={itemVariants}
                      onClick={() =>
                        setExpandedItem(
                          expandedItem === item.href ? null : item.href,
                        )
                      }
                      className="w-full flex items-center justify-between px-4 py-3 text-sm md:text-base font-medium text-[#dbb9b9] hover:text-[#8b1e1e] transition"
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
                          className="h-4 w-4 ml-2 flex-shrink-0"
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
                ))}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
