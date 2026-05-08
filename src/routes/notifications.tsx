import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { ScreenHeader } from "@/components/ScreenHeader";
import { notifications } from "@/lib/mockData";
import { EmptyNotifications } from "@/components/EmptyNotifications";
import { NotificationCard } from "@/components/NotificationCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/notifications")({
  component: Notifications,
});

function Notifications() {
  const [showAll, setShowAll] = useState(false);
  const displayNotifications = showAll
    ? notifications
    : notifications.slice(0, 5);
  const hasMoreNotifications = notifications.length > 5;
  return (
    <MobileShell hideNav>
      <div className="flex flex-col min-h-full">
        <ScreenHeader title="Notifications" />

        {notifications.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center pb-20">
            <EmptyNotifications />
          </div>
        ) : (
          <div className="px-5 mt-2 pb-6 flex flex-col gap-3">
            {displayNotifications.map((n) => (
              <NotificationCard notification={n} />
            ))}

            {!showAll && hasMoreNotifications && (
              <Button
                variant="secondary"
                className="h-12 mt-2 text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors active:scale-95"
                onClick={() => setShowAll(true)}
              >
                View all {notifications.length} notifications
              </Button>
            )}
          </div>
        )}
      </div>
    </MobileShell>
  );
}
