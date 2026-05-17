import type { ReactNode } from "react";
import { NavBar } from "@/components/NavBar";
import { NAV_ITEMS } from "@constants/navItems";
import { NavItem } from "@/components/NavItem";

export function MobileShell({
  children,
  hideNav = false,
}: {
  children: ReactNode;
  hideNav?: boolean;
}) {
  return (
    <div className="max-w-md mx-auto h-dvh flex flex-col text-foreground shadow-lg relative overflow-hidden bg-background">
      {/* Main Content Area */}
      <main
        className={`flex-1 overflow-y-auto no-scrollbar ${hideNav ? "" : "pb-20"}`}
      >
        {children}
      </main>
      {/* Bottom Navigation Bar */}
      {!hideNav && (
        <NavBar>
          {NAV_ITEMS.map((item, index) => (
            <NavItem
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </NavBar>
      )}
    </div>
  );
}
