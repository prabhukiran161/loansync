import { Link } from "@tanstack/react-router";
import { ChevronRight, type LucideIcon } from "lucide-react";

export const ProfileLink = ({
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
      className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors active:bg-muted"
    >
      <div className="flex items-center gap-4">
        <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
          <Icon size={18} />
        </div>
        <span className="font-medium text-[14px] text-foreground">{label}</span>
      </div>
      <ChevronRight size={16} className="text-muted-foreground" />
    </Link>
  );
};
