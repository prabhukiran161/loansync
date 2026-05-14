import { Plus, ScrollText, TrendingUp, type LucideIcon } from "lucide-react";

export const QUICK_ACTIONS: {
  to: string;
  label: string;
  icon: LucideIcon;
}[] = [
  { to: "/add-payment", icon: Plus, label: "Add Payment" },
  { to: "/ledger", icon: ScrollText, label: "Ledger" },
  { to: "/projection", icon: TrendingUp, label: "Projection" },
];
