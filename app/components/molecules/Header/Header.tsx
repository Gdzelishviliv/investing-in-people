"use client";

import { useState } from "react";
import Link from "next/link";
import { Twitter, Facebook, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MobileNav } from "./MobileNav";
import { navItems } from "./navItems";
import { usePathname } from "next/navigation";
import { useIsMobile } from "./utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const pathname = usePathname();
  const isMobile = useIsMobile();

  const { scrollY } = useScroll();
  const headerWidth = useTransform(scrollY, [0, 100], ["80rem", "72rem"]);
  const headerY = isMobile
    ? useTransform(scrollY, [0, 100], [0, 8])
    : useTransform(scrollY, [0, 100], [0, 0]);
  const desktopRadius = useTransform(scrollY, [0, 80], ["0px", "16px"]);

  const closeMenu = () => {
    setIsOpen(false);
    setExpandedItem(null);
  };

  return (
    <motion.header
      style={{
        width: headerWidth,
        y: headerY,
        borderBottomLeftRadius: isMobile ? "12px" : desktopRadius,
        borderBottomRightRadius: isMobile ? "12px" : desktopRadius,
        borderTopLeftRadius: isMobile ? "12px" : "0px",
        borderTopRightRadius: isMobile ? "12px" : "0px",
      }}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50 bg-neutral-900/80 backdrop-blur-xl shadow-sm border border-t-0 border-white/20 hover:border-red-300/50 transition-all duration-300 w-full max-w-[80rem]"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 md:py-4 flex flex-col gap-3 md:gap-4">
      {/* Social Icons Desktop */}
      <div className="hidden lg:flex justify-end gap-4 mb-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#dbb9b9] hover:text-[#8b1e1e] transition">
          <Twitter className="h-5 w-5" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#dbb9b9] hover:text-[#8b1e1e] transition">
          <Facebook className="h-5 w-5" />
        </a>
      </div>

      {/* Main Nav */}
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className="text-2xl md:text-3xl font-bold text-[#dbb9b9] shrink-0">
          IPC
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => {
            const isActive =
              pathname === item.href ||
              item.children?.some(c => pathname.startsWith(c.href));
            return (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`relative px-3 xl:px-4 py-2 text-xs xl:text-sm font-medium whitespace-nowrap transition-colors duration-300 ${isActive ? "text-[#8b1e1e]" : "text-[#dbb9b9] hover:text-[#8b1e1e]"}`}
                >
                  {item.label}
                  <span className={`absolute left-0 bottom-0 h-0.5 bg-linear-to-r from-red-300 to-red-400 transition-all duration-300 ease-out origin-left rounded-full ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
                {item.children && (
                  <div className="absolute left-0 top-full pt-4 min-w-60 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                    <div className="bg-neutral-900/95 backdrop-blur-xl border border-white/10 hover:border-red-300/50 duration-300 rounded-xl shadow-2xl overflow-hidden p-2">
                      {item.children.map(child => (
                        <Link key={child.href} href={child.href} className="block px-4 py-3 text-sm font-medium rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200">{child.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center gap-3">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#dbb9b9] hover:text-[#8b1e1e] transition">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#dbb9b9] hover:text-[#8b1e1e] transition">
            <Facebook className="h-5 w-5" />
          </a>
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#dbb9b9] hover:text-[#8b1e1e] transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* MobileNav */}
      <AnimatePresence>
        {isOpen && (
          <MobileNav
            expandedItem={expandedItem}
            setExpandedItem={setExpandedItem}
            closeMenu={closeMenu}
          />
        )}
      </AnimatePresence>
      </div>
    </motion.header>
  );
}
