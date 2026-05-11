import { Link } from "@tanstack/react-router";
import { type LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

export const QuickAction = ({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: LucideIcon;
}) => {
  return (
    <Link to={to} className="group block">
      <Card className="flex flex-col items-center gap-2 p-3 rounded-xl shadow-sm border border-border/50 group-hover:border-primary/40 group-active:scale-[0.94] transition-all">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary bg-accent group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon size={20} />
        </div>
        <span className="text-[11px] font-medium text-center">{label}</span>
      </Card>
    </Link>
  );
};
