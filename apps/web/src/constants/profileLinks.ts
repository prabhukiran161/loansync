import type { LucideIcon } from "lucide-react";
import { Bell, Shield, HelpCircle } from "lucide-react";

export const PROFILE_LINKS: { to: string; icon: LucideIcon; label: string }[] =
  [
    { to: "/notifications", icon: Bell, label: "Notifications" },
    { to: "/", icon: Shield, label: "Privacy & Security" },
    { to: "/", icon: HelpCircle, label: "Help & Support" },
  ];
