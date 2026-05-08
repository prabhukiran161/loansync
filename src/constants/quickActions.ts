import { Plus, ScrollText, TrendingUp, type LucideIcon } from "lucide-react";

export const QUICK_ACTIONS: {
  to: string;
  label: string;
  icon: LucideIcon;
}[] = [
  { to: "/", icon: Plus, label: "Add Payment" },
  { to: "/", icon: ScrollText, label: "Ledger" },
  { to: "/", icon: TrendingUp, label: "Projection" },
];
