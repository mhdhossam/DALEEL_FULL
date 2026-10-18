import {
  NavLink as RouterNavLink,
  NavLinkProps as RouterNavLinkProps,
  NavLinkRenderProps,
} from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type NavLinkCompatProps = RouterNavLinkProps & {
  activeClassName?: string;
  pendingClassName?: string;
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        {...props}
        className={(navProps: NavLinkRenderProps) =>
          cn(
            typeof className === "function" ? className(navProps) : className,
            navProps.isActive && activeClassName,
            navProps.isPending && pendingClassName
          )
        }
      />
    );
  }
);

NavLink.displayName = "NavLink";

export { NavLink };
