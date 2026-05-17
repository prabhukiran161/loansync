import { NOTIFICATION_ICONS } from "@/constants/notificationIcons";

export const NotificationIcon = ({ type }: { type: string }) => {
  const config =
    NOTIFICATION_ICONS[type as keyof typeof NOTIFICATION_ICONS] ||
    NOTIFICATION_ICONS.default;

  const Icon = config.icon;

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${config.classes}`}
    >
      <Icon size={18} />
    </div>
  );
};
