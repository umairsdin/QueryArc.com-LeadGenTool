"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "href"> {
  to: ComponentPropsWithoutRef<typeof Link>["href"];
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    const pathname = usePathname();
    const href = typeof to === "string" ? to : to.pathname || "";
    const isActive = href === pathname || href === `${pathname}/`;

    return (
      <Link
        ref={ref}
        href={to}
        className={cn(className, isActive && activeClassName, pendingClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
