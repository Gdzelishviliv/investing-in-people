"use client";

import Link from "next/link";
import { Twitter, Facebook } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  {
    label: "HOME",
    href: "/",
    children: [{ label: "Accessibility", href: "/accessibility" }],
  },
  {
    label: "TEESSIDE",
    href: "/teesside",
    children: [
      { label: "International Centre", href: "/teesside/international-centre" },
      { label: "Gardening Project", href: "/teesside/gardening-project" },
      { label: "CYCLE RE-CYCLING", href: "/teesside/recycling" },
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

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white border-b sticky top-0 z-50 shadow-sm"
    >
      {/* TOP BAR */}
      <div className="bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-end gap-4 py-2">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#FF6B35] transition"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#FF6B35] transition"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* MAIN NAV */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-[#FF6B35]">
            IPC
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item, index) => {
              const isActive = index === 0;

              return (
                <div key={item.href} className="relative group">
                  {/* MAIN LINK */}
                  <Link
                    href={item.href}
                    className={`
                      relative px-4 py-2 text-sm font-medium
                      transition-colors duration-300
                      ${
                        isActive
                          ? "text-[#FF6B35]"
                          : "text-gray-700 hover:text-[#FF6B35]"
                      }
                    `}
                  >
                    {item.label}

                    {/* BORDER ANIMATION */}
                    <span
                      className={`absolute left-0 top-0 h-px bg-[#FF6B35] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                    <span
                      className={`absolute right-0 top-0 w-px bg-[#FF6B35] transition-all duration-300 delay-100 ${
                        isActive ? "h-full" : "h-0 group-hover:h-full"
                      }`}
                    />
                    <span
                      className={`absolute right-0 bottom-0 h-px bg-[#FF6B35] transition-all duration-300 delay-200 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                    <span
                      className={`absolute left-0 bottom-0 w-px bg-[#FF6B35] transition-all duration-300 delay-300 ${
                        isActive ? "h-full" : "h-0 group-hover:h-full"
                      }`}
                    />
                  </Link>

                  {/* DROPDOWN */}
                  {item.children && (
                    <div
                      className="
                        absolute left-0 top-full mt-2
                        min-w-55
                        bg-white border border-gray-200
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
                            text-gray-700
                             hover:text-[#FF6B35]
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
        </div>
      </div>
    </motion.header>
  );
}
