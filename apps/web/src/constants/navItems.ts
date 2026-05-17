import { Home, Wallet, ScrollText, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const NAV_ITEMS: { to: string; label: string; icon: LucideIcon }[] = [
  { to: "/", label: "Home", icon: Home },
  { to: "/loans", label: "Loans", icon: Wallet },
  { to: "/ledger", label: "Ledger", icon: ScrollText },
  { to: "/profile", label: "Profile", icon: User },
];
