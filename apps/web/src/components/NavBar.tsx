import type { ReactNode } from "react";

export const NavBar = ({ children }: { children: ReactNode }) => {
  return (
    <nav className="absolute bottom-0 left-0 right-0 border-t border-border bg-card/80 backdrop-blur-md">
      <div className="flex h-18 w-full items-center px-2">{children}</div>
    </nav>
  );
};
