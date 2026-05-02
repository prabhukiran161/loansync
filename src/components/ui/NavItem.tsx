import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

export const NavItem = ({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: LucideIcon;
  label: string;
}) => {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      className="flex flex-1 flex-col items-center justify-center h-full gap-1 outline-none transition-colors text-muted-foreground hover:text-foreground"
      activeProps={{ className: "text-primary font-semibold" }}
    >
      <Icon size={24} />
      <span className="text-[13px] font-medium">{label}</span>
    </Link>
  );
};
