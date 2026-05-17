import { BellRing } from "lucide-react";
export const EmptyNotifications = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground opacity-60">
      <BellRing size={48} className="mb-4" />
      <p className="text-lg font-medium">No new notifications</p>
    </div>
  );
};
