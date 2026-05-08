import type { NotificationItem } from "@/types/notification";
import { NotificationIcon } from "./NotificationIcon";
import { Card } from "./ui/card";

export const NotificationCard = ({
  notification,
}: {
  notification: NotificationItem;
}) => {
  return (
    <Card
      className={`rounded-2xl p-4 shadow-sm border transition hover:border-primary/30 ${
        notification.isRead
          ? "border-border/50 bg-card"
          : "border-primary/20 bg-primary/5"
      }`}
    >
      <div className="flex gap-4 items-start">
        <NotificationIcon type={notification.type} />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h3 className="text-[15px] font-semibold text-foreground truncate pr-2 flex items-center gap-2">
              {notification.title}{" "}
              {!notification.isRead && (
                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              )}
            </h3>
            <span className="text-[11px] text-muted-foreground shrink-0 mt-0.5">
              {notification.time}
            </span>
          </div>
          <p className="text-[13px] text-muted-foreground mt-1 leading-snug">
            {notification.desc}
          </p>
        </div>
      </div>
    </Card>
  );
};
