import { Bell, Mail, Check, X, type LucideIcon } from "lucide-react";

type NotificationConfig = {
  icon: LucideIcon;
  classes: string;
};

export const NOTIFICATION_ICONS: Record<string, NotificationConfig> = {
  verified: {
    icon: Check,
    classes: "bg-emerald-500/15 text-emerald-600",
  },

  added: {
    icon: Bell,
    classes: "bg-blue-500/15 text-blue-600",
  },

  rejected: {
    icon: X,
    classes: "bg-red-500/15 text-red-600",
  },

  invite: {
    icon: Mail,
    classes: "bg-amber-500/15 text-amber-600",
  },

  default: {
    icon: Bell,
    classes: "bg-primary/15 text-primary",
  },
};
