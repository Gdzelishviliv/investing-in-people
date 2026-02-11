import { useEffect, useState } from "react";

export function isItemActive(
  pathname: string,
  item: { href: string; children?: { href: string }[] },
) {
  if (pathname === item.href) return true;

  return item.children?.some((child) =>
    pathname.startsWith(child.href),
  ) ?? false;
}
export function useIsMobile(breakpoint = 1024) {
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