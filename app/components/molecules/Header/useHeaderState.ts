import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isItemActive } from "./utils";
import { navItems } from "./navItems";

export function useHeaderState() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    const active = navItems.find(
      (item) => isItemActive(pathname, item) && item.children,
    );
    if (active) setExpandedItem(active.href);
  }, [pathname]);

  return {
    pathname,
    isOpen,
    setIsOpen,
    expandedItem,
    setExpandedItem,
  };
}
