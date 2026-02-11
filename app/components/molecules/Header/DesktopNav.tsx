import Link from "next/link";
import { navItems } from "./navItems";
import { usePathname } from "next/navigation";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex items-center gap-1">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href ||
          item.children?.some((c) => pathname.startsWith(c.href));

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
                className={`absolute left-0 bottom-0 h-0.5 bg-linear-to-r from-red-300 to-red-400 transition-all duration-300 ease-out origin-left rounded-full ${
                  isActive ? "w-full" : "w-0 group-hover:w-full"
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
  );
}
